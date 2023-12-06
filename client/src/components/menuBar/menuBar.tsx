import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu"; // Adjust the import path as per your project setup
import * as logo from '@/assets/images/securaflow-logo.png';

const MenuBar: React.FC = () => {
  const image = logo.default;
  return (
    <div className="flex flex-col items-start p-4 bg-gray-500 text-white h-screen">
      <img src={image} alt="Securaflow Logo" className="mb-6" />
      <div className="mt-4">
        <NavigationMenu className="flex flex-col">
          <NavigationMenuItem>
            <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavLink to="/analytics" className={({ isActive }) => isActive ? 'active' : ''}>Analytics</NavLink>
          </NavigationMenuItem>
          {/* Add more NavigationMenuItem as needed */}
        </NavigationMenu>
      </div>
    </div>
  );
};

export default MenuBar;
