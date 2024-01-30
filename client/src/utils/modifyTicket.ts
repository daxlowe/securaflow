import { User } from "@/types";

export const modifyTicket = async (ticketData : any, ticketID : string, user : User) => {
    const options = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(ticketData)
    };
    fetch(`http://localhost:3000/api/ticket/${ticketID}`, options).then(response => {
    if(!response.ok) {
            window.alert(`The following error occured when trying to modify this ticket: ${response.statusText}`)
        }
        }).catch(error => console.error(error))
}
                                                                                                            