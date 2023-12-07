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
import { Task } from "../types";
import TicketActionView, { ComponentTypes } from './TicketActionView';

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
    !ticket.vulnerability ||
    !ticket.vulnerability.priority
  ) {
    // Handle validation error
    console.error("Invalid Ticket data:", originalData);
    return null; // or return an error component
  }

  // Now you can safely use the data
  const task = originalData;

  const [activeComponent, setActiveComponent] = useState<ComponentTypes | null>(null);
  
  const handleMenuClick = (componentName: ComponentTypes) => {
    setActiveComponent(componentName);
  };

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
          <DropdownMenuItem onClick={() => handleMenuClick(ComponentTypes.ViewTicket)}>View</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuClick(ComponentTypes.ModifyTicket)}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuClick(ComponentTypes.CreateTicket)}>Create</DropdownMenuItem>
          <DropdownMenuItem>Delete<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <TicketActionView activeComponent={activeComponent} task={task} />
      </>
    );
}
