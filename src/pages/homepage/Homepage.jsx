import React, { useState } from "react";
import HeaderLogo from "./components/HeaderLogo";
import HeaderLinkList from "./components/HeaderLinkList";
import Button from "../../components/Button";
import Hero from "./components/Hero";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import CTA from "./components/Cta";
import { routes } from "../../constants/routes";
import { Link } from "@tanstack/react-router";

const Homepage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <section className="w-full">
      <header className="border-b border-neutral-200 relative z-50 mt-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-20 py-3">
          <HeaderLogo />

          <div className="hidden md:flex items-center gap-10">
            <HeaderLinkList />
            <div className="flex items-center gap-3">
              <Link to={routes.LOGIN}>
                <Button variant="stroke">Login</Button>
              </Link>
              <Link to={routes.SIGNUP}>
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>

          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <Sidebar menuOpen={menuOpen} closeMenu={closeMenu} />

      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
    </section>
  );
};

export default Homepage;
