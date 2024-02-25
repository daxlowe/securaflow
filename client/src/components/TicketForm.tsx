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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Group, User } from "@/types";
import { TicketFormValues } from "@/features/dashboard/components/data-table-toolbar";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import getUsersInGroup from "@/utils/getUsersInGroup";
import { getGroups } from "@/utils/getGroups";

type TicketFormKey = keyof TicketFormValues;

interface TicketFormProps {
  form: UseFormReturn<TicketFormValues>;
  onSubmit: SubmitHandler<TicketFormValues>;
  submitTitle: string;
  title: string;
  formFields: {
    name: string;
    label: string;
    previous?: string;
    previousArray?: string[];
    options?: { label: string; value: string }[];
    optionsMulti?: { label: string; value: string }[];
  }[];
}

async function getTeamsData(user: User) {
  return getGroups(user);
}

interface UserWithTeams extends User {
  teamIds: string[];
}

async function getAssigneesData(user: User, teams: Group[] | undefined) {
  if (!teams) {
    return [];
  }

  const assigneesPromises = teams.map(async (team) => {
    const usersInGroup = await getUsersInGroup(user, team._id);
    return usersInGroup.map((u: UserWithTeams) => ({
      ...u,
      teamIds: [team._id, ...(u.teamIds || [])],
    })) as UserWithTeams[];
  });

  // Wait for all promises to resolve and flatten the array of arrays
  const assignees = await Promise.all(assigneesPromises);
  const flattenedAssignees = assignees.flat();

  // Combine users with the same ID and add their teamIds
  const uniqueAssignees = flattenedAssignees.reduce(
    (accumulator: any[], user) => {
      const existingUserIndex = accumulator.findIndex((u) => u.id === user._id);
      if (existingUserIndex !== -1) {
        accumulator[existingUserIndex].teamIds = Array.from(
          new Set(
            accumulator[existingUserIndex].teamIds.concat(user.teamIds || [])
          )
        );
      } else {
        accumulator.push({
          _id: user._id,
          teamIds: user.teamIds,
          first_name: user.first_name,
          last_name: user.last_name,
        });
      }
      return accumulator;
    },
    []
  );

  return uniqueAssignees;
}

export function TicketForm({
  form,
  onSubmit,
  title,
  submitTitle,
  formFields,
}: TicketFormProps) {
  const { user } = useAuthContext();
  const [teams, setTeams] = useState<{ label: string; value: string }[]>([]);
  const [assignees, setAssignees] = useState<
    { label: string; value: string }[]
  >([]);

  const { data: teamsData, isSuccess: teamsDataSuccess } = useQuery<Group[]>({
    queryKey: ["groups"],
    queryFn: () => getTeamsData(user),
  });

  const { data: assigneesData } = useQuery<UserWithTeams[]>({
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

  const handleSubmit = async (data: TicketFormValues) => {
    console.log(data);
    await onSubmit(data);
  };

  // Update formFields optionsMulti based on async data
  const updatedFormFields = formFields.map((field) => {
    if (field.name === "team") {
      return { ...field, optionsMulti: teams };
    } else if (field.name === "assignees") {
      return { ...field, optionsMulti: assignees };
    }
    return field;
  });

  // State to manage selected teams
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  // State to manage selected assignees
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);

  const teamField = updatedFormFields.find((field) => field.name === "team");
  const assigneeField = updatedFormFields.find(
    (field) => field.name === "assignees"
  );

  useEffect(() => {
    if (selectedTeams.length == 0) {
      setSelectedAssignees([]);
    }
    if (assigneesData) {
      let assigneesTemp: { label: string; value: string }[] = [];
      assigneesData.forEach((user: UserWithTeams) => {
        if (
          user.teamIds &&
          user.teamIds.some((team: string) => selectedTeams.includes(team))
        ) {
          assigneesTemp.push({
            label: `${user.first_name} ${user.last_name}`,
            value: user._id,
          });
        }
      });

      setAssignees(assigneesTemp);
    }
  }, [selectedTeams]);

  useEffect(() => {
    if (teamField?.previousArray) {
      setSelectedTeams(teamField.previousArray);
    }
    if (assigneeField?.previousArray) {
      setSelectedAssignees(assigneeField.previousArray);
    }
  }, [teamField?.previousArray, assigneeField?.previousArray]);

  return (
    <>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <ScrollArea className="h-[75vh]">
            {updatedFormFields.map(
              ({ name, label, previous, options, optionsMulti }) => {
                const { register, setValue } = form;

                if (optionsMulti) {
                  register(name as keyof TicketFormValues);
                  if (name == "team") {
                    setValue(name as keyof TicketFormValues, selectedTeams);
                  } else if (name == "assignees") {
                    setValue(name as keyof TicketFormValues, selectedAssignees);
                  }
                }

                return (
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
                              defaultValue={previous || options[0].value}
                            >
                              <SelectTrigger>
                                <SelectValue
                                  defaultValue={previous || options[0].value}
                                />
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
                                              teams.find(
                                                (option) =>
                                                  option.value === teamId
                                              )?.label
                                          )
                                          .join(", ")
                                      : selectedAssignees
                                          .map(
                                            (assigneeId) =>
                                              assignees.find(
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
                                          : selectedAssignees.includes(
                                              option.value
                                            )
                                      }
                                      onCheckedChange={(checked) => {
                                        if (name === "team") {
                                          setSelectedTeams((prevTeams) =>
                                            checked
                                              ? [...prevTeams, option.value]
                                              : prevTeams.filter(
                                                  (team) =>
                                                    team !== option.value
                                                )
                                          );
                                        } else if (name === "assignees") {
                                          setSelectedAssignees(
                                            (prevAssignees) =>
                                              checked
                                                ? [
                                                    ...prevAssignees,
                                                    option.value,
                                                  ]
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
                              {...register(name as keyof TicketFormValues)}
                              onChange={(e) =>
                                setValue(
                                  name as keyof TicketFormValues,
                                  e.target.value
                                )
                              }
                              defaultValue={previous}
                            />
                          )}
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              }
            )}
          </ScrollArea>
          <DialogClose asChild>
            <Button type="submit">{submitTitle}</Button>
          </DialogClose>
        </form>
      </Form>
    </>
  );
}

export default TicketForm;
