import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ViewTicket } from "@/components/TicketPopup/View";
import { ModifyTicket } from "@/components/TicketPopup/Modify";
import { Task } from "../types";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DeleteTicket } from "@/components/TicketPopup/Delete";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Task[], Error>>;
}

export function DataTableRowActions<TData>({
  row,
  refetch,
}: DataTableRowActionsProps<TData>) {
  const originalData = row.original as Task;
  const ticket = originalData.ticket;
  // Manual validation
  if (
    !originalData.id ||
    !originalData.title ||
    !originalData.status ||
    !ticket?.vulnerability ||
    !ticket?.vulnerability.priority
  ) {
    // Handle validation error
    console.error("Invalid Ticket data:", originalData);
    return null; // or return an error component
  }

  // Now you can safely use the data
  const task = originalData;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="w-[100%]">
                View
              </Button>
            </DialogTrigger>
            <DialogContent>
              <ViewTicket task={task} />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="w-[100%]">
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <ModifyTicket task={task} refetch={refetch} />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="w-[100%]">
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DeleteTicket
                ticket_id={task.ticket._id || ""}
                refetch={refetch}
              />
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
