const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Default route for root URL
app.get('/', (req, res) => {
    res.send('Hello from Render!');
});

// Add more routes here as needed

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
