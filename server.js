const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all routes

// Proxy route to fetch trip data
app.get('/api/trips', async (req, res) => {
    const { from_city, to_city, date_of_journey, seat_class } = req.query;

    // Construct the API URL
    const apiUrl = `https://railspaapi.shohoz.com/v1.0/app/bookings/search-trips-v2`;
    
    try {
        const response = await axios.get(apiUrl, {
            params: {
                from_city,
                to_city,
                date_of_journey,
                seat_class,
                android_app_version: '11',
                android_device_id: '2'
            }
        });

        // Send the API response back to the client
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching trips:', error);
        res.status(500).json({ error: 'Failed to fetch trips' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
