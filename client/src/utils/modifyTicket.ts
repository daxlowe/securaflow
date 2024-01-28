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
    fetch(`http://localhost:3000/api/tickets/${ticket._id}`, options).then(response => {
    if(!response.ok) {
            window.alert(`The following error occured when trying to modify this ticket: ${response.statusText}`)
        }
        }).catch(error => console.error(error))
}
                                                                                                            