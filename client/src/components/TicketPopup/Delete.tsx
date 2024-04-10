import { useAuthContext } from "@/hooks/useAuthContext";
import { deleteTicket } from "@/utils/deleteTicket";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Task } from "@/features/dashboard/types";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { Button } from "../ui/button";

interface DeleteTicketProps {
  ticket_id: string;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Task[], Error>>;
}

export function DeleteTicket({ ticket_id, refetch }: DeleteTicketProps) {
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
    refetch();
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Are you sure you want to delete this ticket?</DialogTitle>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="submit" onClick={() => onDelete(ticket_id)}>
            Delete
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
