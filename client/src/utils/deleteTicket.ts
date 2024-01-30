import { Ticket, User } from "@/types";

export const deleteTicket = async (ticket_id : string, user : User) => {
    const options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        },
    };
    fetch(`http://localhost:3000/api/ticket/${ticket_id}`, options)
        .then((response) => {
            if (!response.ok) {
                window.alert(
                `The following error occured when trying to create a ticket: ${response.statusText}`
                );
            }
        })
        .catch((error) => console.error(error));
}
                                                                                                            