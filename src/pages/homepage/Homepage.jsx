import React from "react";
import Logo from "../../components/Logo";
import HeaderLogo from "./components/HeaderLogo";
import HeaderLinkList from "./components/HeaderLinkList";
import Button from "../../components/Button";
import Hero from "./components/Hero";

const Homepage = () => {
  return (
    <section>
      {/* Header */}
      <div className="flex justify-between px-20 py-2 border-b border-neutral-black-9 items-center">
        <HeaderLogo />
        <div className="flex items-center gap-10">
          <HeaderLinkList />
          <div className="flex items-center gap">
            <Button variant="stroke">Login</Button>
            <Button className="ml-4">Get Started</Button>
          </div>
        </div>
      </div>
      <Hero />
    </section>
  );
};

export default Homepage;
