import mongoose, { mongo } from "mongoose";
import { Request, Response } from "express";
import Ticket from "../models/Ticket";
import Group, { GroupDocument } from "../models/Group";
import User from "../models/User";
import { addGroupsToUser } from "./userController";
import { setTicketTeam } from "./ticketController";
import {
  removeUsersFromGroupService,
  addUserToGroupService,
} from "../services/groupServices";

// GET all users in a specific group
const getAllUsersInGroup = async (req: Request, res: Response) => {
  const { groupId } = req.params;

  try {
    // Check if the provided groupId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({ error: "Invalid group ID" });
    }

    // Find the group and populate the 'users' field to get user details
    const group = await Group.findById(groupId).populate("users");

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Extract user details from the populated 'users' field
    const usersInGroup = group.users.map((user: any) => ({
      _id: user._id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    }));

    res.status(200).json(usersInGroup);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

// POST a new ticket
const createGroup = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    // Create a new group with the provided name
    const group: GroupDocument = await Group.create({ name });

    // Respond with the created group
    res.status(201).json(group);
  } catch (error) {
    // If an error occurs, respond with a 400 status and the error message
    console.error("Error creating group:", error);
    res.status(400).json({ error: "Failed to create group" });
  }
};

const deleteGroup = async (request: Request, response: Response) => {
  try {
    // Retrieve user ID from request parameters or request body
    const { groupId } = request.params; // Assuming user ID is passed as a route parameter

    // Check if user exists
    const group = await Group.findById(groupId);

    if (!group) {
      return response.status(404).json({ error: "User not found" });
    }

    // Delete the user
    await Group.deleteOne({ _id: groupId });

    // Respond with success message
    return response.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Error deleting team:", error);
    // Respond with error message
    return response.status(500).json({ error: "Internal server error" });
  }
};

// Add Tickets to a Group
const addTicketsToGroup = async (
  groupId: mongoose.Types.ObjectId,
  ticketIds: mongoose.Types.ObjectId[]
) => {
  try {
    await Group.findByIdAndUpdate(groupId, {
      $push: { groups: { $each: ticketIds } },
    });
    return { status: "success" };
  } catch (error) {
    return { status: "error", error: error };
  }
};

const getGroupData = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No such group" });

  const group = await Group.findById(id);

  if (!group) return res.status(404).json({ error: "No such group" });

  return res.status(200).json(group);
};

export async function modifyGroup(request: Request, response: Response) {
  const groupID = request.params.groupId;
  const userID = request.params.userId;
}

export async function modifyAllGroups(request: Request, response: Response) {
  try {
    // Loop through each object in request.body and update the corresponding document
    for (const groupData of request.body) {
      const { _id, ...updateData } = groupData; // Extract _id and other update fields

      // Update the document with the given _id
      await Group.updateOne({ _id }, { $set: updateData });
    }

    response.json({ message: `${request.body.length} documents updated` });
  } catch (error) {
    console.error("Error updating documents:", error);
    response
      .status(500)
      .json({ error: "An error occurred while updating documents" });
  }
}

export async function removeUsersFromGroup(
  request: Request,
  response: Response
) {
  const groupID = request.params.groupId;
  const users = request.body.users;
  const modifiedGroup = await removeUsersFromGroupService(
    { _id: groupID },
    users
  );
  return response.status(200).json(modifiedGroup);
}

export async function addUsersToGroup(req: Request, response: Response) {
  const groupId = req.params.groupId;
  const users = req.body.users;
  const modifiedGroup = await addUserToGroupService({ _id: groupId }, users);
  return response.status(200).json(modifiedGroup);
}

const getAllGroups = async (request: Request, response: Response) => {
  try {
    // Fetch all groups from the database
    const groups = await Group.find();

    // Check if groups were found
    if (!groups || groups.length === 0) {
      return response.status(404).json({ message: "No users found" });
    }

    // If groups were found, send them as a response
    return response.status(200).json(groups);
  } catch (error) {
    // If an error occurred, return an error response
    console.error("Error fetching users:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
};

export {
  createGroup,
  addTicketsToGroup,
  getGroupData,
  getAllUsersInGroup,
  getAllGroups,
  deleteGroup,
};
