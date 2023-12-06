import { User } from "@/types";

export const getTickets = async (user: User) => {
    try {
        const response = await fetch('http://localhost:3000/api/tickets/', 
        {
            headers: 
            {
                'Authorization': `Bearer ${user.token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Response", data);
        return data;
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of an error
    }
};
