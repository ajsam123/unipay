import { HamburgerIcon } from "lucide-react";
import { useNavbar } from "../store/useNavbar";

const Header = () => {
  const { setNavbar } = useNavbar((s) => s);
  return (
    <div className="border-b py-4 px-3 border-sidebar-border">
      <button onClick={() => setNavbar(true)} className="flex md:hidden">
        <HamburgerIcon icon={20} />
      </button>
    </div>
  );
};

export default Header;
