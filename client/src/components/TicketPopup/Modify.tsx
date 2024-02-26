import { TicketFormValues } from "@/features/dashboard/components/data-table-toolbar";
import TicketForm from "./TicketForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ticketSchema } from "@/types";
import { modifyTicket } from "@/utils/modifyTicket";
import { Task } from "@/features/dashboard/types";
import { useAuthContext } from "@/hooks/useAuthContext";

const ticketFormSchema = ticketSchema;

export function ModifyTicket({ task }: { task: Task }) {
  const ticket = task.ticket;

  const { user } = useAuthContext();

  function onSubmit(data: TicketFormValues) {
    console.log(data);
    const modifiedTicket = ticket as any;
    modifiedTicket.assignees = data.assignees;
    modifiedTicket.team = data.team;
    modifiedTicket.title = data.title;
    modifiedTicket.description = data.description;
    modifiedTicket.difficulty = data.difficulty;
    modifiedTicket.time_estimate = data.time_estimate;
    if (
      ticket.status_updates &&
      data.status_body !=
        ticket.status_updates[ticket.status_updates.length - 1].body
    ) {
      modifiedTicket.status_updates.push({
        body: data.status_body,
        date_started: data.status_date_started,
        date_ended: data.status_date_ended,
      });
    }
    modifiedTicket.vulnerability = {
      ...modifiedTicket.vulnerability,
      name: data.vuln_name,
      cve_id: data.vuln_cve_id,
      priority: data.vuln_priority,
    };
    if (data.comments) {
      modifiedTicket.comments.push(data.comments);
    }
    console.log(modifiedTicket);
    modifyTicket(modifiedTicket, user);
  }

  console.log(ticket);
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
    { name: "title", label: "Title", previous: ticket.title },
    { name: "description", label: "Description", previous: ticket.description },
    {
      name: "team",
      label: "Team",
      optionsMulti: [],
      previousArray: ticket.team?.map((team) => {
        return team._id;
      }),
    },
    {
      name: "assignees",
      label: "Assignees",
      optionsMulti: [],
      previousArray: ticket.assignees?.map((assignee) => {
        return assignee._id;
      }),
    },
    {
      name: "difficulty",
      label: "Difficulty",
      options: selectOptionsDifficulty,
      previous: ticket.difficulty.toString(),
    },
    {
      name: "vuln_name",
      label: "Vulnerability Name",
      previous: ticket.vulnerability.name,
    },
    {
      name: "vuln_cve_id",
      label: "CVE ID",
      previous: ticket.vulnerability.cve_id,
    },
    {
      name: "vuln_priority",
      label: "Priority",
      options: selectOptionsPriority,
      previous: ticket.vulnerability.priority,
    },
    {
      name: "status_body",
      label: "Current Status",
      options: selectOptionsStatus,
      previous:
        ticket.status_updates && ticket.status_updates.length > 0
          ? ticket.status_updates[ticket.status_updates.length - 1].body
          : undefined,
    },
    { name: "comments", label: "Comment" },
  ];
  return (
    <TicketForm
      form={form}
      onSubmit={onSubmit}
      title={"Edit Ticket"}
      submitTitle={"Edit"}
      formFields={formFields}
    />
  );
}
