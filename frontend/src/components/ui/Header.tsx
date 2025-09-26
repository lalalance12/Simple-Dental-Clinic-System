import React from "react";
import { Navigation } from "./Navigation";

interface HeaderProps {
  currentPage?: string;
}

const getNavItems = (currentPage: string) => [
  { label: "Home", href: "/", active: currentPage === "home" },
  { label: "Services", href: "/services", active: currentPage === "services" },
  {
    label: "Book Appointment",
    href: "/book-appointment",
    active: currentPage === "book-appointment",
  },
  { label: "About", href: "/about", active: currentPage === "about" },
  { label: "Contact", href: "/contact", active: currentPage === "contact" },
];

export const Header: React.FC<HeaderProps> = ({ currentPage = "" }) => {
  const navItems = getNavItems(currentPage);

  return (
    <Navigation
      brand={{ label: "Fresh Confidence Dental", href: "/" }}
      items={navItems}
    />
  );
};
