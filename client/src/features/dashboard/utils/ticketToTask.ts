import { getTickets } from "@/utils/getTickets";
import { Task } from "../types";
import { Ticket } from "@/types";
import { User } from '@/types/'

export async function getTicketsAsTasks(user: User) {
    //@ts-expect-error Not sure why 
    const tickets: Ticket[] = await getTickets(user);

    const tasks: Task[] = tickets.map(ticket => {
        const task: Task = {
            id: ticket._id,
            title: ticket.title,
            team: ticket.team,
            priority: ticket.vulnerability.priority, // Use optional chaining to avoid potential null/undefined error
            status: ticket.current_status,
            assignee: ticket.assignees,
            ticket: ticket,
        };

        return task;
    });

    return tasks;
}
