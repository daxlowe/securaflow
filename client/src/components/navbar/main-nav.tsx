import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import * as logo from "@/assets/images/securaflow-logo.png";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const image = logo.default;
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link to="/">
        <img src={image} height={100} width={100} />
      </Link>
    </nav>
  );
}
