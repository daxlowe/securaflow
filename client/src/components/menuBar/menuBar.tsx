import React from "react";
import { NavLink } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const MenuBar: React.FC = () => {
  return (
    <div className="flex flex-col justify-between h-screen p-4 w-fit">
      <div className="list-none">
        <NavigationMenu className="flex flex-col">
          <NavigationMenuItem className="mb-1">
            <NavLink to="/">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Dashboard
              </NavigationMenuLink>
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="mb-1">
            <NavLink to="/organization">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Organization
              </NavigationMenuLink>
            </NavLink>
          </NavigationMenuItem>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default MenuBar;
