import { Ticket } from "@/types";

export type Task = {
    id?: string;
    title: string;
    team?: string;
    priority: string;
    status: string;
    assignee?: Array<string>;
    ticket: Ticket;
};