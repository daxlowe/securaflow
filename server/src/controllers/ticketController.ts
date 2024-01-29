import mongoose, { mongo } from "mongoose";
import { Request, Response } from "express";
import Ticket from "../models/Ticket";
import Group from "../models/Group";
import User from "../models/User";
import { addTicketsToUser, removeTicketsFromUser } from "./userController";
import { Types } from "mongoose";
import { addTicketsToGroup } from "./groupController";
import { group } from "console";
import { validationResult } from "express-validator";
import { getUserData } from "./userController";
import { getGroupData } from "./groupController";

// GET all tickets from user's groups
const getAllPossibleTickets = async (req: Request, res: Response) => {
  try {
    const user_id = req.body.user;

    const groups = await Group.find({ users: user_id }).select("_id");
    const groupIds = groups.map((group) => group._id);

    const tickets = await Ticket.find({ team: { $in: groupIds } })
      .populate("team")
      .populate("assignees", "_id, first_name last_name email");
    res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error " });
  }
};

// GET all tickets assigned to user
const getAllAssignedTickets = async (req: Request, res: Response) => {
  try {
    const user_id = req.body.user;

    const tickets = await Ticket.find({ assignees: user_id })
      .populate("team")
      .populate("assignees", "_id first_name last_name email");

    res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET a single ticket
const getSingleTicket = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No such ticket" });

  const ticket = await Ticket.findById(id);

  if (!ticket) return res.status(404).json({ error: "No such ticket" });

  res.status(200).json(ticket);
};

// POST a new ticket
const createTicket = async (req: Request, res: Response) => {
  // Validation errors from express-validator middleware
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  try {
    req.body.created_by = req.body.user;
    delete req.body.user;
    const ticket: Ticket = req.body as Ticket;
    console.log(ticket);

    await Ticket.create(ticket);

    res.status(200).json(ticket);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

// DELETE a ticket
const deleteTicket = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No such ticket" });

  const ticket = await Ticket.findOneAndDelete({ _id: id });

  if (!ticket) return res.status(404).json({ error: "No such ticket" });

  res.status(200).json(ticket);
};

// UPDATE a ticket
const updateTicket = async (req: Request, res: Response) => {
  const { ticketId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(ticketId))
    return res.status(404).json({ error: "No such ticket" });

  try {
    // Fetch the current ticket to get the existing list of assignees
    const currentTicket: Ticket | null = await Ticket.findById(ticketId);

    // Perform the tickt update
    const modifiedTicket: Ticket | null = await Ticket.findByIdAndUpdate(
      ticketId,
      req.body,
      { new: true }
    );
    if (!modifiedTicket) {
      return res.status(404).json({ error: "No such ticket" });
    }

    // Compare assignees and update users if necessary
    const newAssignees: mongoose.Types.ObjectId[] =
      modifiedTicket.assignees || [];
    const oldAssignees: mongoose.Types.ObjectId[] =
      currentTicket?.assignees || [];

    const assigneesAdded: mongoose.Types.ObjectId[] = newAssignees.filter(
      (assignee) => !oldAssignees.includes(assignee)
    );
    const assigneesRemoved: mongoose.Types.ObjectId[] = oldAssignees.filter(
      (assignee) => !newAssignees.includes(assignee)
    );

    await Promise.all([
      ...assigneesAdded.map((assigneeId) =>
        addTicketsToUser(assigneeId, [modifiedTicket._id])
      ),
      ...assigneesRemoved.map((assigneeId) =>
        removeTicketsFromUser(assigneeId, [modifiedTicket._id])
      ),
    ]);

    res.status(200).json(modifiedTicket);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({
        error: `An unknown error occurred while attempting to update ticket: ${ticketId}`,
      });
    }
  }
};

// Function to add any number of tickets to a user's tickets array
const setTicketTeam = async (
  groupId: mongoose.Types.ObjectId,
  ticketIds: mongoose.Types.ObjectId[]
) => {
  try {
    const tickets = await Ticket.updateMany(ticketIds, { team: groupId });
    console.log(tickets);
    return { status: "success" };
  } catch (error) {
    return { status: "error", error: error };
  }
};

export {
  getAllPossibleTickets,
  getAllAssignedTickets,
  getSingleTicket,
  createTicket,
  deleteTicket,
  updateTicket,
  setTicketTeam,
};
