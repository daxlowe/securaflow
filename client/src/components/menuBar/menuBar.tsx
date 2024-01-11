import React from 'react';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { NavLink } from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"; // Adjust the import path as per your project setup

const MenuBar: React.FC = () => {

    return (
        <div className="flex flex-col justify-between h-screen p-4">
            <div className="list-none">
                <NavigationMenu className="flex flex-col">
                    <NavigationMenuItem className="mb-1">
                        <NavLink to="/">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Dashboard
                            </NavigationMenuLink>
                        </NavLink>
                    </NavigationMenuItem>
                </NavigationMenu>
                
            </div>
            <div className='flex'>
                <ModeToggle />
            </div>
        </div>
    );
};

export default MenuBar;
