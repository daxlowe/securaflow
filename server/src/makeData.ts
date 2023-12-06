import mongoose from 'mongoose';
import User from './models/User';
import Group from './models/Group';
import Ticket from './models/Ticket';
import dotenv from 'dotenv';

dotenv.config();

const DB_CONN_STRING: string = `${process.env.DB_CONN}${process.env.DB_NAME}${process.env.DB_OPTIONS}`;

const createDummyData = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Group.deleteMany({});
        await Ticket.deleteMany({});

        // Creating Users with required password field
        const users = await User.create([
            { first_name: 'Alice', last_name: 'Johnson', email: 'alice@example.com', password: 'AlicePassword123' },
            { first_name: 'Bob', last_name: 'Smith', email: 'bob@example.com', password: 'BobPassword123' },
            { first_name: 'Charlie', last_name: 'Brown', email: 'charlie@example.com', password: 'CharliePassword123' },
            { first_name: 'Diana', last_name: 'Prince', email: 'diana@example.com', password: 'DianaPassword123' },
            // ... add as many users as needed
        ]);

        // Creating Groups
        const groups = await Group.create([
            { name: 'Group1', permissions: { read: true, write: false }, users: [users[0]._id, users[1]._id] },
            { name: 'Group2', permissions: { read: true, write: true }, users: [users[2]._id, users[3]._id] },
        ]);

        // Update Users with Group Information
        for (const user of users) {
            const userGroups = groups.filter(group => group.users.includes(user._id));
            await User.findByIdAndUpdate(user._id, { $set: { groups: userGroups.map(group => group._id) } });
        }

        // Creating Tickets with varying properties and status updates
        const tickets = await Ticket.create([
            {
                name: 'Ticket1',
                description: 'Description1',
                difficulty: 3,
                assignees: [users[0]._id, users[1]._id],
                current_status: 'In Progress',
                time_estimate: 10,
                status_updates: [
                    {
                        body: 'Open',
                        date_started: new Date('2022-01-01'),
                        date_ended: new Date('2022-01-02')
                    },
                    {
                        body: 'Assigned',
                        date_started: new Date('2022-01-02'),
                        date_ended: new Date('2022-01-03')
                    },
                    {
                        body: 'In Progress',
                        date_started: new Date('2022-01-03'),
                        date_ended: null // Still in progress
                    }
                ],
                vulnerability: { name: 'Vulnerability1', cve_id: 'CVE-0001', priority: 'High' },
                comments: ['First comment', 'Second comment']
            },
            {
                name: 'Ticket2',
                description: 'Description2',
                difficulty: 5,
                assignees: [users[2]._id],
                current_status: 'Assigned',
                time_estimate: 5,
                status_updates: [
                    {
                        body: 'Assigned',
                        date_started: new Date('2022-02-01'),
                        date_ended: null // Still in Assigned state
                    }
                ],
                vulnerability: { name: 'Vulnerability2', cve_id: 'CVE-0002', priority: 'Medium' },
                comments: ['Initial comment']
            },
            {
                name: 'Ticket3',
                description: 'Description3',
                difficulty: 2,
                assignees: [users[1]._id, users[3]._id],
                current_status: 'Assigned',
                time_estimate: 15,
                status_updates: [
                    {
                        body: 'Open',
                        date_started: new Date('2022-03-01'),
                        date_ended: new Date('2022-03-05')
                    },
                    {
                        body: 'Assigned',
                        date_started: new Date('2022-03-05'),
                        date_ended: null // Work is still ongoing
                    }
                ],
                vulnerability: { 
                    name: 'Vulnerability3', 
                    cve_id: 'CVE-0003', 
                    priority: 'Low'
                },
                comments: ['Initial assessment completed', 'Awaiting further instructions']
            },
            {
                name: 'Ticket4',
                description: 'Description4',
                difficulty: 4,
                assignees: [], // No assignees yet
                current_status: 'Open',
                time_estimate: 20,
                status_updates: [
                    {
                        body: 'Open',
                        date_started: new Date('2022-04-01'),
                        date_ended: null // Ticket still open, not yet assigned
                    }
                ],
                vulnerability: { 
                    name: 'Vulnerability4', 
                    cve_id: 'CVE-0004', 
                    priority: 'Critical'
                },
                comments: ['Urgent issue, requires immediate attention']
            },
            {
                name: 'Ticket5',
                description: 'Description5',
                difficulty: 1,
                assignees: [users[0]._id],
                current_status: 'Closed',
                time_estimate: 8,
                status_updates: [
                    {
                        body: 'Open',
                        date_started: new Date('2022-05-01'),
                        date_ended: new Date('2022-05-02')
                    },
                    {
                        body: 'Assigned',
                        date_started: new Date('2022-05-02'),
                        date_ended: new Date('2022-05-04')
                    },
                    {
                        body: 'In Progress',
                        date_started: new Date('2022-05-04'),
                        date_ended: new Date('2022-05-09')
                    },
                    {
                        body: 'Closed',
                        date_started: new Date('2022-05-09'),
                        date_ended: null // Ticket still closed
                    }
                ],
                vulnerability: { 
                    name: 'Vulnerability5', 
                    cve_id: 'CVE-0005', 
                    priority: 'Medium'
                },
                comments: ['Quick resolution required', 'Issue resolved and verified']
            },
            
        ]);

        // Update Users with Ticket Information
        for (let ticket of tickets) {
            if (!ticket.assignees) {
                continue;
            }
            await Promise.all(
                ticket.assignees.map(userId => 
                    User.findByIdAndUpdate(userId, { $push: { tickets: ticket._id } })
                )
            );
        }

        console.log('Dummy data created successfully.');
    } catch (error) {
        console.error('Error creating dummy data:', error);
    } finally {
        await mongoose.disconnect();
    }
};

mongoose.connect(DB_CONN_STRING)
    .then(async () => {
        console.log("Connected to DB. Running data seed script.");
        createDummyData();
    })
    .catch((error) => {
        console.error("Error connecting to database or creating data:", error);
    });
