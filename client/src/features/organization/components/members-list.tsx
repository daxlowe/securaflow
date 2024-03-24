import { ChevronDownIcon } from "@radix-ui/react-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { capitalize } from "@/utils/capitalize";
import { permissions } from "@/stores";
import { modifyPermission } from "../utils/modifyPermission";
import { UserRoundMinus, UserRoundPlus } from "lucide-react";
import DeleteMember from "./delete-member";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddMember from "./add-member";

interface TeamMembersProps {
  data: User[];
  groupId: string;
}

export function TeamMembers({ data, groupId }: TeamMembersProps) {
  function getInitials(name: string) {
    return name
      .toUpperCase()
      .split(/\s+/) // Split by spaces
      .map((word) => word[0]) // Get the first letter of each word
      .join(""); // Join the letters back together
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex">
          <div>
            <CardTitle>Organization Members</CardTitle>
            <CardDescription>
              Manage members of your Organization
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="ml-auto hover:text-green-500"
              >
                <UserRoundPlus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <AddMember />
          </Dialog>
        </div>
      </CardHeader>
      <ScrollArea className="h-[70vh]">
        <CardContent className="grid gap-6">
          {data.map((user) => {
            const [open, setOpen] = useState(false);
            const [value, setValue] = useState(permissions[0].title);
            return (
              <div
                className="flex items-center justify-between space-x-4"
                key={user._id}
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/01.png" />
                    <AvatarFallback>
                      {getInitials(user.first_name + " " + user.last_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {capitalize(user.first_name) +
                        " " +
                        capitalize(user.last_name)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="flex content-center align-center gap-5">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="ml-auto">
                        {value}{" "}
                        <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" align="end">
                      <Command>
                        <CommandList>
                          <CommandEmpty>No roles found.</CommandEmpty>
                          <CommandGroup>
                            {permissions.map((permission, index) => (
                              <CommandItem
                                key={permission.title}
                                className="teamaspace-y-1 flex flex-col items-start px-4 py-2"
                                value={permission.title}
                                onSelect={(currentValue) => {
                                  if (currentValue != value) {
                                    modifyPermission(groupId, user, index);
                                  }
                                  setValue(
                                    currentValue === value
                                      ? ""
                                      : capitalize(currentValue)
                                  );
                                  setOpen(false);
                                }}
                              >
                                <p>{permission.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  {permission.description}
                                </p>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="ml-auto hover:text-red-500"
                      >
                        <UserRoundMinus className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <DeleteMember user={user} groupId={groupId} />
                  </AlertDialog>
                </div>
              </div>
            );
          })}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
