import { Ticket } from "@/types";

export type Task = {
    id?: string
    title: string;
    team?: Array<string>;
    priority: string;
    status: string;
    assignee?: Array<string>;
    ticket: Ticket
}