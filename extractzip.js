// extractZip.js

const fs = require("fs");
const path = require("path");
const unzipper = require("unzipper");

/**
 * Extracts a ZIP file to a specified directory
 * @param {string} zipFilePath - The path to the ZIP file
 * @param {string} outputDir - The directory where files will be extracted
 */
function extractZip(zipFilePath, outputDir) {
  fs.createReadStream(zipFilePath)
    .pipe(unzipper.Extract({ path: outputDir }))
    .on("close", () => {
      console.log(`Extracted '${zipFilePath}' to '${outputDir}'`);
    })
    .on("error", (err) => {
      console.error(`Error extracting ZIP file: ${err}`);
    });
}

// Example usage
const zipFilePath = path.join(__dirname, "your-folder.zip"); // Replace with your ZIP file's path
const outputDir = path.join(__dirname, "extracted-files"); // The directory where files will be extracted

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

extractZip(zipFilePath, outputDir);
