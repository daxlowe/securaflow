import mongoose from 'mongoose';
import { Request, Response } from 'express';
import Ticket from '../models/Ticket';
import User from '../models/User';

// Function to add multiple tickets to a user's tickets array
const addTicketsToUser = async (userId: mongoose.Types.ObjectId, ticketIds: mongoose.Types.ObjectId[]) => {
    await User.findByIdAndUpdate(userId, { $push: { tickets: { $each: ticketIds } } });
};

export {
    addTicketsToUser,
}