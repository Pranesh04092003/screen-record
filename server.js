const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(__dirname + '/public'));

// Ensure the 'public/recordings' directory exists
const recordingsDir = path.join(__dirname, 'public', 'recordings');
if (!fs.existsSync(recordingsDir)) {
    fs.mkdirSync(recordingsDir, { recursive: true });
}

wss.on('connection', (ws) => {
    console.log('WebSocket connection opened');
    let fileStream;
    const fileName = path.join(recordingsDir, `${Date.now()}.webm`);

    ws.on('message', (message) => {
        if (!fileStream) {
            fileStream = fs.createWriteStream(fileName);
        }
        fileStream.write(message);
    });

    ws.on('close', () => {
        if (fileStream) {
            fileStream.end();
            console.log('Screen recording saved:', fileName);
        }
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
