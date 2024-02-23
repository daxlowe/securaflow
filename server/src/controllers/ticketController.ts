import mongoose from "mongoose";
import { Request, Response } from "express";
import Ticket, { TicketDocument } from "../models/Ticket";
import Group from "../models/Group";
import { createTicketInput, getTicketInput, updateTicketInput } from "../schema/ticketSchema";
import { createTicketService, deleteTicketService, findAndUpdateTicket, findTicket } from "../services/ticketServices";

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
    const ticket: TicketDocument = req.body as TicketDocument;
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
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No such ticket" });

  console.log(req.body);
  let data;
  try {
    data = req.body;
  } catch (error) {
    console.log(error);
    throw error;
  }
  const { ticketData, cve_id, current_status } = data;
  const status_update = {
    body: current_status,
  };
  // Not currently updating cve_id on tickets. Need NVD integration

  try {
    // Perform the tickt update
    console.log(JSON.stringify(status_update));
    const modifiedTicket: TicketDocument | null = await Ticket.findByIdAndUpdate(
      id,
      { 
        $set: {
          assignees: ticketData.assignees,
          comments: ticketData.comments,
          description: ticketData.description,
          difficulty: ticketData.difficulty,
          team: ticketData.team,
          time_estimate: ticketData.time_estimate,
          title: ticketData.title,
        },
        $push: { status_updates: status_update },
      },
      { new: true }
    );
    if (!modifiedTicket) {
      return res.status(404).json({ error: "No such ticket" });
    }

    res.status(200).json(modifiedTicket);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({
        error: `An unknown error occurred while attempting to update ticket: ${id}`,
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

export async function createTicketHandler(request: Request<{}, {}, createTicketInput["body"]>, response: Response)
{
  const user_id = response.locals.user._id;

  const body = request.body;

  const ticket = await createTicketService({...body});

  return response.send(ticket);
}

export async function updateTicketHandler(request: Request<updateTicketInput["params"]>, response: Response)
{
  const ticketID = request.params.ticketID;
  const update = request.body;

  console.log(ticketID);
  const ticket = await findTicket({ticketID});

  if(!ticket) return response.send(404);

  const updatedTicket = await findAndUpdateTicket({ticketID}, update, {new: true});
  return response.send(updatedTicket);
}

export async function getTicketHandler(request: Request<getTicketInput["params"]>, response: Response)
{
  const ticketID = request.params.ticketID;
  const ticket = await findTicket({ticketID});

  if(!ticket) return response.status(404);

  return response.send(ticket);
}

export async function deleteTicketHandler(request: Request, response: Response)
{
  const ticketID = request.params.ticketId;
  const ticket = await findTicket({ticketID});

  if(!ticket) return response.status(404);

  await deleteTicketService({ticketID});

  return response.sendStatus(200);
}

export async function getAllTicketsHandler(request: Request, response: Response)
{

}

export {
  getAllPossibleTickets,
  getAllAssignedTickets,
  getSingleTicket,
  createTicket,
  deleteTicket,
  updateTicket,
  setTicketTeam,
};
