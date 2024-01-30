import { Ticket, User } from "@/types";

export const deleteTicket = async (ticket_id : string, user : User) => {
    const options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        },
    };
    let response;
    try {
        response = await fetch(`http://localhost:3000/api/ticket/${ticket_id}`, options);
    } catch (error) {
        console.error(error);
        throw error;
    }

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response;
}
                                                                                                            