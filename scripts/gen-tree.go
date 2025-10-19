package main

import (
	"encoding/json"
	"fmt"
	"os"
	"sort"
	"strings"
	"sync"
)

// Game represents a game from the TIC-80 database (simplified for tree generation).
type Game struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	User int    `json:"user"`
}

// User represents a user from the TIC-80 database (simplified for tree generation).
type User map[string]interface{}

func main() {
	// Load existing data files
	games, users, gameHashes, err := loadData()
	if err != nil {
		fmt.Printf("Failed to load data: %v\n", err)
		os.Exit(1)
	}

	// Generate tree structure
	createTreeIndexes(games, users, gameHashes)
	fmt.Println("Tree structure generation completed.")
}

func loadData() ([]Game, []User, *sync.Map, error) {
	// Load games.json
	gamesData, err := os.ReadFile("src/data/games.json")
	if err != nil {
		return nil, nil, nil, fmt.Errorf("failed to read games.json: %w", err)
	}
	var games []Game
	if err := json.Unmarshal(gamesData, &games); err != nil {
		return nil, nil, nil, fmt.Errorf("failed to parse games.json: %w", err)
	}

	// Load users.json
	usersData, err := os.ReadFile("src/data/users.json")
	if err != nil {
		return nil, nil, nil, fmt.Errorf("failed to read users.json: %w", err)
	}
	var users []User
	if err := json.Unmarshal(usersData, &users); err != nil {
		return nil, nil, nil, fmt.Errorf("failed to parse users.json: %w", err)
	}

	// Initialize empty gameHashes for now (we'll populate based on file structure)
	gameHashes := &sync.Map{}

	// Scan dev directory for existing .tic files and create hashes based on filenames
	if err := populateGameHashesFromFiles(gameHashes, games, users); err != nil {
		fmt.Printf("Warning: failed to populate game hashes: %v\n", err)
	}

	return games, users, gameHashes, nil
}

func populateGameHashesFromFiles(gameHashes *sync.Map, games []Game, users []User) error {
	getUsername := func(userID int) string {
		for _, u := range users {
			if id, ok := u["id"].(float64); ok && int(id) == userID {
				if name, ok := u["name"].(string); ok {
					return name
				}
			}
		}
		return ""
	}

	// For each game, check if file exists and generate simple hash
	for _, game := range games {
		username := getUsername(game.User)
		if username == "" {
			continue
		}

		filename := fmt.Sprintf("public/dev/%s/%s.tic", username, game.Name)
		if _, err := os.Stat(filename); err == nil {
			// File exists, generate a simple hash
			hashInput := fmt.Sprintf("%x", len(game.Name)*len(username)*game.ID)
			hash := hashInput
			if len(hashInput) > 7 {
				hash = hashInput[:7]
			} else if len(hashInput) < 7 {
				// Pad with zeros if too short
				hash = fmt.Sprintf("%07s", hashInput)
			}
			gameHashes.Store(game.ID, hash)
		}
	}

	return nil
}

func createTreeIndexes(games []Game, users []User, gameHashes *sync.Map) {
	getUsername := func(userID int) string {
		for _, u := range users {
			if id, ok := u["id"].(float64); ok && int(id) == userID {
				if name, ok := u["name"].(string); ok {
					return strings.ToLower(name)
				}
			}
		}
		return ""
	}

	gamesByUser := make(map[int][]Game)
	for _, g := range games {
		gamesByUser[g.User] = append(gamesByUser[g.User], g)
	}

	// Create root public/tree.json
	publicFolders := []string{"play", "dev"}
	publicData := map[string]interface{}{
		"folders": publicFolders,
		"files":   []string{},
	}
	publicBytes, err := json.MarshalIndent(publicData, "", "\t")
	if err != nil {
		fmt.Printf("Error marshaling root public tree: %v\n", err)
		return
	}
	os.WriteFile("public/tree.json", publicBytes, 0644)

	// Create public/play/tree.json (empty for now)
	if err := os.MkdirAll("public/play", 0755); err != nil {
		fmt.Printf("Error creating public/play directory: %v\n", err)
		return
	}
	playData := map[string]interface{}{
		"folders": []string{},
		"files":   []string{},
	}
	playBytes, err := json.MarshalIndent(playData, "", "\t")
	if err != nil {
		fmt.Printf("Error marshaling play tree: %v\n", err)
		return
	}
	os.WriteFile("public/play/tree.json", playBytes, 0644)

	// Create root dev/tree.json with folders as usernames
	devFolders := []string{}
	for userID := range gamesByUser {
		username := getUsername(userID)
		if username != "" {
			devFolders = append(devFolders, username)
		}
	}
	sort.Strings(devFolders)

	rootData := map[string]interface{}{
		"folders": devFolders,
		"files":   []string{},
	}
	rootBytes, err := json.MarshalIndent(rootData, "", "\t")
	if err != nil {
		fmt.Printf("Error marshaling root dev tree: %v\n", err)
		return
	}
	os.WriteFile("public/dev/tree.json", rootBytes, 0644)

	// Create tree.json for each user folder
	for userID, userGames := range gamesByUser {
		username := getUsername(userID)
		if username == "" {
			continue
		}

		fileList := []string{}
		for _, g := range userGames {
			filename := fmt.Sprintf("public/dev/%s/%s.tic", username, g.Name)
			if _, err := os.Stat(filename); err == nil {
				// File exists, add to list
				if hash, ok := gameHashes.Load(g.ID); ok {
					path := fmt.Sprintf("/dev/%s/%s.tic?%s", username, g.Name, hash)
					fileList = append(fileList, path)
				} else {
					path := fmt.Sprintf("/dev/%s/%s.tic", username, g.Name)
					fileList = append(fileList, path)
				}
			}
		}

		data := map[string]interface{}{
			"folders": []string{},
			"files":   fileList,
		}

		jsonBytes, err := json.MarshalIndent(data, "", "\t")
		if err != nil {
			fmt.Printf("Error marshaling for dev %s: %v\n", username, err)
			continue
		}

		os.WriteFile(fmt.Sprintf("public/dev/%s/tree.json", username), jsonBytes, 0644)
	}

	fmt.Println("Created tree indexes.")
}