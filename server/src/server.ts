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
import connect from './utils/connect';
import log from './utils/logger'

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
app.use('/api/ticket', ticketRoutes);
app.use('/api/group', groupRoutes);

// Define a route handler for the dashboard
app.get('/dashboard', (req: Request, res: Response) => {
    // Send the dashboard.html file
    res.sendFile(path.join(__dirname, 'static', 'dashboard.html'));
});

// Start the server

try
{
    app.listen(PORT, () => {
        log.info(`Server is running at http://localhost:${PORT}`);

        connect();
    });
}
catch (error: any)
{
    log.error(error);
}
