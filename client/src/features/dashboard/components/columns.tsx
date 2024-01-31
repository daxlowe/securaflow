"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { priorities, statuses } from "../data/data";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { getOverlappingDaysInIntervals } from "date-fns";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="px-4 h-[50px] items-center flex">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[3px] "
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="px-4">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[-3px] "
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <div className="px-2">
        <DataTableColumnHeader column={column} title="Ticket" />
      </div>
    ),
    cell: ({ row }) => (
      <ScrollArea>
        <div className="flex w-[80px] space-x-2 h-[50px] items-center px-2 whitespace-nowrap">
          {row.getValue("id")}
          <ScrollBar orientation="horizontal" />
        </div>
      </ScrollArea>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <div className="px-2">
        <DataTableColumnHeader column={column} title="Title" />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <ScrollArea>
          <div className="flex min-w-[200px] space-x-2 h-[50px] items-center px-2 whitespace-nowrap">
            {row.getValue("title")}
            <ScrollBar orientation="horizontal" />
          </div>
        </ScrollArea>
      );
    },
  },
  {
    accessorKey: "team",
    header: ({ column }) => (
      <div className="px-2">
        <DataTableColumnHeader column={column} title="Team" />
      </div>
    ),
    cell: ({ row }) => {
      const teams: string[] | string = row.getValue("team");
      const teamString = Array.isArray(teams) ? teams.join(", ") : teams;

      return (
        <ScrollArea>
          <div className="flex space-x-2 h-[50px] w-[80px] items-center px-2 whitespace-nowrap">
            {teamString}
            <ScrollBar orientation="horizontal" />{" "}
          </div>
        </ScrollArea>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div className="px-2">
        <DataTableColumnHeader column={column} title="Status" />
      </div>
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <ScrollArea>
          <div className="flex w-[109px] h-[50px] items-center px-2 whitespace-nowrap">
            {status.icon && (
              <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            <span>{status.label}</span>
            <ScrollBar orientation="horizontal" />{" "}
          </div>
        </ScrollArea>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <div className="px-2">
        <DataTableColumnHeader column={column} title="Priority" />
      </div>
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      );

      if (!priority) {
        return null;
      }

      return (
        <ScrollArea>
          <div className="flex w-[96px] h-[50px] items-center overflow-x-auto px-2 whitespace-nowrap">
            {priority.icon && (
              <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            <span>{priority.label}</span>
            <ScrollBar orientation="horizontal" />{" "}
          </div>
        </ScrollArea>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "assignee",
    header: ({ column }) => (
      <div className="px-2">
        <DataTableColumnHeader column={column} title="Assignee" />
      </div>
    ),
    cell: ({ row }) => {
      const assignee: string[] = row.getValue("assignee");

      function getInitials(name: string) {
        return name
          .toUpperCase()
          .split(/\s+/) // Split by spaces
          .map((word) => word[0]) // Get the first letter of each word
          .join(""); // Join the letters back together
      }

      console.log(row);
      return (
        <ScrollArea>
          <div className="flex w-[80px] space-x-2 h-[50px] items-center overflow-x-auto px-2 whitespace-nowrap">
            {assignee.map((assigneeName) => (
              <HoverCard>
                <HoverCardTrigger>
                  <Avatar className="h-[35px] w-[35px]">
                    <AvatarImage src="https://githu" />
                    <AvatarFallback>{getInitials(assigneeName)}</AvatarFallback>
                  </Avatar>
                </HoverCardTrigger>
                <HoverCardContent>{assigneeName}</HoverCardContent>
              </HoverCard>
            ))}
            <ScrollBar orientation="horizontal" />{" "}
          </div>
        </ScrollArea>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="px-2 h-[50px] items-center flex">
        <DataTableRowActions row={row} />
      </div>
    ),
  },
];
