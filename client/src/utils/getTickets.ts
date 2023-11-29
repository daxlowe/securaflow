export const getTickets = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/tickets/');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of an error
    }
};
