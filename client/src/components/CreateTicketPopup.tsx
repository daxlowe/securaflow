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

import { CveFormValues, TicketFormValues } from "@/features/dashboard/components/data-table-toolbar";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Group, User } from "@/types";
import { useAuthContext } from "@/hooks/useAuthContext";
import getUsersInGroup from "@/utils/getUsersInGroup";
import { useEffect, useState } from "react";
import { getGroups } from "@/utils/getGroups";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface CreateTicketProps {
  form: UseFormReturn<TicketFormValues>;
  onSubmit: SubmitHandler<TicketFormValues>;
  preFillOptions?: {
    cveId: string;
    description: string;
    baseSeverity: string;
  };
}

interface CreateTicketFromCveProps {
  form: UseFormReturn<CveFormValues>;
  onSubmit: SubmitHandler<CveFormValues>;
}

type TicketFormKey = keyof TicketFormValues;
type CveTicketFormKey = keyof CveFormValues;

async function getTeamsData(user: User) {
  return getGroups(user);
}

async function getAssigneesData(user: User, teams: Group[] | undefined) {
  if (!teams) {
    return [];
  }

  const assigneesPromises = teams.map(async (team) =>
    getUsersInGroup(user, team._id)
  );

  // Wait for all promises to resolve and flatten the array of arrays
  const assignees = await Promise.all(assigneesPromises);
  const flattenedAssignees = assignees.flat();

  // Use Set to get unique users based on their IDs
  const uniqueAssignees = Array.from(
    new Set(flattenedAssignees.map((user) => user._id))
  );

  // Map the unique IDs back to the user objects
  const uniqueUsers = uniqueAssignees.map((userId) =>
    flattenedAssignees.find((user) => user._id === userId)
  );

  return uniqueUsers;
}

