import { useAuthContext } from "@/hooks/useAuthContext";
import { deleteTicket } from "@/utils/deleteTicket";
import { DialogHeader } from "./ui/dialog";

interface DeleteTicketProps {
    ticket_id : string;
}

export function DeleteTicket({ticket_id} : DeleteTicketProps) {
    
    async function onDelete(ticket_id : string) {
        const { user } = useAuthContext()
        try {
            const ticketResponse = await deleteTicket(
                ticket_id,
                user,
            );
        
            if (ticketResponse) {
                console.log("Ticket deleted:", ticketResponse);
            } else {
                // handle error
            }
            // Handle success (e.g., clear form, show success message, etc.)
        } catch (error) {
            // Handle errors (e.g., show error message)
            console.error("Error deleting ticket:", error);
            window.alert(`The following error occured when trying to delete ticket: ${JSON.stringify(error)}`);
        }
    }

    return (
        <>
            <DialogHeader></DialogHeader>
        </>
    )
}