const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to catch all requests and save them to a file
app.all('/save-request', (req, res) => {
    const requestData = `
        Method: ${req.method}
        URL: ${req.protocol}://${req.get('host')}${req.originalUrl}
        Headers: ${JSON.stringify(req.headers, null, 2)}
        Body: ${JSON.stringify(req.body, null, 2)}
    `;

    // Save request data to a file
    fs.writeFile('request_data.txt', requestData, (err) => {
        if (err) {
            console.error('Error saving request:', err);
            res.status(500).send('Error saving request');
            return;
        }
        console.log('Request data saved successfully');
        res.send('Request data saved successfully');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
