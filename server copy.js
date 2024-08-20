const express = require('express');
const request = require('request');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;
const MAX_PAGES = 4 ; // Set the maximum number of pages to loop through

// Middleware to add CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Proxy route
app.use('/', (req, res) => {
    let allProducts = [];

    const fetchPage = (pageNumber) => {
        const url = `https://medeasy.health/_next/data/3QAvrNvj3CtSjWcJW5ieX/en/category/womens-choice.json?page=${pageNumber}&slug=womens-choice`;

        request({ url, json: true }, (error, response, body) => {
            if (error) {
                console.error(`Proxy request error on page ${pageNumber}:`, error);
                return res.status(500).send('Proxy request failed');
            }

            if (body && body.pageProps && body.pageProps.products) {
                allProducts = allProducts.concat(body.pageProps.products);
                console.log(`Fetched products from page ${pageNumber}`);

                if (pageNumber < MAX_PAGES) {
                    fetchPage(pageNumber + 1);
                } else {
                    // Write the combined products to db.json
                    fs.writeFile('db.json', JSON.stringify(allProducts, null, 2), (err) => {
                        if (err) {
                            console.error('Error writing to db.json:', err);
                            return res.status(500).send('Failed to save products to file');
                        }
                        console.log('All products successfully saved to db.json');
                    });

                    // Send the combined products as JSON response
                    return res.json(allProducts);
                }
            } else {
                return res.status(404).send('Products not found');
            }
        });
    };

    // Start fetching from the first page
    fetchPage(1);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
