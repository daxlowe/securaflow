import { useAuthContext } from "@/hooks/useAuthContext";
import { deleteTicket } from "@/utils/deleteTicket";
import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

interface DeleteTicketProps {
  ticket_id: string;
}

export function DeleteTicket({ ticket_id }: DeleteTicketProps) {
  const { user } = useAuthContext();
  const onDelete = async (ticket_id: string) => {
    try {
      await deleteTicket(ticket_id, user);
    } catch (error) {
      // Handle errors (e.g., show error message)
      console.error("Error deleting ticket:", error);
      window.alert(
        `The following error occured when trying to delete ticket: ${JSON.stringify(
          error
        )}`
      );
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Are you sure you want to delete this ticket?</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        <div className="flex space-x-2">
          <DialogClose>Cancel</DialogClose>
          <DialogClose>
            <button type="submit" onClick={() => onDelete(ticket_id)}>
              Delete
            </button>
          </DialogClose>
        </div>
      </DialogDescription>
    </>
  );
}
