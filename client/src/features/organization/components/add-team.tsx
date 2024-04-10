import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function AddTeam() {
  function onSubmit() {
    // Retrieve input values
    const teamNameInput = document.getElementById(
      "teamName"
    ) as HTMLInputElement;

    // Fetch options
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: teamNameInput.value }), // Fixed: Convert body to JSON string
    };

    // Send POST request to /signup route
    fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/group/`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response:", data);
        // Show toast with response
        toast({
          title: "Signup Successful",
          description: "Team has been signed up successfully.",
        });
      })
      .catch((error) => {
        console.error("Error:", error.message);
        // Show toast with error message
        toast({
          title: "Error",
          description: "Failed to create Team. Please try again later.",
        });
      });

    // Display form submission toast
    toast({
      title: "Form Submitted",
      description: `Team: ${teamNameInput.value}`, // Fixed: Access value of input
    });
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create Team</DialogTitle>
        <DialogDescription>Create a Team for Organization.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="teamName" className="text-right">
            Team Name
          </Label>
          <Input id="teamName" defaultValue="" className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <DialogClose>
          <Button type="button" onClick={onSubmit}>
            Create
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
