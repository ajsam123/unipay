import { HamburgerIcon } from "lucide-react";
import { useLocation } from "react-router";
import { Menu } from "lucide-react";
import { useNavbar } from "../store/useNavbar";

const Header = () => {
  const { setNavbar } = useNavbar((s) => s);
  const location = useLocation();

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/profile": "My Profile",
    "/payment-pages": "Payment Page",
    "/payout": "Payout",
    // Add default for root if needed
    "/": "Dashboard",
  };

  const currentTitle = pageTitles[location.pathname] || "Dashoard";

  return (
    <div className="border-b py-4 px-3 border-sidebar-border flex items-center gap-4">
      <button onClick={() => setNavbar(true)} className="flex md:hidden">
        <Menu icon={20} />
      </button>
      <span className="body-medium-semibold">{currentTitle}</span>
    </div>
  );
};

export default Header;
