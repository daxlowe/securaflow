import { Cross2Icon } from "@radix-ui/react-icons";
import { Plus } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { CreateTicket, CreateTicketFromCve } from "@/components/CreateTicketPopup";

import { priorities, statuses } from "../data/data";
import { cveFormSchema, ticketSchema } from "@/types";
import { createTicket } from "@/utils/createTicket";
import { lookupCve } from "@/utils/lookupCve";

export const ticketFormSchema = ticketSchema;
export type TicketFormValues = z.infer<typeof ticketFormSchema>;
export type CveFormValues = z.infer<typeof cveFormSchema>;

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const [isCveCreateDialogOpen, setIsCveCreateDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [preFillOptions, setPreFillOptions] = useState<any>(undefined);

  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketFormSchema),
  });

  const cveForm = useForm<CveFormValues>({
    resolver: zodResolver(cveFormSchema),
  });

  function onSubmit(data: TicketFormValues) {
    createTicket(data);
  }

  async function onSubmitCve(data: CveFormValues) {
    const response = await lookupCve(data);
    console.log("In toolbar, response: ", JSON.stringify(response));
    if (response) {
      setPreFillOptions({
        cveId: response.cveId,
        description: response.description,
        baseSeverity: response.baseSeverity,
      });
      setIsCveCreateDialogOpen(false);
      setIsCreateDialogOpen(true);
    }
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
      <Dialog open={isCreateDialogOpen} onOpenChange={(open) => setIsCreateDialogOpen(open)}>
        <DialogTrigger asChild
        
        >
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
          <CreateTicket form={form} onSubmit={onSubmit} preFillOptions={preFillOptions} />
        </DialogContent>
      </Dialog>
      <Dialog open={isCveCreateDialogOpen} onOpenChange={(open) => setIsCveCreateDialogOpen(open)}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto h-8 lg:flex mr-2"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create From CVE ID
          </Button>
        </DialogTrigger>
        <DialogContent>
          <CreateTicketFromCve form={cveForm} onSubmit={onSubmitCve} />
        </DialogContent>
      </Dialog>
      <DataTableViewOptions table={table} />
    </div>
  );
}
