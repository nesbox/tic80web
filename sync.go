package main

import (
	"bytes"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"image"
	"image/color"
	"image/png"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"sync/atomic"
)

// Game represents a game from the TIC-80 database.
type Game struct {
	ID       int    `json:"id"`
	Hash     string `json:"hash"`
	Title    string `json:"title"`
	Name     string `json:"name"`
	Author   string `json:"author"`
	Desc     string `json:"desc"`
	User     int    `json:"user"`
	Text     string `json:"text"`
	Added    int    `json:"added"`
	Updated  int    `json:"updated"`
	Category int    `json:"category"`
}

// User represents a user from the TIC-80 database.
type User map[string]interface{}

const (
	// Number of concurrent downloads. A reasonable starting point.
	concurrencyLimit = 10
	// Base URL for the TIC-80 API.
	baseURL = "https://tic80.com"
	// Common prefix for all avatar base64 strings (PNG header).
	avatarPrefix = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAMFBMVEUaHCxdJ12xPlPvfVf/zXWn8HA4t2QlcXkpNm87XclBpvZz7/f09PSUsMJWbIYzPFcHRRrAAAAA"
)

func main() {
	// A reusable HTTP client.
	client := &http.Client{}

	// Fetch the list of games. The function now also saves the JSON file internally.
	games, err := fetchGames(client)
	if err != nil {
		fmt.Printf("Failed to fetch games: %v\n", err)
		return
	}

	fmt.Printf("Successfully downloaded and parsed %d games.\n\n", len(games))

	// Extract texts from games
	var texts []map[string]interface{}
	for _, game := range games {
		if game.Text != "" {
			texts = append(texts, map[string]interface{}{
				"id":   game.ID,
				"text": game.Text,
			})
		}
	}

	// Save texts.json
	if err := saveTexts(texts, "src/data/texts.json"); err != nil {
		fmt.Printf("Failed to save texts.json: %v\n", err)
		return
	}

	fmt.Println("texts.json saved.")

	// Fetch and parse users from URL
	users, err := loadUsers(client, "https://tic80.com/json?fn=users")
	if err != nil {
		fmt.Printf("Failed to load users: %v\n", err)
		return
	}

	fmt.Printf("Successfully loaded and parsed %d users.\n\n", len(users))

	// Filter users to only include those with games
	hasGames := make(map[int]bool)
	for _, game := range games {
		hasGames[game.User] = true
	}
	var filtered []User
	for _, user := range users {
		if id, ok := user["id"].(float64); ok && hasGames[int(id)] {
			filtered = append(filtered, user)
		}
	}
	fmt.Printf("Filtered to %d users with games.\n", len(filtered))

	// Download all carts concurrently.
	downloadCarts(client, games, filtered)

	fmt.Println("\nAll cart downloads finished.")

	// Process avatars to encode as base64 for filtered users only.
	processAvatars(client, filtered)

	// Truncate avatar strings to remove common prefix
	for _, user := range filtered {
		if avatar, ok := user["avatar"].(string); ok {
			user["avatar"] = avatar[len(avatarPrefix):]
		}
	}

	// Save updated users.json
	if err := saveUsers(filtered, "src/data/users.json"); err != nil {
		fmt.Printf("Failed to save users.json: %v\n", err)
		return
	}

	fmt.Println("users.json updated.")
}

