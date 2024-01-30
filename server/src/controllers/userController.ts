import mongoose from "mongoose";
import { Request, Response } from "express";
import Ticket from "../models/Ticket";
import User from "../models/User";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import Group from "../models/Group";
dotenv.config();

const createToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.SECRET as Secret, { expiresIn: "3d" });
};

// Login user
const loginUser = async (request: Request, response: Response) => {
  const { email, password } = request.body;
  try {
    // @ts-ignore
    const user = (await User.login(email, password)) as User;
    const first = user.first;
    const last = user.last;
    const id = user._id;
    // Create a token
    const token = createToken(user._id);

    response.status(200).json({ id, first, last, email, token });
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
};

// Signup user
const signupUser = async (request: Request, response: Response) => {
  const { first_name, last_name, email, password } = request.body;

  try {
    // @ts-ignore
    const user = await User.signup(first_name, last_name, email, password);
    console.log(user);
    // Create a token
    const token = createToken(user._id);

    response.status(200).json({ first_name, last_name, email, token });
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
};

const updateUser = async (request: Request, response: Response) => {
  console.log(request.body);
  const id = request.body.user._id;
  console.log(id);
  try {
    // @ts-ignore
    const user = await User.findByIdAndUpdate(id, request.body);
    response.status(200).json(user);
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
};

// Function to add any number of tickets to a user's tickets array
const addGroupsToUser = async (
  userId: mongoose.Types.ObjectId,
  groupIds: mongoose.Types.ObjectId[]
) => {
  try {
    await User.findByIdAndUpdate(userId, {
      $push: { groups: { $each: groupIds } },
    });
    return { status: "success" };
  } catch (error) {
    return { status: "error", error: error };
  }
};

const getUserData = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No such user" });

  const user = await User.findById(id).select("_id first_name last_name email");

  if (!user) return res.status(404).json({ error: "No such user" });

  res.status(200).json(user);
};

const getUserGroups = async (req: Request, res: Response) => {
  const { id: user_id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(user_id))
    return res.status(404).json({ error: "No such user" });

  try {
    const groups = await Group.find({
      users: user_id
    }).populate("users");

    if (!groups.length)
      return res.status(200).json([]);

    res.status(200).json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export {
  addGroupsToUser,
  loginUser,
  signupUser,
  updateUser,
  getUserData,
  getUserGroups,
};
