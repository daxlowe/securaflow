import { getTickets } from "@/utils/getTickets";
import { z } from "zod";
import { taskSchema } from "../data/schema";
import { Task } from "../types";
import { Ticket } from "@/types";

export async function getTicketsAsTasks() {
    const tickets: Ticket[] = await getTickets();

    const tasks: Task[] = tickets.map(ticket => {
        const task: Task = {
            id: ticket._id, // Adjust as needed
            title: ticket.name,
            team: ticket.group,
            priority: ticket.vulnerability.priority, // Use optional chaining to avoid potential null/undefined error
            status: ticket.current_status,
            assignee: ticket.assignees,
            ticket: ticket,
        };

        return task;
    });

    return tasks;
}
