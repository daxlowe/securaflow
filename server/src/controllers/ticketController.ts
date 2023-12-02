import mongoose, { mongo } from 'mongoose';
import { Request, Response } from 'express';
import Ticket from '../models/Ticket';
import { addTicketsToUser, removeTicketsFromUser } from './userController';
import { DiffieHellman } from 'crypto';

// GET all tickets
const getAllTickets = async (req: Request, res: Response) =>
{
    const user_id = req.body.user._id;
    const tickets = await Ticket.find({}).sort({createdAt: -1});
    res.status(200).json(tickets);
}

// GET a single ticket
const getSingleTicket = async (req: Request, res: Response) =>
{
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: "No such ticket"});
    
    const ticket = await Ticket.findById(id);

    if(!ticket)
        return res.status(404).json({error: "No such ticket"});
    
    res.status(200).json(ticket);
}

// POST a new ticket 
const createTicket = async (req: Request, res: Response) =>
{
    const { title, description, difficulty, assignees, time_estimate, current_status, status_updates, vulnerability, comments } = req.body;
    const { name, cve_id, priority } = vulnerability;
    
    let emptyFields = [];

    if(!title)
        emptyFields.push('Title');

    if(!description)
        emptyFields.push('Description');

    if(!difficulty)
        emptyFields.push('Difficulty');

    if(!assignees)
        emptyFields.push('Assignees');

    if(!current_status)
        emptyFields.push('Current Status');

    if(!vulnerability)
        emptyFields.push('Vulnerability required');

    if(!name)
        emptyFields.push('Vulnerability Name');

    if(!cve_id)
        emptyFields.push('CVE ID');

    if(!priority)
        emptyFields.push('Priority');

    if(emptyFields.length > 0)
        return res.status(400).json({ error: `Missing required fields: ${emptyFields}`, emptyFields});

    try
    {
        const user_id = req.body.user_id;
	    const ticket: Ticket = await Ticket.create({ title, description, difficulty, assignees, time_estimate, current_status, status_updates, vulnerability, comments });
        
        // Add the new ticket to each assignee's array of tickets
        if (ticket.assignees && ticket.assignees.length > 0) {
            await Promise.all(
                ticket.assignees.map(assigneeId => addTicketsToUser(assigneeId, [ticket._id]))
            );
        }

        res.status(200).json(ticket);
    }
    catch (error)
    {
	    res.status(400).json({error: error});
    }
}

// DELETE a ticket
const deleteTicket = async (req: Request, res: Response) =>
{
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: "No such ticket"});
    
    const ticket = await Ticket.findOneAndDelete({_id: id});

    if(!ticket)
        return res.status(404).json({error: "No such ticket"});
    
    res.status(200).json(ticket);
}

// UPDATE a ticket
const updateTicket = async (req: Request, res: Response) =>
{
    const { ticketId } = req.params;
    if(!mongoose.Types.ObjectId.isValid(ticketId))
        return res.status(404).json({error: "No such ticket"});

    try {
        // Fetch the current ticket to get the existing list of assignees
        const currentTicket: Ticket | null = await Ticket.findById(ticketId);
        
        // Perform the tickt update
        const modifiedTicket: Ticket | null = await Ticket.findByIdAndUpdate(ticketId, req.body, { new: true });
        if (!modifiedTicket) {
            return res.status(404).json({error: "No such ticket"});
        }

        // Compare assignees and update users if necessary
        const newAssignees: mongoose.Types.ObjectId[] = modifiedTicket.assignees || [];
        const oldAssignees: mongoose.Types.ObjectId[] = currentTicket?.assignees || [];

        const assigneesAdded: mongoose.Types.ObjectId[] = newAssignees.filter(assignee => !oldAssignees.includes(assignee));
        const assigneesRemoved: mongoose.Types.ObjectId[] = oldAssignees.filter(assignee => !newAssignees.includes(assignee));

        await Promise.all([
            ...assigneesAdded.map(assigneeId => addTicketsToUser(assigneeId, [modifiedTicket._id])),
            ...assigneesRemoved.map(assigneeId => removeTicketsFromUser(assigneeId, [modifiedTicket._id])),
        ]);

        res.status(200).json(modifiedTicket);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: `An unknown error occurred while attempting to update ticket: ${ticketId}` });
        }
    }
}

/*
// GET user's tickets
const getUsersTickets = async (req: Request, res: Response) =>
{
    const userId = req.params.userId;
    try {
        const tickets = await Ticket.find({ assignees: userId }).exec();

        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: `Error fetching tickets for user ${userId}.`});
    }
}
*/

export 
{
    getAllTickets,
    getSingleTicket, 
    createTicket, 
    deleteTicket, 
    updateTicket
}