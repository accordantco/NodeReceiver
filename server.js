import express from 'express';
import bodyParser from 'body-parser';
import { put } from '@vercel/blob';
const app = express();
const PORT = process.env.PORT || 3000;

export const config = {
    runtime: 'edge',
};

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to catch all requests and save them to a file
app.post('/save-request', async (req, res) => {
    const requestData = `
        Method: ${req.method}
        URL: ${req.protocol}://${req.get('host')}${req.originalUrl}
        Headers: ${JSON.stringify(req.headers, null, 2)}
        Body: ${JSON.stringify(req.body, null, 2)}
    `;
    await put('articles/blob.txt', requestData, { access: 'public' });
    res.send(requestData);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
