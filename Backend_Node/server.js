const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // Import CORS
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all requests
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Set up SQLite database connection
const db = new sqlite3.Database(path.join(__dirname, '../database/database.db'), (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Define a route to handle feedback submissions
app.post('/feedback', (req, res) => {
    const { emotion } = req.body;

    // Simulated adaptive feedback based on detected emotion
    let message;
    switch (emotion.toLowerCase()) {
        case 'happy':
            message = "It's great to see you're feeling happy! Here are some tricky challenges you can take on";
            break;
        case 'confused':
            message = "It seems you might be struggling. Here’s a recap to help reinforce key concepts.";
            break;
        case 'sad':
            message = "It's okay to feel sad sometimes. Remember to take breaks and reach out for support!";
            break;
        default:
            message = "Thanks for your feedback! Keep expressing your emotions.";
    }

    // Send the adaptive feedback as a response
    res.json({ message });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
