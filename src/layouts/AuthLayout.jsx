import React from "react";
import { Outlet } from "react-router";
import Logo from "../components/Logo";

const AuthLayout = () => {
  return (
    <div className="dark:bg-background grid place-items-center p-10 w-full h-full">
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
