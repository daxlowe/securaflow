import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { User } from "@/types";
import { capitalize } from "@/utils/capitalize";

export default function DeleteMember({ user }: { user: User }) {
  function submit() {
    toast({
      title: "Success",
      description:
        capitalize(user.first_name) +
        " " +
        capitalize(user.last_name) +
        " deleted",
    });
  }
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Delete{" "}
          {capitalize(user.first_name) + " " + capitalize(user.last_name)}?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will delete{" "}
          {capitalize(user.first_name) + " " + capitalize(user.last_name)} from
          your organization.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={submit}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
