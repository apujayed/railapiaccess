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

// Predefined routes array and date
const routes = [
    { from_city: 'B Sirajul Islam', to_city: 'Dhaka' }
];

const date_of_journey = '22-Aug-2024'; // Predefined date

// Proxy route using predefined routes and date
app.use('/', (req, res) => {
    // Directly use the route from the array
    const url = `https://railspaapi.shohoz.com/v1.0/web/bookings/search-trips-v2?from_city=${encodeURIComponent(routes[0].from_city)}&to_city=${encodeURIComponent(routes[0].to_city)}&date_of_journey=${encodeURIComponent(date_of_journey)}&seat_class=AC_B`;

    req.pipe(request(url)).pipe(res);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
