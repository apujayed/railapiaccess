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

// Predefined routes array
const routes = [
    { "id": 1, "from": "B Sirajul Islam", "to": "Dhaka" },
    { "id": 4, "from": "Thakurgaon_Road", "to": "Dhaka" },
    { "id": 5, "from": "Pirganj", "to": "Dhaka" },
    { "id": 6, "from": "Setabganj", "to": "Dhaka" },
    { "id": 7, "from": "Dinajpur", "to": "Dhaka" },
    { "id": 8, "from": "Chirirbandar", "to": "Dhaka" },
    { "id": 9, "from": "Parbatipur", "to": "Dhaka" },
    { "id": 10, "from": "Fulbari", "to": "Dhaka" },
    { "id": 11, "from": "Birampur", "to": "Dhaka" },
    { "id": 12, "from": "Panchbibi", "to": "Dhaka" },
    { "id": 13, "from": "Joypurhat", "to": "Dhaka" },
    { "id": 14, "from": "Akkelpur", "to": "Dhaka" },
    { "id": 15, "from": "Santahar", "to": "Dhaka" },
    { "id": 16, "from": "Ahsanganj", "to": "Dhaka" },
    { "id": 17, "from": "Natore", "to": "Dhaka" }
];

// Proxy route to fetch data for all routes and send the results
app.use('/', (req, res) => {

    const { date_of_journey } = req.query; // Get the date from the query parameters

    if (!date_of_journey) {
        return res.status(400).json({ error: 'Missing date_of_journey parameter' });
    }

    let results = [];
    let completedRequests = 0;

    routes.forEach((route, index) => {
        const url = `https://railspaapi.shohoz.com/v1.0/web/bookings/search-trips-v2?from_city=${encodeURIComponent(route.from)}&to_city=${encodeURIComponent(route.to)}&date_of_journey=${encodeURIComponent(date_of_journey)}&seat_class=AC_B`;

        request(url, (error, response, body) => {
            console.log(response);
            
            if (!error && response.statusCode === 200) {
                results.push({ route_id: route.id, data: JSON.parse(body) });
            } else {
                results.push({ route_id: route.id, error: 'Failed to fetch data' });
            }

            completedRequests++;
            if (completedRequests === routes.length) {
                res.json(results); // Send the combined results when all requests are completed
            }
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
