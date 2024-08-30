import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useNavItems } from '../nav-items';
import { cn } from "@/lib/utils";
import LanguageSwitcher from './LanguageSwitcher';

const DesktopNav = () => {
  const location = useLocation();
  const navItems = useNavItems();
  return (
    <nav className="hidden md:flex items-center space-x-4">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={cn(
            "flex items-center space-x-2 text-sm font-medium p-2 rounded-md transition-colors",
            location.pathname === item.to
              ? "bg-primary text-primary-foreground"
              : "hover:bg-secondary"
          )}
        >
          {item.icon}
          <span>{item.title}</span>
        </Link>
      ))}
      <LanguageSwitcher />
    </nav>
  );
};

export default DesktopNav;
