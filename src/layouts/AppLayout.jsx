import React, { useState } from "react";
import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Header from "../components/Header";

const AppLayout = () => {
  return (
    <div className="flex h-screen relative">
      <div className="sticky border-r h-screen border-sidebar-border">
        <NavBar />
      </div>
      <main className="flex flex-1 h-screen flex-col overflow-y-auto scrollBar">
        <div className=" sticky top-0 z-50 bg-white">
          <Header />
        </div>
        <div className="flex-1 bg-neutral-black-4 dark:bg-neutral-black-12  relative py-5 px-6 h-screen overflow-y-auto scrollBar">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
