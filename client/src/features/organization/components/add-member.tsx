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

export default function AddMember() {
  function onSubmit() {
    // Retrieve input values
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;

    // Validate email format
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      });
      emailInput.focus();
      return;
    }

    // Retrieve password value
    const password = passwordInput.value;

    // Display form submission toast
    toast({
      title: "Form Submitted",
      description: `Email: ${email}, Password: ${password}`,
    });
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create User</DialogTitle>
        <DialogDescription>
          Create an Account for Organization.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            defaultValue="name@domain.com"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="passowrd" className="text-right">
            Password
          </Label>
          <Input id="password" defaultValue="temp" className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <DialogClose>
          <Button type="submit" onClick={onSubmit}>
            Save changes
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
