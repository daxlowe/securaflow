import mongoose from 'mongoose';
import { Request, Response } from 'express';
import Ticket from '../models/Ticket'
import { get } from 'http';

// GET all tickets
const get_all_tickets = async (req: Request, res: Response) =>
{
    const tickets = await Ticket.find({}).sort({createdAt: -1});
    res.status(200).json(tickets);
}

// GET a single ticket
const get_single_ticket = async (req: Request, res: Response) =>
{
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: "No such workout"});
    
    const ticket = await Ticket.findById(id);

    if(!ticket)
        return res.status(404).json({error: "No such workout"});
    
    res.status(200).json(ticket);
}
// POST a new ticket 
const create_ticket = async (req: Request, res: Response) =>
{
    const { name, description, difficulty, assignees, time_estimate, current_status, status_updates, vulnerability, comments } = req.body;

    try
    {
	    const ticket = await Ticket.create({ name, description, difficulty, assignees, time_estimate, current_status, status_updates, vulnerability, comments });
	    res.status(200).json(ticket);
    }
    catch (error)
    {
	    res.status(400).json({error: error});
    }
}

// DELETE a ticket
const delete_ticket = async (req: Request, res: Response) =>
{
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: "No such workout"});
    
    const ticket = await Ticket.findOneAndDelete({_id: id});

    if(!ticket)
        return res.status(404).json({error: "No such workout"});
    
    res.status(200).json(ticket);
}

// UPDATE a ticket
const update_ticket = async (req: Request, res: Response) =>
{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: "No such workout"});
    
    const ticket = await Ticket.findOneAndUpdate({_id: id},
						   {
						       ...req.body 
						   });

    if(!ticket)
        return res.status(404).json({error: "No such workout"});
    
    res.status(200).json(ticket);
}

export 
{
    get_all_tickets,
    get_single_ticket, 
    create_ticket, 
    delete_ticket, 
    update_ticket
}