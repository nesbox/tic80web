#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function calculateSHA256(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

function updateHashesInCreatePage() {
  const downloadDir = path.join(__dirname, '..', 'public', 'download');
  const hashesFilePath = path.join(__dirname, '..', 'src', 'data', 'hashes.json');

  // Scan download directory for all files
  let files;
  try {
    files = fs.readdirSync(downloadDir);
  } catch (error) {
    console.error(`Error reading download directory: ${error.message}`);
    return;
  }

  const hashes = {};

  files.forEach(file => {
    // Skip directories and hidden files
    const filePath = path.join(downloadDir, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile() && !file.startsWith('.')) {
      hashes[file] = calculateSHA256(filePath);
      console.log(`${file}: ${hashes[file]}`);
    }
  });

  // Save hashes to JSON file
  fs.writeFileSync(hashesFilePath, JSON.stringify(hashes, null, 2), 'utf8');
  console.log('Hashes saved to src/data/hashes.json');
}

if (require.main === module) {
  updateHashesInCreatePage();
}

module.exports = { calculateSHA256, updateHashesInCreatePage };
