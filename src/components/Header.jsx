import { HamburgerIcon } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useNavbar } from "../store/useNavbar";
import HeaderProfile from "./HeaderProfile";
import ActionModal from "./ActionModal";

const Header = () => {
  const { setNavbar } = useNavbar((s) => s);
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/profile": "My Profile",
    "/payment-pages": "Payment Page",
    "/payout": "Payout",
    // Add default for root if needed
    "/": "Dashboard",
  };

  const currentTitle = pageTitles[pathname] || "Dashboard";

  return (
    <section className="border-b z-0 py-4 px-3 border-sidebar-border flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <button onClick={() => setNavbar(true)} className="flex md:hidden">
          <Menu icon={20} />
        </button>
        <span className="body-medium-semibold">{currentTitle}</span>
      </div>
      <ActionModal
      className=""
        trigger={<HeaderProfile />}
        actions={[
          {
            label: "Profile",
            onClick: () => {
              console.log("Go to profile");
            },
          },
          {
            label: "Settings",
            onClick: () => {
              console.log("Go to settings");
            },
          },
          {
            label: "Logout",
            color: "red",
            onClick: () => {
              console.log("Logout user");
            },
          },
        ]}
      />
    </section>
  );
};

export default Header;
