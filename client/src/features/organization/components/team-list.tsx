import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Group } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Minus } from "lucide-react";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DeleteTeam from "./delete-team";
import AddTeam from "./add-team";

interface TeamMembersProps {
  groups: Group[];
}

export function TeamsList({ groups }: TeamMembersProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex">
          <div>
            <CardTitle>Organization Teams</CardTitle>
            <CardDescription>Manage teams in your Organization</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="ml-auto hover:text-green-500"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <AddTeam />
          </Dialog>
        </div>
      </CardHeader>
      <ScrollArea className="h-[60vh]">
        <CardContent className="grid gap-6">
          {groups.map((group: Group) => {
            return (
              <div
                className="flex items-center justify-between space-x-4"
                key={group._id}
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <h1 className="text-lg font-medium leading-none">
                      {group.name}
                    </h1>
                  </div>
                </div>
                <div className="flex content-center align-center gap-5">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="ml-auto hover:text-red-500"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <DeleteTeam teamToDelete={group} />
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
