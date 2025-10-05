package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type VersionInfo struct {
	Major  int    `json:"major"`
	Minor  int    `json:"minor"`
	Patch  int    `json:"patch"`
	Suffix string `json:"suffix"`
	Commit string `json:"commit"`
}

func main() {
	// Read version.txt
	data, err := os.ReadFile("src/data/version.txt")
	if err != nil {
		fmt.Printf("Error reading version.txt: %v\n", err)
		os.Exit(1)
	}

	// Parse the content: "1.2.3081-dev (c102ae2)"
	content := strings.TrimSpace(string(data))
	parts := strings.Fields(content)
	if len(parts) < 1 {
		fmt.Println("Unexpected version.txt format")
		os.Exit(1)
	}

	fullVersion := parts[0]
	versionSuffix := strings.Split(fullVersion, "-")
	versionNoSuffix := versionSuffix[0]
	suffix := ""
	if len(versionSuffix) > 1 {
		suffix = strings.Join(versionSuffix[1:], "-")
	}

	// Extract commit hash
	commit := ""
	if strings.Contains(content, "(") && strings.Contains(content, ")") {
		start := strings.Index(content, "(")
		end := strings.Index(content, ")")
		if end > start {
			commit = content[start+1 : end]
		}
	}

	// Split version into parts
	versionParts := strings.Split(versionNoSuffix, ".")
	if len(versionParts) != 3 {
		fmt.Println("Unexpected version format")
		os.Exit(1)
	}

	major, err := strconv.Atoi(versionParts[0])
	if err != nil {
		fmt.Printf("Error parsing major version: %v\n", err)
		os.Exit(1)
	}

	minor, err := strconv.Atoi(versionParts[1])
	if err != nil {
		fmt.Printf("Error parsing minor version: %v\n", err)
		os.Exit(1)
	}

	patch, err := strconv.Atoi(versionParts[2])
	if err != nil {
		fmt.Printf("Error parsing patch version: %v\n", err)
		os.Exit(1)
	}

	versionInfo := VersionInfo{
		Major:  major,
		Minor:  minor,
		Patch:  patch,
		Suffix: suffix,
		Commit: commit,
	}

	// Marshal to JSON
	jsonData, err := json.MarshalIndent(versionInfo, "", "  ")
	if err != nil {
		fmt.Printf("Error marshaling JSON: %v\n", err)
		os.Exit(1)
	}

	// Write to public/version.json
	err = os.WriteFile("public/version.json", jsonData, 0644)
	if err != nil {
		fmt.Printf("Error writing version.json: %v\n", err)
		os.Exit(1)
	}

	fmt.Println("version.json generated successfully")
}
