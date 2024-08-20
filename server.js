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
    const url = 'https://railspaapi.shohoz.com/v1.0/app/bookings/search-trips-v2?from_city=B%20Sirajul%20Islam&to_city=Dhaka&date_of_journey=28-Aug-2024&seat_class=S_CHAIR&android_app_version=11&android_device_id=2'; // Replace with your API endpoint
    req.pipe(request(url)).pipe(res);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
