import mongoose from "mongoose";
import { Request, Response } from "express";
import Ticket from "../models/Ticket";
import Group from "../models/Group";

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

  try {
    const ticketData: Ticket = req.body; // Removed unnecessary try-catch block

    // Perform the ticket update
    const modifiedTicket: Ticket | null = await Ticket.findByIdAndUpdate(
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
          status_updates: ticketData.status_updates,
          vulnerability: ticketData.vulnerability
        },
      },
      { new: true }
    );

    if (!modifiedTicket) {
      return res.status(404).json({ error: "No such ticket" });
    }

    res.status(200).json(modifiedTicket);
  } catch (error: any) {
    console.log(error); // Log the error for debugging
    res.status(500).json({ error: error ? error.message : "An unknown error occurred" });
  }
};

const getCveTicketInfo = async (req: Request, res: Response) => {
  const { cveId } = req.params;

  console.log("cveId passed in: ", cveId);
  let response = await getCveInfo(cveId);

  if (!response) {
    res.status(404).json({ error: "Could not find CVE with matching ID" });
  } else {
    console.log("returning json: ", JSON.stringify(response));
    res.status(200).json(response);
  }
}

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

const getCveInfo = async (
  cveId: string,
) => {
  const url = `https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${cveId}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': process.env.NVD_API_KEY!,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    // console.log(JSON.stringify(data, null, 2));

    if (data.totalResults === 0) {
      return undefined;
    }

    const vuln = data.vulnerabilities[0];
    const id = vuln.cve.id;
    const description = vuln.cve.descriptions.find((description: any) => {
      return description.lang === "en";
    })?.value;
    const metrics = vuln.cve.metrics;
    let baseSeverity;
    if (metrics && metrics.cvssMetricV31) {
      baseSeverity = metrics.cvssMetricV31[0]?.cvssData?.baseSeverity;
    }

    return {
      summary: {
        cveId: id,
        description,
        baseSeverity,
      },
      all: vuln,
    };
  } catch (error) {
    console.error('Failed to fetch CVE info:', error);
  }
}

const getJiraTicket = async (req: Request, resp: Response) => {
  const { username, apiKey, jiraId } = req.body;
  const url = `https://securaflow.atlassian.net/rest/api/2/issue/${jiraId}`
  const auth = Buffer.from(username + ":" + apiKey).toString('base64');
  const response = await fetch(url,
    {
      method: "GET",
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json'
      }
    }
  );

  if(!response.ok) {
    return null;
  }

  const data = response.json();
  console.log(data);


};

export {
  getAllPossibleTickets,
  getAllAssignedTickets,
  getSingleTicket,
  createTicket,
  deleteTicket,
  updateTicket,
  setTicketTeam,
  getCveTicketInfo,
  getJiraTicket
};
