import React from "react";
import { Link, useRouterState } from "@tanstack/react-router";

const NavbarLink = ({
  leftIcon,
  linkDesc,
  LinkTo,
  rightIcon = null,
  onClick,
}) => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isActive = pathname.startsWith(LinkTo);

  return (
    <Link
      onClick={onClick}
      to={LinkTo || "#"}
      className={
        isActive
          ? "bg-sidebar-primary/10 py-3 px-4 rounded-xl flex w-full text-sidebar-primary gap-3 relative body-medium-semibold"
          : "flex py-3 dark:text-white px-4 hover:cursor-pointer rounded-4  items-center w-full gap-3 body-medium-semibold"
      }
    >
      {isActive && (
        <div className="absolute  h-full w-2.5 bg-sidebar-primary -left-6.25 top-1/2 -translate-y-1/2 rounded-r-full"></div>
      )}
      <div className="flex items-center gap-2 w-full">
        {leftIcon}
        <span>{linkDesc}</span>
      </div>
      {rightIcon}
    </Link>
  );
};

export default NavbarLink;
