package main

import (
	"crypto/sha256"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
)

func main() {
	// Generate tree structure from filesystem
	generateTreeFromFilesystem()
	fmt.Println("Tree structure generation completed.")
}

func generateTreeFromFilesystem() {
	// Scan dev directory for structure
	devPath := "public/dev"
	userDirs, err := os.ReadDir(devPath)
	if err != nil {
		fmt.Printf("Error reading dev directory: %v\n", err)
		return
	}

	userNames := []string{}
	userFiles := make(map[string][]string)

	// Process each user directory
	for _, userDir := range userDirs {
		if !userDir.IsDir() {
			continue
		}

		username := userDir.Name()
		userPath := filepath.Join(devPath, username)
		userNames = append(userNames, username)

		files, err := os.ReadDir(userPath)
		if err != nil {
			fmt.Printf("Error reading user directory %s: %v\n", username, err)
			continue
		}

		// Process .tic files
		for _, file := range files {
			if file.IsDir() || !strings.HasSuffix(file.Name(), ".tic") {
				continue
			}

			// Remove .tic extension for the game name
			gameName := strings.TrimSuffix(file.Name(), ".tic")
			filePath := filepath.Join(userPath, file.Name())

			// Generate SHA-256 hash for the file
			content, err := os.ReadFile(filePath)
			if err != nil {
				fmt.Printf("Error reading file %s: %v\n", filePath, err)
				continue
			}

			hashBytes := sha256.Sum256(content)
			hashShort := fmt.Sprintf("%x", hashBytes)[:7]

			// Add to user's file list with hash
			path := fmt.Sprintf("/dev/%s/%s.tic?%s", username, gameName, hashShort)
			userFiles[username] = append(userFiles[username], path)
		}

		// Sort files for each user
		sort.Strings(userFiles[username])
	}

	// Sort user directories
	sort.Strings(userNames)

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
	devData := map[string]interface{}{
		"folders": userNames,
		"files":   []string{},
	}
	devBytes, err := json.MarshalIndent(devData, "", "\t")
	if err != nil {
		fmt.Printf("Error marshaling root dev tree: %v\n", err)
		return
	}
	os.WriteFile("public/dev/tree.json", devBytes, 0644)

	// Create tree.json for each user folder
	for _, username := range userNames {
		userData := map[string]interface{}{
			"folders": []string{},
			"files":   userFiles[username],
		}

		jsonBytes, err := json.MarshalIndent(userData, "", "\t")
		if err != nil {
			fmt.Printf("Error marshaling for dev %s: %v\n", username, err)
			continue
		}

		os.WriteFile(fmt.Sprintf("public/dev/%s/tree.json", username), jsonBytes, 0644)
	}

	fmt.Println("Created tree indexes from filesystem.")
}