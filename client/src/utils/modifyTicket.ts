import { Ticket } from "@/types";

export const modifyTicket = (ticket: Ticket) => {
    const options = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticket)
    };
    fetch(`http://localhost:3000/api/tickets/${ticket.id}`, options).then(response => {
        if(!response.ok) {
            window.alert(`The following error occured when trying to modify this ticket: ${response.statusText}`)
        }
        }).catch(error => console.error(error))
}
                                                                                                            