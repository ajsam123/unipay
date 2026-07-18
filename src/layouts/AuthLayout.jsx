import React from "react";
import { Outlet } from "@tanstack/react-router";
import Logo from "../components/Logo";

const AuthLayout = () => {
  return (
    <div className="grid place-items-center md:p-10 p-4 w-full h-full">
      <div className="">
        <Logo />
      </div>
      <section className="flex items-center justify-center w-full h-full max-w-135">
        <Outlet />
      </section>
    </div>
  );
};

export default AuthLayout;
