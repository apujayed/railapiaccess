const express = require('express');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to add CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Proxy route
app.use('/', (req, res) => {
    const url = 'https://railspaapi.shohoz.com/v1.0/web/bookings/search-trips-v2'; // Replace with your API endpoint
    req.pipe(request(url)).pipe(res);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
