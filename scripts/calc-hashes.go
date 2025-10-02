package main

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"sort"
)

func calculateSHA256(filePath string) (string, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return "", err
	}
	defer file.Close()

	hash := sha256.New()
	if _, err := io.Copy(hash, file); err != nil {
		return "", err
	}

	return hex.EncodeToString(hash.Sum(nil)), nil
}

func main() {
	downloadDir := "public/download"
	hashesFile := "src/data/hashes.json"

	// Read all files in download directory
	files, err := os.ReadDir(downloadDir)
	if err != nil {
		fmt.Printf("Error reading download directory: %v\n", err)
		os.Exit(1)
	}

	hashes := make(map[string]string)

	for _, file := range files {
		if !file.IsDir() && file.Name()[0] != '.' {
			filePath := filepath.Join(downloadDir, file.Name())
			hash, err := calculateSHA256(filePath)
			if err != nil {
				fmt.Printf("Error calculating hash for %s: %v\n", file.Name(), err)
				continue
			}
			hashes[file.Name()] = hash
			fmt.Printf("%s: %s\n", file.Name(), hash)
		}
	}

	// Sort keys for consistent output
	var keys []string
	for k := range hashes {
		keys = append(keys, k)
	}
	sort.Strings(keys)

	sortedHashes := make(map[string]string)
	for _, k := range keys {
		sortedHashes[k] = hashes[k]
	}

	// Write JSON file
	jsonData, err := json.MarshalIndent(sortedHashes, "", "  ")
	if err != nil {
		fmt.Printf("Error marshaling JSON: %v\n", err)
		os.Exit(1)
	}

	if err := os.WriteFile(hashesFile, jsonData, 0644); err != nil {
		fmt.Printf("Error writing hashes file: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("Hashes saved to %s\n", hashesFile)
}
