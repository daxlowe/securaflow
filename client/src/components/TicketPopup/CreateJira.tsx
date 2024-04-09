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
import { jiraImport } from "@/utils/jiraImport";
import TicketForm from "./TicketForm";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ticketSchema } from "@/types";
import { TicketFormValues } from "@/features/dashboard/components/data-table-toolbar";
import { createTicket } from "@/utils/createTicket";
import { Task } from "@/features/dashboard/types";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";

const jiraFormSchema = z.object({
  username: z.string().email({
    message: "username must be an email",
  }),
  apiKey: z.string(),
  jiraId: z.string()
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
  {
    name: "priority",
    label: "Priority",
    options: selectOptionsPriority,
  },
  {
    name: "status_body",
    label: "Current Status",
    options: selectOptionsStatus,
  },
  { name: "comments", label: "Comment" },
];

async function onSubmitJira(data: any) {
  const response = await jiraImport(data);
  if (response) {
    console.log(response);
    formFields = formFields.map((field: any) => {
      if (field.name == "title") {
        field = {
          ...field,
          previous: response.title,
        };
      }
      if (field.name == "priority") {
        field = {
          ...field,
          previous: response.priority,
        };
      }
      if (field.name == "description") {
        field = {
          ...field,
          previous: response.description,
        };
      }
      return field;
    });
    console.log(formFields);
    return true;
  }
  return false;
}

export function CreateTicketFromJira({
  refetch,
}: {
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Task[], Error>>;
}) {
  const [showTicket, setShowTicket] = useState(false);
  const formJira = useForm<z.infer<typeof jiraFormSchema>>();
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
    <Form {...formJira}>
      <form
        onSubmit={formJira.handleSubmit(async (data) => {
          const result = await onSubmitJira(data);
          if (result) {
            setShowTicket(true);
          }
        })}
        className="space-y-8"
      >
        <FormField
          control={formJira.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter Jira Username" {...field} />
              </FormControl>
              <FormDescription>
                This is the email you use to log in to Jira
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formJira.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Key</FormLabel>
              <FormControl>
                <Input placeholder="Enter Jira API Key" {...field} />
              </FormControl>
              <FormDescription>
                This is your API key generated for Jira
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formJira.control}
          name="jiraId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jira Issue ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter Jira issue ID" {...field} />
              </FormControl>
              <FormDescription>
                This is unique ID for the Jira issue you want to import
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
