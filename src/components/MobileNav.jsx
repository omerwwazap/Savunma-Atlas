import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useNavItems } from "../nav-items";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./LanguageSwitcher";
import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

const MobileNav = () => {
  const location = useLocation();
  const navItems = useNavItems();
  const { t } = useTranslation();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center space-x-2 text-lg font-medium p-2 rounded-md transition-colors",
                location.pathname === item.to
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary"
              )}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
          <Link
            to="/about"
            className="flex items-center space-x-2 text-lg font-medium p-2 rounded-md transition-colors hover:bg-secondary"
          >
            <Mail className="h-4 w-4" />
            <span>{t("nav.contact")}</span>
          </Link>
          <div className="pt-4">
            <LanguageSwitcher />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
