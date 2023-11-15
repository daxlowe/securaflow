import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';

// Create an instance of express
const app = express();

// Define the port the server will run on
const PORT = process.env.PORT || 3000;

// Middleware to parse request body
app.use(express.json());

app.use('/users', userRoutes);

// Define a route handler for GET requests to the root URL ('/')
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
