import { User } from "@/types";

export const deleteTicket = async (ticket_id : string, user : User) => {
    const options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        },
    };
    fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/ticket/${ticket_id}`, options)
        .then((response) => {
            if (!response.ok) {
                window.alert(
                `The following error occured when trying to create a ticket: ${response.statusText}`
                );
            }
        })
        .catch((error) => console.error(error));
}
                                                                                                            
