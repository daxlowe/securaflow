import { Ticket } from "@/types";

export const deleteTicket = (ticket: Ticket) => {
    const options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticket)
    };
    fetch(`http://localhost:3000/api/tickets/${ticket.id}`, options).then(response => {
        if(!response.ok) {
            window.alert(`The following error occured when trying to delete this ticket: ${response.statusText}`)
        }
    }).catch(error => console.error(error))
}
                                                                                                            