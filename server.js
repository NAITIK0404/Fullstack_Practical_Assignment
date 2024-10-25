    // server.js

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const chatbot = require('./chatbot');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files from the "public" directory
app.use(express.static('public'));

// WebSocket connection
wss.on('connection', (ws) => {
    console.log("New client connected!");

    ws.on('message', (message) => {
        const userMessage = message.toString();
        const response = chatbot.getResponse(userMessage);
        ws.send(response); // Send the chatbot response back to the client
    });

    ws.on('close', () => {
        console.log("Client disconnected");
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
