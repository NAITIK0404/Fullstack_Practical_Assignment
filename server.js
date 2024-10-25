import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"; // Import the 'path' module

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// API endpoint to fetch live cricket scores
app.get("/live-scores", async (req, res) => {
  try {
    const apiKey = process.env.API_KEY; // Use environment variable for API key
    const response = await axios.get(
      "https://api.cricapi.com/v1/currentMatches",
      {
        params: {
          apikey: apiKey,
          offset: 0, // Add any other parameters here if needed
        },
      }
    );

    // Send the data back to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching live scores:", error.message);
    res.status(500).send("Error fetching live scores");
  }
});

// Serve the static HTML page
app.get("/", (req, res) => {
  res.sendFile(path.resolve("index.html")); // Use path.resolve to construct the path
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
