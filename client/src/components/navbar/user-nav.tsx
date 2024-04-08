import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/useLogout";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Link } from "react-router-dom";
import { getUserData } from "@/utils/getUserData";
import { User } from "@/types";
import { useEffect, useState } from "react";

async function getUser(user: User) {
  const data = await getUserData(user);
  return data;
}

function getInitials(name: string) {
  return name
    .toUpperCase()
    .split(/\s+/) // Split by spaces
    .map((word) => word[0]) // Get the first letter of each word
    .join(""); // Join the letters back together
}

export function UserNav() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUserData(user);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    if (user) {
      fetchData();
    }
  }, [user]); // Run this effect whenever the user changes

  const [userInitials, setUserInitials] = useState("");

  getUser(user).then((userData) => {
    const initials = getInitials(
      userData.first_name + " " + userData.last_name
    );
    setUserInitials(initials);
  });

  const handleLogout = () => {
    logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={"asdfa"} alt="user" />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <h1>
              {userData ? userData.first_name + " " + userData.last_name : ""}
            </h1>
            <p className="text-xs leading-none text-muted-foreground">
              {userData ? userData.email : ""}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="/settings/profile">
          <DropdownMenuItem>User Settings</DropdownMenuItem>
        </Link>
        {userData && userData.roles?.includes("admin") ? (
          <Link to="/settings/profile">
            <DropdownMenuItem>Admin Panel</DropdownMenuItem>
          </Link>
        ) : (
          <></>
        )}
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
