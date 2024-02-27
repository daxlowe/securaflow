import { getTickets } from "@/utils/getTickets";
import { Task } from "../types";
import { Ticket } from "@/types";
import { User } from "@/types/";

export async function getTicketsAsTasks(user: User) {
  const tickets: Ticket[] = await getTickets(user);

  const tasks: Task[] = tickets.map((ticket) => {
    let status = "";
    if (ticket.status_updates) {
      status = ticket.status_updates[0].body;
    }

    const task: Task = {
      id: ticket._id,
      title: ticket.title,
      team: ticket.team?.map((team) => team.name),
      priority: ticket.vulnerability.priority, // Use optional chaining to avoid potential null/undefined error
      status,
      assignee: ticket.assignees?.map(
        (assignee) => assignee.first_name + " " + assignee.last_name
      ),
      ticket: ticket,
    };

    return task;
  });
  return tasks.reverse();
}
