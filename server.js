const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const {put} = require("@vercel/blob");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to catch all requests and save them to a file
app.all('/save-request', async (req, res) => {
    const requestData = `
        Method: ${req.method}
        URL: ${req.protocol}://${req.get('host')}${req.originalUrl}
        Headers: ${JSON.stringify(req.headers, null, 2)}
        Body: ${JSON.stringify(req.body, null, 2)}
    `;
    const { url } = await put('articles/blob.txt', requestData, { access: 'public', token: "vercel_blob_rw_Vr8jWMq7Dmphgbz7_WEjsirInc1SmLQFfCYstlTjz4QVNn2" });
    res.send(requestData);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
