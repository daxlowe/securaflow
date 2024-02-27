import { Cross2Icon } from "@radix-ui/react-icons";
import { Plus } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { CreateTicket } from "@/components/TicketPopup/Create";
import { priorities, statuses } from "../data/data";
import { ticketSchema } from "@/types";
import { CreateTicketFromCVE } from "@/components/TicketPopup/CreateCVE";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { Task } from "../types";

export const ticketFormSchema = ticketSchema;
export type TicketFormValues = z.infer<typeof ticketFormSchema>;

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Task[], Error>>;
}

export function DataTableToolbar<TData>({
  table,
  refetch,
}: DataTableToolbarProps<TData>) {
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
          <CreateTicket refetch={refetch} />
        </DialogContent>
      </Dialog>
      {/* Dialog for "From CVE-ID" */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto h-8 lg:flex mr-2"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create From CVE-ID
          </Button>
        </DialogTrigger>
        <DialogContent>
          <CreateTicketFromCVE refetch={refetch} />
        </DialogContent>
      </Dialog>

      <DataTableViewOptions table={table} />
    </div>
  );
}
