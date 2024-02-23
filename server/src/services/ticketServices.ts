import Ticket, { TicketDocument } from "../models/Ticket";
import  DocumentDefinition, { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

export async function createTicketService(input: any)
{
    console.log("attempting to create ticket: in service");
    return Ticket.create(input);
}

export async function findTicket(query: FilterQuery<TicketDocument>, options: QueryOptions = {lean: true})
{
    return Ticket.findOne(query, {}, options);
}

export async function findAndUpdateTicket(query: FilterQuery<TicketDocument>, update: UpdateQuery<TicketDocument>, options: QueryOptions)
{
    return Ticket.findByIdAndUpdate(query, update, options);
}

export async function deleteTicketService(query: FilterQuery<TicketDocument>)
{
    return Ticket.deleteOne(query);
}
