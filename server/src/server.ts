import express, { Request, Response } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import ticketRoutes from './routes/ticketRoutes';
import groupRoutes from './routes/groupRoutes';
import * as mongoose from 'mongoose';
import dotenv from 'dotenv'
import User from './models/User';
import Ticket from './models/Ticket';
import Group from './models/Group';
import { group } from 'console';
import path from 'path';

dotenv.config()

// Create an instance of express
const app = express();

// Define the port the server will run on
const PORT = process.env.PORT;
const DB_CONN_STRING: string = `${process.env.DB_CONN}${process.env.DB_NAME}${process.env.DB_OPTIONS}`;

// Use cors middleware
app.use(cors());

// Serve static files from the 'static' directory
app.use(express.static(path.join(__dirname, 'static')));

// Middleware to parse request body
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/groups', groupRoutes);

// Define a route handler for the dashboard
app.get('/dashboard', (req: Request, res: Response) => {
    // Send the dashboard.html file
    res.sendFile(path.join(__dirname, 'static', 'dashboard.html'));
});

// Start the server

mongoose.connect(DB_CONN_STRING)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to DB. Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });