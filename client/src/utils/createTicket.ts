import { Ticket } from "@/types";

export const createTicket = (ticket: Ticket) => {
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticket)
    };
    fetch(`http://localhost:3000/api/tickets/`, options).then(response => {
        if(!response.ok) {
            window.alert(`The following error occured when trying to create a ticket: ${response.statusText}`)
        }
        }).catch(error => console.error(error))
}
                                                                                                            