export const modifyTicket = async (ticketData : any, ticketID : string) => {
    const storedData = localStorage.getItem('user')
    let authToken = ''
    if(storedData) {
        const authData = JSON.parse(storedData)
        authToken = authData.token
    }
    const options = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(ticketData)
    };
    const response = await fetch(`http://localhost:3000/api/tickets/${ticketID}`, options)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}
                                                                                                            