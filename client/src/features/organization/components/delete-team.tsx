import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Group, User } from "@/types";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function DeleteMember({
  teamToDelete,
}: {
  teamToDelete: Group;
}) {
  const { user } = useAuthContext();

  async function submit() {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${(user as User).token}`,
        },
      };

      // Send DELETE request to delete the group
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_DOMAIN}/api/group/${teamToDelete._id}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to delete group");
      }

      console.log(`Group ${teamToDelete.name} deleted successfully`);
    } catch (error: any) {
      console.error("Error deleting group:", error.message);
    }
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete {teamToDelete.name}?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will delete {teamToDelete.name}{" "}
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
