import { ChevronDown } from "lucide-react";
import ActionModal from "./ActionModal";
import { useUsers } from "../hooks/useUsers";
import { useModalStore } from "../store/modalStore";
import LogoutModal from "./LogoutModal";
import { routes } from "../constants/routes";
import { useNavigate } from "@tanstack/react-router";

const HeaderProfile = () => {
  const { data: user, isLoading } = useUsers();

  const { openModal } = useModalStore();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="py-1 pl-1 pr-3 rounded-full flex items-center gap-3 animate-pulse">
        <div className="w-10 h-10 rounded-full bg-neutral-700/30 backdrop-blur-sm" />

        <div className="hidden md:flex flex-col gap-2">
          <div className="h-3 w-24 rounded bg-neutral-700/30 backdrop-blur-sm" />
          <div className="h-2 w-32 rounded bg-neutral-700/20 backdrop-blur-sm" />
        </div>

        <div className="w-4 h-4 rounded bg-neutral-700/30 backdrop-blur-sm" />
      </div>
    );
  }

  const userActions = [
    {
      label: "Profile",
      onClick: () => {
        navigate({ to: routes.PROFILE });
      },
    },
    { label: "Support", onClick: () => console.log("Support clicked") },
    {
      label: "Log Out",
      onClick: () => openModal(LogoutModal),
      color: "red",
    },
  ];

  return (
    <ActionModal
      className="w-full"
      trigger={
        <div className="py-1 pl-1 pr-3 bg-neutral-black-3/10 bg-neutral-black-9 md:gap-3 gap-1 rounded-full flex items-center hover:cursor-pointer">
          <figure>
            <img
              className="w-10 h-10 rounded-full"
              src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
              alt="User Avatar"
            />
          </figure>

          <div className="lg:flex flex-col md:flex hidden">
            <div className="flex gap-1">
              <span className="body-small-medium">{user?.first_name}</span>
              <span className="body-small-medium">{user?.last_name}</span>
            </div>

            <span className="body-xsmall-medium text-paragraph">
              {user?.email}
            </span>
          </div>

          <ChevronDown className="transition-all dark:text-white duration-300" />
        </div>
      }
      actions={userActions}
    />
  );
};

export default HeaderProfile;
