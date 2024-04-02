import { Cross2Icon } from "@radix-ui/react-icons";
import { Plus, Download } from "lucide-react";
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
  data: TData[];
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Task[], Error>>;
}

export function DataTableToolbar<TData>({
  table,
  refetch,
  data,
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
            CVE-ID
          </Button>
        </DialogTrigger>
        <DialogContent>
          <CreateTicketFromCVE refetch={refetch} />
        </DialogContent>
      </Dialog>

      {/* Button for "Export" */}
      <Button
        onClick={() => {
          const tickets = data.map((row: any) => row.ticket);

          const parsedData = tickets.map((entry) => ({
            vulnerability: entry.vulnerability,
            _id: entry._id,
            title: entry.title,
            team: entry.team.map((team: any) => ({
              _id: team._id,
              name: team.name,
            })),
            description: entry.description,
            difficulty: entry.difficulty,
            assignees: entry.assignees,
            time_estimate: entry.time_estimate,
            status_updates: entry.status_updates,
            comments: entry.comments,
            created_by: entry.created_by,
          }));

          // Convert JSON data to a JSON string
          const jsonDataString = JSON.stringify(parsedData, null, 2);

          // Create a Blob object to store the JSON data
          const blob = new Blob([jsonDataString], { type: "application/json" });

          // Create a temporary link element to trigger the download
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "data.json";
          document.body.appendChild(link);

          // Simulate a click on the link to trigger the download
          link.click();

          // Remove the temporary link
          document.body.removeChild(link);
        }}
        variant="outline"
        size="sm"
        className="ml-auto h-8 lg:flex mr-2"
      >
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>

      <DataTableViewOptions table={table} />
    </div>
  );
}
