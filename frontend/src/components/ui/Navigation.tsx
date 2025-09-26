import React, { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface NavigationProps {
  brand: {
    label: string;
    href: string;
  };
  items: NavItem[];
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  brand,
  items,
  className = "",
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${className}`}>
      <div className="container flex justify-between items-center">
        {/* Brand */}
        <a href={brand.href} className="navbar-brand">
          {brand.label}
        </a>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-toggle md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen.toString()}
        >
          <span className="sr-only">Menu</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Navigation Items */}
        <div className={`navbar-nav ${isMobileMenuOpen ? "active" : ""}`}>
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`navbar-link ${item.active ? "active" : ""}`}
              onClick={closeMobileMenu}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
