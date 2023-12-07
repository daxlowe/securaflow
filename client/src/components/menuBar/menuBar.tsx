import React from 'react';
import { useLogout } from '@/hooks/useLogout';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { NavLink } from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"; // Adjust the import path as per your project setup
//import * as logo from '@/assets/images/securaflow-logo.png';

const MenuBar: React.FC = () => {
    const { logout } = useLogout();

    const handleClick = () =>
    {
        logout()
    }

    return (
        <div className="flex flex-col justify-between h-screen p-4">
            <div className="list-none">
                <NavigationMenu className="flex flex-col">
                    <NavigationMenuItem className="mb-1">
                        <NavLink to="/home">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Home
                            </NavigationMenuLink>
                        </NavLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="mb-1">
                        <NavLink to="/">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Dashboard
                            </NavigationMenuLink>
                        </NavLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="mb-1">
                        <NavLink to="/analytics">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Analytics
                            </NavigationMenuLink>
                        </NavLink>            
                    </NavigationMenuItem>
                </NavigationMenu>
            </div>
            <div>
                <Button
                    onClick={handleClick}
                    variant="ghost"
                >
                    Logout
                </Button>
                
                <ModeToggle />
            </div>
        </div>
    );
};

export default MenuBar;
