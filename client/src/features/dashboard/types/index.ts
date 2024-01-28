import { Group, Ticket } from "@/types";

export type Task = {
    id?: string;
    title: string;
    team?: Array<Group>;
    priority: string;
    status: string;
    assignee?: Array<string>;
    ticket: Ticket;
};