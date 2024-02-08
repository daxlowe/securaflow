import { Cross2Icon } from "@radix-ui/react-icons";
import { Plus } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { CreateTicket } from "@/components/CreateTicketPopup";

import { priorities, statuses } from "../data/data";
import { ticketSchema } from "@/types";
import { createTicket } from "@/utils/createTicket";

export const ticketFormSchema = ticketSchema;
export type TicketFormValues = z.infer<typeof ticketFormSchema>;

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketFormSchema),
  });

  function onSubmit(data: TicketFormValues) {
    createTicket(data);
  }

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto h-8 lg:flex mr-2"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create
          </Button>
        </DialogTrigger>
        <DialogContent>
          <CreateTicket form={form} onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
      <DataTableViewOptions table={table} />
    </div>
  );
}
