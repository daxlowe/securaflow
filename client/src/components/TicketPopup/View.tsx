import { TicketFormValues } from "@/features/dashboard/components/data-table-toolbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Group, User, ticketSchema } from "@/types";
import { Task } from "@/features/dashboard/types";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { getUsersGroups } from "@/utils/getUsersGroups";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import { capitalize } from "@/utils/capitalize";
import getUsersInGroup from "@/utils/getUsersInGroup";

const ticketFormSchema = ticketSchema;

async function getTeamsData(user: User) {
  return getUsersGroups(user);
}

async function getAssigneesData(user: User, teams: Group[] | undefined) {
  if (!teams) {
    return [];
  }

  const assigneesPromises = teams.map(async (team) => {
    const usersInGroup = await getUsersInGroup(user, team._id);
    return usersInGroup;
  });

  // Wait for all promises to resolve and flatten the array of arrays
  let assignees = await Promise.all(assigneesPromises);
  assignees = assignees.flat();

  return assignees;
}

export function ViewTicket({ task }: { task: Task }) {
  const ticket = task.ticket;

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
    { name: "comments", label: "Comment", previous: ticket.comments },
  ];

  const { user } = useAuthContext();

  const { data: teamsData, isSuccess: teamsDataSuccess } = useQuery<Group[]>({
    queryKey: ["groups"],
    queryFn: () => getTeamsData(user),
  });

  const { data: assigneesData } = useQuery<User[]>({
    queryKey: [JSON.stringify(teamsData) + "users"],
    queryFn: () => getAssigneesData(user, teamsData),
    enabled: teamsDataSuccess,
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>View Ticket</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="space-y-8">
          <ScrollArea className="h-[75vh]">
            {formFields.map((form) => (
              <FormField
                key={form.name}
                name={form.name}
                render={() => (
                  <FormItem className="mx-5">
                    <FormLabel>{form.label}</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        value={
                          form.previous
                            ? form.previous
                            : form.name === "team"
                            ? form.previousArray
                                ?.map((teamId) => {
                                  const team = teamsData?.find(
                                    (team) => team._id === teamId
                                  );
                                  return team ? team.name : "";
                                })
                                .join(", ")
                            : form.name === "assignees"
                            ? form.previousArray
                                ?.map((userId) => {
                                  const user = assigneesData?.find(
                                    (user) => user._id === userId
                                  );
                                  return user
                                    ? `${capitalize(
                                        user.first_name
                                      )} ${capitalize(user.last_name)}`
                                    : "";
                                })
                                .join(", ")
                            : ""
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </ScrollArea>
        </form>
      </Form>
    </>
  );
}
