import NavbarLogo from "./NavbarLogo";
import NavbarLink from "./NavbarLink";
import { routes } from "../constants/routes";
import {
  LayoutDashboard,
  HandCoins,
  CreditCard,
  CircleUserRound,
} from "lucide-react";

const NavBar = () => {
  // Define nav items in an array for cleaner mapping
  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: routes.DASHBOARD,
    },
    {
      icon: <CreditCard size={20} />,
      label: "Payment pages",
      path: routes.PAYMENTPAGES,
    },
    {
      icon: <HandCoins size={20} />,
      label: "Payout",
      path: routes.PAYOUT,
    },
    {
      icon: <CircleUserRound size={20} />,
      label: "Profile",
      path: routes.PROFILE,
    },
  ];

  return (
    <div className="p-5 flex flex-col gap-4">
      <NavbarLogo />
      <div className="flex flex-col gap-4">
        {navItems.map((item) => (
          <NavbarLink
            key={item.path}
            LinkTo={item.path}
            linkDesc={item.label}
            leftIcon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default NavBar;
