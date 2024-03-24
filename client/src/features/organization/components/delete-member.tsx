import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { User } from "@/types";
import { capitalize } from "@/utils/capitalize";
import { removeUsers } from "../utils/removeUsers";

export default function DeleteMember({
  user,
  groupId,
}: {
  user: User;
  groupId: string;
}) {
  async function submit() {
    const response = await removeUsers(groupId, user);
    console.log(response);
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
