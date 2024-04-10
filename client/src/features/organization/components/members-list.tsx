import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Group, User } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { capitalize } from "@/utils/capitalize";
import { ChevronDown, UserRoundMinus, UserRoundPlus } from "lucide-react";
import DeleteMember from "./delete-member";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddMember from "./add-member";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { modifyGroups } from "@/utils/modifyGroups";
import { useAuthContext } from "@/hooks/useAuthContext";

interface TeamMembersProps {
  users: User[];
  groups: Group[];
}

export function TeamMembers({ users, groups }: TeamMembersProps) {
  function getInitials(name: string) {
    return name
      .toUpperCase()
      .split(/\s+/) // Split by spaces
      .map((word) => word[0]) // Get the first letter of each word
      .join(""); // Join the letters back together
  }

  const { user } = useAuthContext();

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
      <ScrollArea className="h-[60vh]">
        <CardContent className="grid gap-6">
          {users.map((currentUser: User) => {
            let tempGroups: Group[] = [];
            groups.map((group) => {
              if (group.users.includes(currentUser._id)) {
                tempGroups.push(group);
              }
            });

            const [activeGroups, setActiveGroups] =
              useState<Group[]>(tempGroups);

            groups.map((group) => {
              if (activeGroups.includes(group)) {
                if (!group.users.includes(currentUser._id)) {
                  group.users.push(currentUser._id);
                }
              } else {
                if (group.users.includes(currentUser._id)) {
                  group.users = group.users.filter(
                    (prevUser) => prevUser !== currentUser._id
                  );
                }
              }
            });

            return (
              <div
                className="flex items-center justify-between space-x-4"
                key={currentUser._id}
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/01.png" />
                    <AvatarFallback>
                      {getInitials(
                        currentUser.first_name + " " + currentUser.last_name
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {capitalize(currentUser.first_name) +
                        " " +
                        capitalize(currentUser.last_name)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {currentUser.email}
                    </p>
                  </div>
                </div>
                <div className="flex content-center align-center gap-5">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="flex h-10 w-[200px] items-center justify-between overflow-hidden hover:bg-background"
                        variant="outline"
                      >
                        <div className="w-[300px] overflow-hidden justify-start flex">
                          {activeGroups.length > 0 ? (
                            activeGroups.map((group) => group.name).join(", ")
                          ) : (
                            <span className="text-muted">No Active Teams</span>
                          )}
                        </div>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-[200px]">
                      <ScrollArea className="w-full h-[300px] overflow-hidden pr-[15px]">
                        {groups.map((group) => (
                          <DropdownMenuCheckboxItem
                            key={group._id}
                            checked={activeGroups.includes(group)}
                            onCheckedChange={(checked) => {
                              // Update active groups based on checked state
                              if (checked) {
                                setActiveGroups((prevActiveGroups) => [
                                  ...prevActiveGroups,
                                  group,
                                ]);
                              } else {
                                setActiveGroups((prevActiveGroups) =>
                                  prevActiveGroups.filter(
                                    (prevGroup) => prevGroup._id !== group._id
                                  )
                                );
                              }
                            }}
                          >
                            {group.name}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </ScrollArea>
                    </DropdownMenuContent>
                  </DropdownMenu>

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
                    <DeleteMember userToDelete={currentUser} />
                  </AlertDialog>
                </div>
              </div>
            );
          })}
        </CardContent>
      </ScrollArea>
      <CardFooter className="mt-[20px] flex justify-end">
        <Button
          className="mr-[60px]"
          onClick={() => {
            modifyGroups(groups, user);
          }}
        >
          Update Teams
        </Button>
      </CardFooter>
    </Card>
  );
}
