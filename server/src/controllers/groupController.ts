import mongoose, { mongo } from 'mongoose';
import { Request, Response } from 'express';
import Ticket from '../models/Ticket';
import Group from '../models/Group';
import User from '../models/User';
import { addGroupsToUser } from './userController';

// GET all tickets
const getAllGroups = async (req: Request, res: Response) =>
{
    const user_id = req.body.user._id;
    const groups = await User.findById(user_id).select("groups");
    console.log(groups);
    const tickets = await Ticket.find({team: [groups]});
    console.log(tickets);
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
const createGroup = async (req: Request, res: Response) =>
{
    const { name, permissions, users, tickets } = req.body;
    
    let emptyFields = [];

    if(!name)
        emptyFields.push('Name');

    if(!permissions)
        emptyFields.push('Permissions');

    if(!users)
        emptyFields.push('users');

    if(!tickets)
        emptyFields.push('tickets');

    if(emptyFields.length > 0)
        return res.status(400).json({ error: `Missing required fields: ${emptyFields}`, emptyFields});

    try
    {
	    const group: Group = await Group.create({ name, permissions, users, tickets });
        
        const filter = { _id: { $in: [...tickets]} }
        const updateTicket = 
        {
            $set:
            {
                team: group._id
            }
        }
        // Add the new ticket to each assignee's array of tickets
        if (group.users && group.users.length > 0) {
            await Promise.all([
                group.users.map(userId => addGroupsToUser(userId, [group._id])),
                Ticket.updateMany(filter, updateTicket)
            ]);
        }

        res.status(200).json(group);
    }
    catch (error)
    {
	    res.status(400).json({error: error});
    }
}

// Add Tickets to a Group
const addTicketsToGroup = async (groupId: mongoose.Types.ObjectId, ticketIds: mongoose.Types.ObjectId[]) =>
{
    try {
        await Group.findByIdAndUpdate(groupId, { $push: { groups: { $each: ticketIds } } });
        return { status: "success" };
    } catch (error) {
        return { status: "error", error: error };
    }
}

const getGroupData = async (req: Request, res: Response) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error: "No such group"});
    
    const group = await Group.findById(id);

    if(!group)
        return res.status(404).json({error: "No such group"});

    res.status(200).json(group);
};

export
{
    createGroup,
    addTicketsToGroup,
    getGroupData,
}