export const createTicket = async (ticketData : FormData) => {
    const storedData = localStorage.getItem('user')
    let authToken = ''
    if(storedData) {
        const authData = JSON.parse(storedData)
        authToken = authData.token
    }
    console.log(ticketData)

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: ticketData,
    };

    const response = await fetch('http://localhost:3000/api/tickets', options);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};

                                                                                              