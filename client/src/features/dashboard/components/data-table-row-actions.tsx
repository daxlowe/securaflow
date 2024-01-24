import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ViewTicket } from "@/components/ViewTicketPopup";
import { ModifyTicket } from "@/components/ModifyTicketPopup";
import { CreateTicket } from "@/components/CreateTicketPopup";
import { Task } from "../types"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="w-[100%]">View</Button>
            </AlertDialogTrigger>
            <AlertDialogContent><ViewTicket task={task} />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter></AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="w-[100%]">Edit</Button>
            </AlertDialogTrigger>
            <AlertDialogContent><ModifyTicket task={task} />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter></AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="w-[100%]">Create</Button>
            </AlertDialogTrigger>
            <AlertDialogContent><CreateTicket />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter></AlertDialogContent>
          </AlertDialog>
          <DropdownMenuItem>Delete<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
