// Import necessary modules
const express = require('express');
const path = require('path');

// Initialize the app
const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define /gethello route
app.get('/gethello', (req, res) => {
    res.send("Hello NodeJS!!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
