// Import necessary modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
const PORT = 3000;

// Middleware to parse POST request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static resources from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle GET request
app.get('/api/greet', (req, res) => {
    const name = req.query.name || 'Guest';
    res.send(`Hello, ${name}!`);
});

// Handle POST request
app.post('/api/data', (req, res) => {
    const { name, age } = req.body;
    if (name && age) {
        res.send(`Received data: Name = ${name}, Age = ${age}`);
    } else {
        res.status(400).send('Bad Request: Name and Age are required');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
