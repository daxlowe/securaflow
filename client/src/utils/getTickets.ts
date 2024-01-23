import { User } from "@/types";
import { Ticket } from "@/types";
export const getTickets = async () => {
    try {
        const storedData = localStorage.getItem('user')
        let authToken = ''
        if(storedData) {
            const authData = JSON.parse(storedData)
            authToken = authData.token
        }
        const response = await fetch('http://localhost:3000/api/tickets/', 
        {
            headers: 
            {
                'Authorization': `Bearer ${authToken}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Ticket[] = await response.json();
        console.log(data);

        return data;
    } catch (error) {
        console.error(error);
        return  []; // Return an empty array in case of an error
    }
};
