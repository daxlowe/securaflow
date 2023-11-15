import express, { Request, Response } from 'express';

// Create an instance of express
const app = express();

// Define the port the server will run on
const PORT = process.env.PORT || 3000;

// Define a route handler for GET requests to the root URL ('/')
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
