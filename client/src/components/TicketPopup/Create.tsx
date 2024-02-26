import { TicketFormValues } from "@/features/dashboard/components/data-table-toolbar";
import TicketForm from "./TicketForm";
import { createTicket } from "@/utils/createTicket";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ticketSchema } from "@/types";

const ticketFormSchema = ticketSchema;

function onSubmit(data: TicketFormValues) {
  createTicket(data);
}

export function CreateTicket() {
  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketFormSchema),
  });

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

  const formFields = [
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
  ];
  return (
    <TicketForm
      form={form}
      onSubmit={onSubmit}
      title={"Create Ticket"}
      submitTitle={"Create"}
      formFields={formFields}
    />
  );
}
