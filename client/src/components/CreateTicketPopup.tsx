import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { DialogClose, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { TicketFormValues } from "@/features/dashboard/components/data-table-toolbar";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

interface CreateTicketProps {
  form: UseFormReturn<TicketFormValues>;
  onSubmit: SubmitHandler<TicketFormValues>;
}

type TicketFormKey = keyof TicketFormValues;

export function CreateTicket({ form, onSubmit }: CreateTicketProps) {
  const selectOptionsDifficulty = ["Low", "Medium", "Hard"];
  const selectOptionsPriority = ["Low", "Medium", "High", "Critical"];
  const selectOptionsStatus = ["Open", "Assigned", "In Progress", "Closed"];

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create Ticket</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <ScrollArea className="h-[75vh] px-[20px]">
            {[
              { name: "title", label: "Title" },
              { name: "team", label: "Team" },
              { name: "description", label: "Description" },
              {
                name: "difficulty",
                label: "Difficulty",
                options: selectOptionsDifficulty,
              },
              { name: "vuln_name", label: "Vulnerability Name" },
              { name: "vuln_cve_id", label: "CVE ID" },
              {
                name: "vuln_priority",
                label: "Priority",
                options: selectOptionsPriority,
              },
              { name: "assignees", label: "Assignees" },
              {
                name: "status_body",
                label: "Current Status",
                options: selectOptionsStatus,
              },
              { name: "comments", label: "Comments" },
            ].map(({ name, label, options }) => (
              <FormField
                key={name}
                control={form.control}
                name={name as TicketFormKey}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      {options ? (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={options[0]}
                        >
                          <SelectTrigger>
                            <SelectValue defaultValue={options[0]} />
                          </SelectTrigger>
                          <SelectContent>
                            {options.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          {...field}
                          value={
                            field.value instanceof Date
                              ? field.value.toISOString()
                              : field.value ?? ""
                          }
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </ScrollArea>
          <DialogClose asChild>
            <Button type="submit">Create</Button>
          </DialogClose>
        </form>
      </Form>
    </>
  );
}
