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
import { isStrongPassword } from "validator";

export default function AddMember() {
  function generateStrongPassword(length = 12) {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  // Generate a random strong password
  let defaultPassword = generateStrongPassword();

  // Ensure the generated password is strong
  while (!isStrongPassword(defaultPassword)) {
    defaultPassword = generateStrongPassword();
  }

  function onSubmit() {
    // Retrieve input values
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;
    const firstNameInput = document.getElementById(
      "firstName"
    ) as HTMLInputElement;
    const lastNameInput = document.getElementById(
      "lastName"
    ) as HTMLInputElement;

    // Retrieve and validate email
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

    // Retrieve and validate password
    const password = passwordInput.value;
    if (!isStrongPassword(password)) {
      toast({
        title: "Weak Password",
        description:
          "Password must be at least 6 characters long and contain a combination of letters, numbers, and special characters.",
      });
      passwordInput.focus();
      return;
    }

    // Retrieve first name and last name
    const first_name = firstNameInput.value;
    const last_name = lastNameInput.value;

    // Check if all fields are filled
    if (!email || !password || !first_name || !last_name) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all fields.",
      });
      return;
    }

    // Data object to send in the request
    const userData = {
      email,
      password,
      first_name,
      last_name,
    };

    // Convert userData to JSON
    const jsonData = JSON.stringify(userData);

    // Fetch options
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };

    // Send POST request to /signup route
    fetch(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/user/signup`,
      requestOptions
    )
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
          description: "User has been signed up successfully.",
        });
      })
      .catch((error) => {
        console.error("Error:", error.message);
        // Show toast with error message
        toast({
          title: "Error",
          description: "Failed to sign up user. Please try again later.",
        });
      });

    // Display form submission toast
    toast({
      title: "Form Submitted",
      description: `Email: ${email}, Password: ${password}, First Name: ${first_name}, Last Name: ${last_name}`,
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
          <Label htmlFor="firstName" className="text-right">
            First Name
          </Label>
          <Input id="firstName" defaultValue="" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="lastName" className="text-right">
            Last Name
          </Label>
          <Input id="lastName" defaultValue="" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input id="email" defaultValue="" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="password" className="text-right">
            Password
          </Label>
          <Input
            id="password"
            defaultValue={defaultPassword}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose>
          <Button type="submit" onClick={onSubmit}>
            Create
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