export function CreateTicket({ form, onSubmit, preFillOptions }: CreateTicketProps) {
  const { user } = useAuthContext();
  const [teams, setTeams] = useState<{ label: string; value: string }[]>([]);
  const [assignees, setAssignees] = useState<
    { label: string; value: string }[]
  >([]);

  const { data: teamsData, isSuccess: teamsDataSuccess } = useQuery<Group[]>({
    queryKey: ["groups"],
    queryFn: () => getTeamsData(user),
  });

  const { data: assigneesData } = useQuery<User[]>({
    queryKey: [JSON.stringify(teamsData) + "users"],
    queryFn: () => getAssigneesData(user, teamsData),
    enabled: teamsDataSuccess,
  });

  useEffect(() => {
    if (teamsData) {
      const objects = teamsData.map((group: Group) => ({
        label: group.name,
        value: group._id,
      }));
      setTeams(objects);
    }
  }, [teamsData]);

  useEffect(() => {
    if (assigneesData) {
      const objects = assigneesData.map((user: User) => ({
        label: `${user.first_name} ${user.last_name}`,
        value: user._id,
      }));
      setAssignees(objects);
    }
  }, [assigneesData]);

  const toCapitalized = (word: string | undefined) => {
    if (!word) {
      return word;
    }

    const ret = word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase();
    console.log(ret);
    return ret;
  };

  let cveId, description, baseSeverity;
  if (preFillOptions) {
    cveId = preFillOptions.cveId;
    description = preFillOptions.description;
    baseSeverity = preFillOptions.baseSeverity;
  }

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

  const selectOptionsTeams = teams;
  const selectOptionsAssignees = assignees;

  // State to manage selected teams
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  // State to manage selected assignees
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);

  const handleSubmit = async (data: TicketFormValues) => {
    // Include selectedTeams and selectedAssignees in the form data
    const formDataWithTeamsAndAssignees = {
      ...data,
      team: selectedTeams,
      assignees: selectedAssignees,
    };

    await onSubmit(formDataWithTeamsAndAssignees);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create Ticket</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <ScrollArea className="h-[75vh]">
            {[
              { name: "title", label: "Title" },
              { name: "description", label: "Description", preFill: description },
              { name: "team", label: "Team", optionsMulti: selectOptionsTeams },
              {
                name: "assignees",
                label: "Assignees",
                optionsMulti: selectOptionsAssignees,
              },
              {
                name: "difficulty",
                label: "Difficulty",
                options: selectOptionsDifficulty,
              },
              { name: "vuln_name", label: "Vulnerability Name" },
              { name: "vuln_cve_id", label: "CVE ID", preFill: cveId },
              {
                name: "vuln_priority",
                label: "Priority",
                options: selectOptionsPriority,
                preFill: {
                  label: baseSeverity ? toCapitalized(baseSeverity) : selectOptionsPriority[0].label,
                  value: baseSeverity ? toCapitalized(baseSeverity) : selectOptionsPriority[0].value,
                },
              },
              {
                name: "status_body",
                label: "Current Status",
                options: selectOptionsStatus,
              },
              { name: "comments", label: "Comment" },
            ].map(({ name, label, options, optionsMulti, preFill }) => (
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
                          value={preFill?.value}
                          onValueChange={field.onChange}
                          defaultValue={options[0].value}
                        >
                          <SelectTrigger>
                            <SelectValue defaultValue={preFill?.value} />
                          </SelectTrigger>
                          <SelectContent>
                            {options.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : optionsMulti ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              className="flex h-10 w-full items-center justify-between overflow-hidden hover:bg-background"
                              variant="outline"
                            >
                              <div className="w-[300px] overflow-hidden justify-start flex">
                                {name === "team"
                                  ? selectedTeams
                                      .map(
                                        (teamId) =>
                                          selectOptionsTeams.find(
                                            (option) => option.value === teamId
                                          )?.label
                                      )
                                      .join(", ")
                                  : selectedAssignees
                                      .map(
                                        (assigneeId) =>
                                          selectOptionsAssignees.find(
                                            (option) =>
                                              option.value === assigneeId
                                          )?.label
                                      )
                                      .join(", ")}
                              </div>
                              <ChevronDown className="h-4 w-4 opacity-50" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent className="w-[420px]">
                            <ScrollArea className="w-full h-[300px] overflow-hidden pr-[15px]">
                              {optionsMulti.map((option) => (
                                <DropdownMenuCheckboxItem
                                  checked={
                                    name === "team"
                                      ? selectedTeams.includes(option.value)
                                      : selectedAssignees.includes(option.value)
                                  }
                                  onCheckedChange={(checked) => {
                                    if (name === "team") {
                                      setSelectedTeams((prevTeams) =>
                                        checked
                                          ? [...prevTeams, option.value]
                                          : prevTeams.filter(
                                              (team) => team !== option.value
                                            )
                                      );
                                    } else if (name === "assignees") {
                                      setSelectedAssignees((prevAssignees) =>
                                        checked
                                          ? [...prevAssignees, option.value]
                                          : prevAssignees.filter(
                                              (assignee) =>
                                                assignee !== option.value
                                            )
                                      );
                                    }
                                  }}
                                >
                                  {option.label}
                                </DropdownMenuCheckboxItem>
                              ))}
                            </ScrollArea>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <Input
                          {...field}
                          value={
                            preFill ? preFill :
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

export function CreateTicketFromCve({ form, onSubmit }: CreateTicketFromCveProps) {
  const handleSubmit = async (data: CveFormValues) => {
    await onSubmit(data);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create Ticket</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <ScrollArea className="h-[75vh]">
            {[
              { name: "cve_id", label: "CVE ID" },
            ].map(({ name, label }) => (
              <FormField
                key={name}
                control={form.control}
                name={name as CveTicketFormKey}
                render={({ field }) => (
                  <FormItem className="mx-5">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      {(
                        <Input
                          {...field}
                          value={
                            field.value ?? ""
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
            <Button type="submit">Look Up</Button>
          </DialogClose>
        </form>
      </Form>
    </>
  );
}