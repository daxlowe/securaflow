import {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function AddMember() {
  const accessCode = "3W!n86";

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(accessCode)
      .then(() => {
        toast({
          title: "Success",
          description: "Access code copied to clipboard",
        });
      })
      .catch(() => {
        toast({ title: "Error", description: "Error copying to clipboard" });
      });
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Invite to Join</AlertDialogTitle>
        <AlertDialogDescription>
          This code can be used to join this organization
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div>
        <Button variant="link" className="text-3xl" onClick={copyToClipboard}>
          {accessCode}
        </Button>
      </div>
      <AlertDialogFooter>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
