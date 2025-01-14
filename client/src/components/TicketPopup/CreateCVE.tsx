import { useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { lookupCve } from "@/utils/lookupCve";
import TicketForm from "./TicketForm";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ticketSchema } from "@/types";
import { TicketFormValues } from "@/features/dashboard/components/data-table-toolbar";
import { createTicket } from "@/utils/createTicket";
import { Task } from "@/features/dashboard/types";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { capitalize } from "@/utils/capitalize";

const cveFormSchema = z.object({
  cve_id: z.string().regex(/^CVE-\d{4,}-\d+$/i, {
    message: "CVE does not match expected format.",
  }),
});

const ticketFormSchema = ticketSchema;

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

let formFields = [
  { name: "title", label: "Title" },
  { name: "description", label: "Description" },
  {
    name: "team",
    label: "Team",
    optionsMulti: [],
  },
  {
    name: "assignees",
    label: "Assignees",
    optionsMulti: [],
  },
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
  {
    name: "vuln_json",
    label: "All Vuln Info",
  },
];

async function onSubmitCVE(data: z.infer<typeof cveFormSchema>) {
  const response = await lookupCve(data);
  if (response) {
    console.log(response);
    formFields = formFields.map((field: any) => {
      if (field.name == "vuln_cve_id") {
        field = {
          ...field,
          previous: response.summary.cveId,
        };
      }
      if (field.name == "vuln_priority" && response.summary.baseSeverity) {
        field = {
          ...field,
          previous: capitalize(response.summary.baseSeverity),
        };
      }
      if (field.name == "description") {
        field = {
          ...field,
          previous: response.summary.description,
        };
      }
      if (field.name == "vuln_json") {
        field = {
          ...field,
          previous: response.all,
        };
      }
      return field;
    });
    console.log(formFields);
    return true;
  }
  return false;
}

export function CreateTicketFromCVE({
  refetch,
}: {
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Task[], Error>>;
}) {
  const [showTicket, setShowTicket] = useState(false);
  const formCVE = useForm<z.infer<typeof cveFormSchema>>();
  const formTicket = useForm<TicketFormValues>({
    resolver: zodResolver(ticketFormSchema),
  });

  function onSubmitTicket(data: TicketFormValues) {
    createTicket(data);
    refetch();
  }

  return showTicket ? (
    <TicketForm
      form={formTicket}
      onSubmit={onSubmitTicket}
      title={"Create Ticket"}
      submitTitle={"Create"}
      formFields={formFields}
    />
  ) : (
    <Form {...formCVE}>
      <form
        onSubmit={formCVE.handleSubmit(async (data) => {
          const result = await onSubmitCVE(data);
          if (result) {
            setShowTicket(true);
          }
        })}
        className="space-y-8"
      >
        <FormField
          control={formCVE.control}
          name="cve_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CVE-ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter CVE-ID" {...field} />
              </FormControl>
              <FormDescription>
                This is the CVE-ID you want to pull from
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
