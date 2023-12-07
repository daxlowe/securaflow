import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { useLogout } from "@/hooks/useLogout"
  import { useAuthContext } from "@/hooks/useAuthContext"
  import * as pfpPlaceholder from "@/assets/images/pfp-placeholder.jpg";

  export function UserNav() {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    //@ts-expect-error user is type never
    const email = user.email;

    //@ts-expect-error user is type never
    const firstName = user.first;

    //@ts-expect-error user is type never
    const lastName = user.last;
    
    const pfp = pfpPlaceholder.default;

    console.log(user);
    const handleLogout = () =>
    {
        logout()
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={pfp} alt="user" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{firstName} {lastName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }