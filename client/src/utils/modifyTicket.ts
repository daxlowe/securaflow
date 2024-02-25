import { User } from "@/types";

export const modifyTicket = async (ticketData : any, ticketID : string, user : User) => {
    const options = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(ticketData),
    };

    let response;
    try {
        response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/ticket/${ticketID}`, options);
    } catch (error) {
        console.error(error);
        throw error;
    }

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response;
}
                                                                                                            
