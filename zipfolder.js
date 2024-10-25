// zipFolder.js

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

/**
 * Compresses a folder into a zip file
 * @param {string} sourceDir - The directory to compress
 * @param {string} outputZip - The path for the output zip file
 */
function zipFolder(sourceDir, outputZip) {
    const output = fs.createWriteStream(outputZip);
    const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level
    });

    // Listen for errors
    archive.on('error', (err) => {
        throw err;
    });

    // Pipe archive data to the output file
    archive.pipe(output);

    // Append files from the specified directory
    archive.directory(sourceDir, false);

    // Finalize the archive
    archive.finalize().then(() => {
        console.log(`Folder '${sourceDir}' has been compressed into '${outputZip}'`);
    });
}

// Example usage
const sourceDir = path.join(__dirname, 'your-folder'); // Replace with your folder's path
const outputZip = path.join(__dirname, 'your-folder.zip'); // The name of the zip file to create

zipFolder(sourceDir, outputZip);
