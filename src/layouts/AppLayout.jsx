import { Outlet } from "@tanstack/react-router";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import { useNavbar } from "../store/useNavbar";
import AccountStatusBanner from "../components/AccountStatusBanner";

const AppLayout = () => {
  const { navbar, setNavbar } = useNavbar((s) => s);
  return (
    <div className="flex h-screen relative">
      <div
        className={`
            fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden 
            ${navbar ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
          `}
        onClick={() => setNavbar(false)}
      />
      <div
        className={` border-r h-screen  bg-white ${navbar ? "border-transparent" : "border-sidebar-border"}  
        
        /* --- Mobile Styles (Drawer Mode) --- */
            fixed top-0 z-50 w-64 
            transition-transform duration-300 ease-in-out
            
            /* --- Desktop Styles (Sticky Mode) --- */
            md:translate-x-0  md:flex md:sticky
            
            /* --- The Toggle Logic --- */
            ${navbar ? "translate-x-0" : "-translate-x-full"}`}
      >
        <NavBar />
      </div>
      <main className="flex flex-1 h-screen flex-col overflow-y-auto">
        <div className=" sticky top-0 z-50 bg-white">
          <Header />
        </div>
        <div className="flex-1 bg-gray-50 dark:bg-neutral-black-12 relative h-screen overflow-y-auto scrollBar">
          <AccountStatusBanner />

          <div className="px-6 py-5">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
