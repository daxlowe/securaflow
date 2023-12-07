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

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const originalData = row.original as Task;
  // Now you can safely use the data
  const task = originalData;
  
  enum ComponentTypes {
    ViewTicket = 'viewTicket',
    ModifyTicket = 'modifyTicket',
    CreateTicket = 'createTicket'
  }

  type ActiveComponentType = ComponentTypes | null;
  
    //State to track which component to display
    const [activeComponent, setActiveComponent] = useState<ActiveComponentType>(null);
  
    const handleMenuClick = (componentName: ComponentTypes) => {
      setActiveComponent(componentName);
    };

    const components: Record<ComponentTypes, JSX.Element> = {
      [ComponentTypes.ViewTicket]: <ViewTicket task={task} />,
      [ComponentTypes.CreateTicket]: <CreateTicket />,
      [ComponentTypes.ModifyTicket]: <ModifyTicket task={task} />,
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
      {activeComponent && components[activeComponent]}
      </>
    );
}
