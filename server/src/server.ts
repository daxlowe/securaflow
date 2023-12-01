import express, { Request, Response } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import ticketRoutes from './routes/ticketRoutes';
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

app.use('/users', userRoutes);
app.use('/api/tickets', ticketRoutes)

app.get('/login', (req: Request, res: Response) => {
    // __dirname is the directory of the current module, i.e., where server.ts is located
    // path.join is used to create a path to your HTML file
    res.sendFile(path.join(__dirname, 'static', 'hackedLoginYOLO.html'));
});

// Temporary login handler to redirect to the dashboard
app.post('/login', (req: Request, res: Response) => {
    // Redirect to the dashboard route
    res.redirect('/dashboard');
});

// Define a route handler for the dashboard
app.get('/dashboard', (req: Request, res: Response) => {
    // Send the dashboard.html file
    res.sendFile(path.join(__dirname, 'static', 'dashboard.html'));
});

// Define a route handler for GET requests to the root URL ('/')
app.get('/', async (req: Request, res: Response) => {
    try {
        //res.status(200).send("Hello, World!");
        const ticket = await Ticket.create(
            {
                name: "Test",
                description: "Test",
                difficulty: 10,
                assignees: [],
                time_estimate: 10,
                current_status: "Open",
                status_updates:
                    [
                        {
                            body: "Open",
                            date_started: "2001-04-22",
                            date_ended: null
                        }
                    ],
                vulnerability:
                {
                    name: "Test",
                    cve_id: "1",
                    priority: "High",
                    imported_from: "Test"
                },
                comments: ["Test"]
            });

        res.status(200).json(ticket);
        //const user = await User.create({first_name: "Shad", last_name: "Boswell", email: "fakemail@gmail.com", groups: [], tickets: []});
        //res.status(200).json(user);
    }
    catch (error: any) {
        res.status(400).json({ error: error.message });
    }
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