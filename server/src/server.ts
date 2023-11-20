import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';
import * as mongoose from 'mongoose';
import dotenv from 'dotenv'
import User from './models/User';
import Ticket from './models/Ticket';
import Group from './models/Group';
import { group } from 'console';

dotenv.config()

// Create an instance of express
const app = express();

// Define the port the server will run on
const PORT = process.env.PORT;
const DB_CONN_STRING: string = `${process.env.DB_CONN}${process.env.DB_NAME}${process.env.DB_OPTIONS}`;

// Middleware to parse request body
app.use(express.json());

app.use('/users', userRoutes);

// Define a route handler for GET requests to the root URL ('/')
app.get('/', async (req: Request, res: Response) => {
    try
    {
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
    catch (error: any)
    {
        res.status(400).json({error: error.message });
    }
});

// Start the server

mongoose.connect(DB_CONN_STRING)
    .then(() =>
	{
	    app.listen(PORT, () => {
		console.log(`Connected to DB. Server is running on port ${PORT}`);
	    });
	})
    .catch((error) =>
	{
	    console.log(error);
	});