// fetchGames fetches the list of games from the TIC-80 API, saves the raw
// JSON to games.json, and returns the parsed game list.
func fetchGames(client *http.Client) ([]Game, error) {
	resp, err := client.Get(fmt.Sprintf("%s/json?fn=games", baseURL))
	if err != nil {
		return nil, fmt.Errorf("error making GET request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("received non-OK status code: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("error reading response body: %w", err)
	}

	// Parse to map to remove text field
	var rawGames []map[string]interface{}
	if err := json.Unmarshal(body, &rawGames); err != nil {
		return nil, fmt.Errorf("error unmarshaling raw JSON: %w", err)
	}

	// Remove text field from each game
	for _, game := range rawGames {
		delete(game, "text")
	}

	// Marshal back without text
	modifiedBody, err := json.MarshalIndent(rawGames, "", "  ")
	if err != nil {
		return nil, fmt.Errorf("error marshaling modified JSON: %w", err)
	}

	// Save the modified JSON data to a file.
	if err := os.WriteFile("src/data/games.json", modifiedBody, 0644); err != nil {
		// We return the parsing error, but print the file write error.
		fmt.Printf("Error saving games.json: %v\n", err)
	} else {
		fmt.Println("Successfully saved games.json")
	}

	var games []Game
	if err := json.Unmarshal(body, &games); err != nil {
		return nil, fmt.Errorf("error unmarshaling JSON: %w", err)
	}

	return games, nil
}

// downloadCarts downloads all games concurrently using a worker pool pattern.
func downloadCarts(client *http.Client, games []Game, users []User) {
	var wg sync.WaitGroup
	// Buffered channel acts as a semaphore to limit concurrency.
	sem := make(chan struct{}, concurrencyLimit)

	for i, game := range games {
		wg.Add(1)
		sem <- struct{}{} // Acquire a slot

		go func(i int, game Game) {
			defer wg.Done()
			defer func() { <-sem }() // Release the slot

			// Find the username for this game
			var username string
			for _, u := range users {
				if id, ok := u["id"].(float64); ok && int(id) == game.User {
					if name, ok := u["name"].(string); ok {
						username = strings.ToLower(name)
						break
					}
				}
			}
			if username == "" {
				fmt.Printf("No username found for game %s\n", game.Title)
				return
			}

			cartname := game.Name
			if cartname == "" {
				cartname = game.Title
			}

			cartPath := fmt.Sprintf("public/dev/%s/%s/%s.tic", username, cartname, cartname)
			_, err := os.Stat(cartPath)

			// Download only if the file does not exist.
			if errors.Is(err, os.ErrNotExist) {
				// Create the directory
				if err := os.MkdirAll(filepath.Dir(cartPath), 0755); err != nil {
					fmt.Printf("Error creating directory for %s: %v\n", game.Title, err)
					return
				}
				if err := downloadFile(client, game.Hash, cartPath, game.Title, i, len(games)); err != nil {
					fmt.Printf("Failed to download %s: %v\n", game.Title, err)
				}
			} else if err == nil {
				fmt.Printf("[%d/%d] - %s already exists. Skipping.\n", i+1, len(games), game.Title)
			} else {
				fmt.Printf("Error checking file status for %s: %v\n", game.Title, err)
			}
		}(i, game)
	}
	wg.Wait()
}

// downloadFile performs the actual file download logic.
func downloadFile(client *http.Client, hash, path, title string, current, total int) error {
	resp, err := client.Get(fmt.Sprintf("%s/cart/%s/cart.tic", baseURL, hash))
	if err != nil {
		return fmt.Errorf("error making GET request for cart: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("received non-OK status code: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf("error reading response body: %w", err)
	}

	if err := os.WriteFile(path, body, 0644); err != nil {
		return fmt.Errorf("error writing file: %w", err)
	}

	fmt.Printf("[%d/%d] - %s downloaded: %d bytes\n", current+1, total, title, len(body))
	return nil
}

// loadUsers fetches and parses the users JSON from the given URL.
func loadUsers(client *http.Client, url string) ([]User, error) {
	resp, err := client.Get(url)
	if err != nil {
		return nil, fmt.Errorf("error making GET request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("received non-OK status code: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("error reading response body: %w", err)
	}

	var users []User
	if err := json.Unmarshal(body, &users); err != nil {
		return nil, fmt.Errorf("error unmarshaling JSON: %w", err)
	}

	return users, nil
}

// processAvatars processes each avatar PNG to encode as base64 concurrently.
func processAvatars(client *http.Client, users []User) {
	var wg sync.WaitGroup
	sem := make(chan struct{}, concurrencyLimit)
	var counter int64

	for i, user := range users {
		avatarID, ok := user["avatar"].(string)
		if !ok || avatarID == "" {
			continue
		}

		wg.Add(1)
		sem <- struct{}{} // Acquire

		go func(i int, avatarID string) {
			defer wg.Done()
			defer func() { <-sem }() // Release

			resp, err := client.Get(fmt.Sprintf("%s/img/users/%s.png", baseURL, avatarID))
			if err != nil {
				fmt.Printf("Failed to download avatar %s: %v\n", avatarID, err)
				return
			}

			if resp.StatusCode != http.StatusOK {
				resp.Body.Close()
				fmt.Printf("Received non-OK status for avatar %s: %d\n", avatarID, resp.StatusCode)
				return
			}

			img, err := png.Decode(resp.Body)
			resp.Body.Close()
			if err != nil {
				fmt.Printf("Failed to decode PNG for avatar %s: %v\n", avatarID, err)
				return
			}

			pixelData, err := extractPixelData(img)
			if err != nil {
				fmt.Printf("Failed to process avatar %s: %v\n", avatarID, err)
				return
			}

			packed, err := hex.DecodeString(pixelData)
			if err != nil {
				fmt.Printf("Failed to decode hex for avatar %s: %v\n", avatarID, err)
				return
			}

			pngBytes, err := createPNGFromPacked(packed)
			if err != nil {
				fmt.Printf("Failed to create PNG for avatar %s: %v\n", avatarID, err)
				return
			}

			encoded := base64.StdEncoding.EncodeToString(pngBytes)
			users[i]["avatar"] = encoded
			current := atomic.AddInt64(&counter, 1)
			fmt.Printf("[%d/%d] - Processed avatar %s: %d bytes\n", current, len(users), avatarID, len(pngBytes))
		}(i, avatarID)
	}
	wg.Wait()
}

// sweetie16 is the TIC-80 sweetie-16 color palette
var sweetie16 = []color.RGBA{
	{0x1a, 0x1c, 0x2c, 0xff}, // 0
	{0x5d, 0x27, 0x5d, 0xff}, // 1
	{0xb1, 0x3e, 0x53, 0xff}, // 2
	{0xef, 0x7d, 0x57, 0xff}, // 3
	{0xff, 0xcd, 0x75, 0xff}, // 4
	{0xa7, 0xf0, 0x70, 0xff}, // 5
	{0x38, 0xb7, 0x64, 0xff}, // 6
	{0x25, 0x71, 0x79, 0xff}, // 7
	{0x29, 0x36, 0x6f, 0xff}, // 8
	{0x3b, 0x5d, 0xc9, 0xff}, // 9
	{0x41, 0xa6, 0xf6, 0xff}, // 10
	{0x73, 0xef, 0xf7, 0xff}, // 11
	{0xf4, 0xf4, 0xf4, 0xff}, // 12
	{0x94, 0xb0, 0xc2, 0xff}, // 13
	{0x56, 0x6c, 0x86, 0xff}, // 14
	{0x33, 0x3c, 0x57, 0xff}, // 15
}

// nearestSweetie16 finds the index of the nearest color in sweetie16 palette
func nearestSweetie16(c color.RGBA) uint8 {
	minDist := float64(1<<32 - 1)
	var bestIdx uint8
	for i, sc := range sweetie16 {
		dr := float64(c.R) - float64(sc.R)
		dg := float64(c.G) - float64(sc.G)
		db := float64(c.B) - float64(sc.B)
		dist := dr*dr + dg*dg + db*db
		if dist < minDist {
			minDist = dist
			bestIdx = uint8(i)
		}
	}
	return bestIdx
}

// extractPixelData extracts the pixel data from an image as hex string.
func extractPixelData(img image.Image) (string, error) {
	bounds := img.Bounds()
	width, height := bounds.Dx(), bounds.Dy()
	if width != 16 || height != 16 {
		// Downscale to 16x16 using nearest neighbor sampling
		sampled := image.NewRGBA(image.Rect(0, 0, 16, 16))
		for sy := 0; sy < 16; sy++ {
			for sx := 0; sx < 16; sx++ {
				c := img.At(sx*(width/16), sy*(height/16))
				sampled.Set(sx, sy, c)
			}
		}
		img = sampled
		bounds = img.Bounds()
		width, height = bounds.Dx(), bounds.Dy()
	}

	var packed []byte

	for y := 0; y < height; y++ {
		for x := 0; x < width; x += 2 {
			c1 := color.RGBAModel.Convert(img.At(x, y)).(color.RGBA)
			c2 := color.RGBAModel.Convert(img.At(x+1, y)).(color.RGBA)

			idx1 := nearestSweetie16(c1)
			idx2 := nearestSweetie16(c2)

			packedByte := (idx1 << 4) | idx2
			packed = append(packed, packedByte)
		}
	}

	return hex.EncodeToString(packed), nil
}

// createPNGFromPacked creates a PNG byte slice from packed sweetie16 indices
func createPNGFromPacked(packed []byte) ([]byte, error) {
	palette := make(color.Palette, len(sweetie16))
	for i, c := range sweetie16 {
		palette[i] = c
	}
	img := image.NewPaletted(image.Rect(0, 0, 16, 16), palette)
	for y := 0; y < 16; y++ {
		for x := 0; x < 16; x += 2 {
			idx := y*8 + x/2
			if idx >= len(packed) {
				break
			}
			b := packed[idx]
			idx1 := b >> 4
			idx2 := b & 0x0F
			img.SetColorIndex(x, y, idx1)
			if x+1 < 16 {
				img.SetColorIndex(x+1, y, idx2)
			}
		}
	}
	var buf bytes.Buffer
	err := png.Encode(&buf, img)
	return buf.Bytes(), err
}

// saveUsers saves the users slice to JSON file.
func saveUsers(users []User, filename string) error {
	data, err := json.MarshalIndent(users, "", "  ")
	if err != nil {
		return fmt.Errorf("error marshaling JSON: %w", err)
	}

	if err := os.WriteFile(filename, data, 0644); err != nil {
		return fmt.Errorf("error writing file: %w", err)
	}

	return nil
}

// saveTexts saves the texts slice to JSON file.
func saveTexts(texts []map[string]interface{}, filename string) error {
	data, err := json.MarshalIndent(texts, "", "  ")
	if err != nil {
		return fmt.Errorf("error marshaling JSON: %w", err)
	}

	if err := os.WriteFile(filename, data, 0644); err != nil {
		return fmt.Errorf("error writing file: %w", err)
	}

	return nil
}
