import { ChevronDown } from "lucide-react";
import ActionModal from "./ActionModal";
import { useUsers } from "../hooks/useUsers";

const HeaderProfile = () => {
  const userActions = [
    { label: "Settings", onClick: () => console.log("Settings opened") },
    { label: "Support", onClick: () => console.log("Support clicked") },
    {
      label: "Log Out",
      onClick: () => console.log("User logged out"),
      color: "red",
    },
  ];

  const { data: user, isLoading } = useUsers(); // data is a single user object

  return (
    <ActionModal
      className="w-full"
      trigger={
        <div className="py-1 pl-1 pr-3 bg-neutral-black-3/10 bg-neutral-black-9 md:gap-3 gap-1 rounded-full flex items-center hover:cursor-pointer">
          <figure>
            <img
              className="w-10 h-10 rounded-full"
              src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
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
          <figure>
            <ChevronDown
              className={`transition-all dark:text-white duration-300`}
              //   ${
              //     dropDown ? "rotate-180" : "rotate-0"
              //   {"}"}
            />
          </figure>
        </div>
      }
      actions={userActions}
    />
  );
};

export default HeaderProfile;
