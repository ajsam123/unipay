import React from "react";
import { X } from "lucide-react";
import Button from "../../components/Button";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Sidebar = ({ menuOpen, closeMenu }) => {
  return (
    <aside
      className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <span className="text-sm font-medium text-gray-400">Menu</span>
          <button
            onClick={closeMenu}
            className="p-2 rounded-md hover:bg-gray-100 transition"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="p-6">
          <ul className="flex flex-col gap-2">
            {links.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={closeMenu}
                  className="flex items-center gap-2 px-3 py-3 rounded-lg text-gray-600 text-base font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* CTA buttons */}
      <div className="p-6 border-t border-gray-100 flex flex-col gap-3">
        <Button variant="stroke" className="w-full">
          Login
        </Button>
        <Button className="w-full">Get Started</Button>
      </div>
    </aside>
  );
};

export default Sidebar;
