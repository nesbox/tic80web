package main

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"
	"sync"
	"sync/atomic"
)

func main() {
	devDir := "public/dev"

	// Collect all .tic files first
	var ticFiles []string
	err := filepath.Walk(devDir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if strings.HasSuffix(path, ".tic") {
			ticFiles = append(ticFiles, path)
		}
		return nil
	})
	if err != nil {
		fmt.Printf("Error walking directory: %v\n", err)
		os.Exit(1)
	}

	total := len(ticFiles)
	fmt.Printf("Found %d .tic files to process\n", total)

	// Get absolute path to the xplode binary once
	xplodePath, err := filepath.Abs("scripts/xplode")
	if err != nil {
		fmt.Printf("Failed to get absolute path for xplode: %v\n", err)
		os.Exit(1)
	}

	// Process files in parallel with concurrency limited to number of CPU cores
	numWorkers := runtime.NumCPU()
	sem := make(chan struct{}, numWorkers)
	var wg sync.WaitGroup
	var counter int64 = 0

	for i, path := range ticFiles {
		wg.Add(1)
		go func(index int, ticPath string) {
			defer wg.Done()
			sem <- struct{}{}        // acquire
			processCounter := atomic.AddInt64(&counter, 1)
			processCart(processCounter, int64(total), index, ticPath, xplodePath)
			<-sem                     // release
		}(i, path)
	}

	wg.Wait()
	fmt.Println("All processing complete")
}

func processCart(processCounter, total int64, index int, path, xplodePath string) {
	// Get the cartname (filename without extension)
	cartname := strings.TrimSuffix(filepath.Base(path), ".tic")

	// Get the directory containing the .tic file (user folder)
	userDir := filepath.Dir(path)

	// Path for the explode folder
	explodeDir := filepath.Join(userDir, cartname)

	// Check if explode folder already exists
	if _, err := os.Stat(explodeDir); !os.IsNotExist(err) {
		fmt.Printf("[%d/%d] %s skipped (already exists)\n", processCounter, total, cartname)
		return
	}

	// Create the explode folder
	if err := os.MkdirAll(explodeDir, 0755); err != nil {
		fmt.Printf("Failed to create directory %s: %v\n", explodeDir, err)
		return
	}

	// Run xplode from the explode directory
	cmd := exec.Command(xplodePath, filepath.Join("..", cartname+".tic"))
	cmd.Dir = explodeDir
	output, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Printf("[%d/%d] %s failed: %v\n", processCounter, total, cartname, err)
		return
	}

	fmt.Printf("[%d/%d] %s\n", processCounter, total, cartname)

	if len(output) == 0 {
		fmt.Printf("Warning: No output from xplode for %s\n", cartname)
	}
}
