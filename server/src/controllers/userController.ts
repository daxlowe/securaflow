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
  try {
    const userId = request.body.user;
    const userData = request.body;

    // Construct the data object based on the presence of each field
    const data: { [key: string]: any } = {};
    if (userData.first_name) {
      data.first_name = userData.first_name;
    }
    if (userData.last_name) {
      data.last_name = userData.last_name;
    }
    if (userData.email) {
      data.email = userData.email;
    }
    if (userData.password) {
      const password = await User.validatePassword(userData.password);
      data.password = password;
    }

    console.log(data);
    // Update the user only with the fields that are present and not null
    const user = await User.findByIdAndUpdate(userId, data);

    response.status(200).json(user);
  } catch (error: any) {
    console.error("Error updating user:", error.message);
    response.status(400).json({ error: error.message });
  }
};

const deleteUser = async (request: Request, response: Response) => {
  try {
    // Retrieve user ID from request parameters or request body
    const { userId } = request.params; // Assuming user ID is passed as a route parameter

    // Check if user exists
    const user = await User.findById(userId);

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    // Delete the user
    await User.deleteOne({ _id: userId });

    // Respond with success message
    return response.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    // Respond with error message
    return response.status(500).json({ error: "Internal server error" });
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

const getUserData = async (request: Request, response: Response) => {
  const id = request.body.user;

  // Check if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "No such user" });
  }

  try {
    // Find the user by ID, excluding the password field
    const user = await User.findById(id).select("-password");

    // If user is not found, return 404 status with an error message
    if (!user) {
      return response.status(404).json({ error: "No such user" });
    }

    // If user is found, return 200 status with the user data
    response.status(200).json(user);
  } catch (error) {
    // If an error occurs during database query or processing, return 500 status with the error
    console.error("Error fetching user data:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserGroups = async (request: Request, res: Response) => {
  const id = request.body.user;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No such user" });

  try {
    const groups = await Group.find({
      users: id,
    }).populate("users");

    if (!groups.length) return res.status(200).json([]);

    res.status(200).json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllUsers = async (request: Request, response: Response) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Check if users were found
    if (!users || users.length === 0) {
      return response.status(404).json({ message: "No users found" });
    }

    // If users were found, send them as a response
    return response.status(200).json(users);
  } catch (error) {
    // If an error occurred, return an error response
    console.error("Error fetching users:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
};

export {
  addGroupsToUser,
  loginUser,
  signupUser,
  updateUser,
  getUserData,
  getUserGroups,
  deleteUser,
  getAllUsers,
};
