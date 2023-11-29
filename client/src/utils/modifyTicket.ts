import { Ticket } from "@/types";

export const modifyTicket = (ticket: Ticket) => {
    const options = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticket)
    };
    fetch("http://localhost:3000/", options)
}