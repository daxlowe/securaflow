import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
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
  const selectOptionsDifficulty = [
    { label: "Low", value: "1" },
    { label: "Medium", value: "2" },
    { label: "Hard", value: "3" },
  ];
  const selectOptionsPriority = [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
    { label: "Critical", value: "Critical" },
  ];
  const selectOptionsStatus = [
    { label: "Open", value: "Open" },
    { label: "Assigned", value: "Assigned" },
    { label: "In Progress", value: "In Progress" },
    { label: "Closed", value: "Closed" },
  ];

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create Ticket</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <ScrollArea className="h-[75vh]">
            {[
              { name: "title", label: "Title" },
              { name: "description", label: "Description" },
              { name: "team", label: "Team" },
              { name: "assignees", label: "Assignees" },
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
              {
                name: "status_body",
                label: "Current Status",
                options: selectOptionsStatus,
              },
              { name: "comments", label: "Comment" },
            ].map(({ name, label, options }) => (
              <FormField
                key={name}
                control={form.control}
                name={name as TicketFormKey}
                render={({ field }) => (
                  <FormItem className="mx-5">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      {options ? (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={options[0].value}
                        >
                          <SelectTrigger>
                            <SelectValue defaultValue={options[0].value} />
                          </SelectTrigger>
                          <SelectContent>
                            {options.map((option) => (
                              <SelectItem
                                key={option.label}
                                value={option.value}
                              >
                                {option.label}
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
                    <FormDescription></FormDescription>
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
