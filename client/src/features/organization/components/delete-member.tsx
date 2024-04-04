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
import { useAuthContext } from "@/hooks/useAuthContext";

export default function DeleteMember({ userToDelete }: { userToDelete: User }) {
  let user: any = useAuthContext();
  user = user.user;
  async function submit() {
    const response = await removeUsers(userToDelete, user);
    console.log(response);
  }
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Delete{" "}
          {capitalize(userToDelete.first_name) +
            " " +
            capitalize(userToDelete.last_name)}
          ?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will delete{" "}
          {capitalize(userToDelete.first_name) +
            " " +
            capitalize(userToDelete.last_name)}{" "}
          from your organization.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={submit}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
