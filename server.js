const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
const port = 3001;

// Enable CORS for all origins
app.use(cors());

const location =[
    {
        "id": 1,
        "from": "B Sirajul Islam",
        "to": "Dhaka"
    },
    {
        "id": 4,
        "from": "Thakurgaon_Road",
        "to": "Dhaka"
    },
    {
        "id": 5,
        "from": "Pirganj",
        "to": "Dhaka"
    },
    {
        "id": 6,
        "from": "Setabganj",
        "to": "Dhaka"
    },
    {
        "id": 7,
        "from": "Dinajpur",
        "to": "Dhaka"
    },
    {
        "id": 8,
        "from": "Chirirbandar",
        "to": "Dhaka"
    },
    {
        "id": 9,
        "from": "Parbatipur",
        "to": "Dhaka"
    },
    {
        "id": 10,
        "from": "Fulbari",
        "to": "Dhaka"
    },
    {
        "id": 11,
        "from": "Birampur",
        "to": "Dhaka"
    },
    {
        "id": 12,
        "from": "Panchbibi",
        "to": "Dhaka"
    },
    {
        "id": 13,
        "from": "Joypurhat",
        "to": "Dhaka"
    },
    {
        "id": 14,
        "from": "Akkelpur",
        "to": "Dhaka"
    },
    {
        "id": 15,
        "from": "Santahar",
        "to": "Dhaka"
    },
    {
        "id": 16,
        "from": "Ahsanganj",
        "to": "Dhaka"
    },
    {
        "id": 17,
        "from": "Natore",
        "to": "Dhaka"
    },
    
]
app.get('/api/data', async (req, res) => {
    try {
    //   const date_of_journey  = '25-Apr-2024';
    const date_of_journey = req.query.date_of_journey;
      const seatClass = 'AC_B';
  
      const flightData = []; // Array to store flight data for each location
  
      for (const loc of location) {
        const { from, to } = loc;
        const apiUrl = `https://railspaapi.shohoz.com/v1.0/web/bookings/search-trips-v2?from_city=${from}&to_city=${to}&date_of_journey=${date_of_journey}&seat_class=${seatClass}`;
  
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
  
        await page.goto(apiUrl, { waitUntil: 'networkidle0' });
  
        const apiResponse = await page.evaluate(() => {
          return JSON.parse(document.querySelector('pre').innerText);
        });
  
        flightData.push(apiResponse?.data?.trains); // Push the response for this location to the flightData array
//   console.log(apiResponse?.data?.trains);
        await browser.close();
      }
  
      res.json(flightData); // Send the array of flight data for all locations
    } catch (error) {
      console.error('Error fetching API response:', error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
