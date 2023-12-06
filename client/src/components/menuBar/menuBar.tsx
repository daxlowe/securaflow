import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"; // Adjust the import path as per your project setup

const MenuBar: React.FC = () => {
  return (
    <div className="mt-4 list-none p-4">
        <NavigationMenu className="flex flex-col">
        <NavigationMenuItem>
            {/* <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink> */}
            <NavLink to="/home">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
                </NavigationMenuLink>
            </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <NavLink to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Dashboard
                </NavigationMenuLink>
            </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <NavLink to="/analytics">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Analytics
                </NavigationMenuLink>
            </NavLink>            
        </NavigationMenuItem>
        {/* Add more NavigationMenuItem as needed */}
        </NavigationMenu>
    </div>
  );
};

export default MenuBar;
