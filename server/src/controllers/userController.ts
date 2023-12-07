import mongoose from 'mongoose';
import { Request, Response } from 'express';
import Ticket from '../models/Ticket';
import User from '../models/User';

// Function to add any number of tickets to a user's tickets array
const addTicketsToUser = async (userId: mongoose.Types.ObjectId, ticketIds: mongoose.Types.ObjectId[]) => {
    try {
        await User.findByIdAndUpdate(userId, { $push: { tickets: { $each: ticketIds } } });
        return { status: "success" };
    } catch (error) {
        return { status: "error", error: error };
    }
};

// Function to remove any number of tickets from a user's tickets array
const removeTicketsFromUser = async (userId: mongoose.Types.ObjectId, ticketIds: mongoose.Types.ObjectId[]) => {
    try {
        await User.findByIdAndUpdate(userId, { $pullAll: { tickets: ticketIds } });
        return { status: "success" };
    } catch (error) {
        return { status: "error", error: error };
    }
};

export {
    addTicketsToUser,
    removeTicketsFromUser,
}