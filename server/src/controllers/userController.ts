import mongoose from 'mongoose';
import { Request, Response } from 'express';
import Ticket from '../models/Ticket';
import User from '../models/User';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const createToken = (_id: string) =>
{
    return jwt.sign({_id}, process.env.SECRET as Secret, { expiresIn: '3d' });
}

// Login user
const loginUser = async (request: Request, response: Response) =>
{
    const {email, password} = request.body;
    try
    {
        // @ts-ignore
        const user = await User.login(email, password);
        console.log(user);
        // Create a token
        const token = createToken(user._id);

        response.status(200).json({email, token});
    }
    catch (error: any)
    {
        response.status(400).json({ error: error.message })
    }
}

// Signup user
const signupUser = async (request: Request, response: Response) =>
{
    const {email, password} = request.body;

    try
    {
        // @ts-ignore
        const user = await User.signup(email, password);

        // Create a token
        const token = createToken(user._id);

        response.status(200).json({email, token});
    }
    catch (error: any)
    {
        response.status(400).json({ error: error.message })
    }
}

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
    loginUser,
    signupUser
}