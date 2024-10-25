// promisifyUnlink.js

const fs = require("fs");
const util = require("util");

// Promisify fs.unlink
const unlinkAsync = util.promisify(fs.unlink);

/**
 * Deletes a file using promisified fs.unlink
 * @param {string} filePath - The path of the file to delete
 */
async function deleteFile(filePath) {
  try {
    await unlinkAsync(filePath);
    console.log(`Successfully deleted: ${filePath}`);
  } catch (error) {
    console.error(`Error deleting file: ${error.message}`);
  }
}

// Example usage
const filePath = "file.txt"; // Replace with the path of the file you want to delete

deleteFile(filePath);
