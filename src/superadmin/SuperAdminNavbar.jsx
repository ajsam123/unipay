import {
  LayoutDashboard,
  HandCoins,
  CreditCard,
  CircleUserRound,
  ShieldCheck,
  User,
} from "lucide-react";
import { routes } from "../constants/routes";
import { useNavbar } from "../store/useNavbar";

const SuperAdminNavbar = () => {
  // Define nav items in an array for cleaner mapping
  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: routes.SUPERADMINDASHBOARD,
    },
    {
      icon: <User size={20} />,
      label: "Users",
      path: routes.ADMINUSERS,
    },
    {
      icon: <ShieldCheck size={20} />,
      label: "Verification Centre",
      path: routes.VERIFICATIONCENTRE,
    },
  ];
  const { navbar, setNavbar } = useNavbar((s) => s);
  const handleNavbar = () => {
    if (navbar) {
      setNavbar(false);
    }
  };
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
            onClick={handleNavbar}
          />
        ))}
      </div>
    </div>
  );
};

export default SuperAdminNavbar;
