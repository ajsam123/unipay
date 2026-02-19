import { ChevronDown } from "lucide-react";

const HeaderProfile = () => {
  return (
    <div
      className="py-1 pl-1 pr-3 bg-neutral-black-3/10 bg-neutral-black-9 md:gap-3 gap-1 rounded-full flex items-center hover:cursor-pointer"
      onClick={() => {
        // Handle dropdown toggle here
      }}
    >
      <figure>
        <img
          className="w-10 h-10 rounded-full"
          src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
          alt="User Avatar"
        />
      </figure>
      <div className="lg:flex flex-col md:flex hidden">
        <div className="flex gap-1">
          <span className="body-small-medium">Samuel</span>
          <span className="body-small-medium">Ajose</span>
        </div>
        <span className="body-xsmall-medium text-paragraph">
          ajosesamuel2007@gmail.com
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
  );
};

export default HeaderProfile;
