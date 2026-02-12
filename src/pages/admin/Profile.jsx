import { Lock, LogOut, Mail, User, UserX } from "lucide-react";
import Input from "../../components/Input";
import ProfileUserInfo from "../../components/ProfileUserInfo";
import Button from "../../components/Button";
import { useModalStore } from "../../store/modalStore";
import BankDetailsForm from "../../components/BankDetailsForm";

const Profile = () => {
  const { openModal } = useModalStore((s) => s);
  return (
    <div className="p-6 bg-white rounded-lg flex gap-6 w-full flex-col">
      <div className="lg:grid grid-cols-3 gap-10 w-full border-b border-neutral-black-5  pb-6 ">
        <ProfileUserInfo
          title="Profile"
          body="Your personal information and account 
                security settings."
          className="w-full"
        />
        <div className="flex gap-5 flex-col w-full col-span-2">
          <ProfileUserInfo title="Avatar" />
          <div className="lg:flex gap-2 w-full">
            <Input
              placeholder="Fajar Gunawan"
              className="w-full"
              label="Full Name"
              disabled
              leftIcon={<User size={20} />}
            />
            <Input
              className="w-full"
              label="Email"
              placeholder="fajar123@gmail.com"
              disabled
              leftIcon={<Mail size={20} />}
            />
          </div>
          <Input
            label="Password"
            placeholder="Enter new password"
            leftIcon={<Lock size={20} />}
          />
        </div>
      </div>
      <div className="w-full border-b border-neutral-black-5 dark:border-neutral-800 pb-6 flex justify-between">
        <ProfileUserInfo
          title="Bank details"
          body="Enter bank details required for payouts"
          className="w-full"
        />
        <div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              openModal({
                title: "Bank details",
                content: <BankDetailsForm />,
              })
            }
          >
            Add Bank details
          </Button>
        </div>
      </div>
      <div className="lg:grid grid-cols-3 lg:gap-10 gap-5 flex flex-col">
        <ProfileUserInfo title="Danger zone" body="Proceed with Caution" />
        <div className="lg:flex gap-5 col-span-2 flex  flex-col w-full">
          <Button variant="stroke" leftIcon={<LogOut size={20} />}>
            Logout of all sessions
          </Button>
          <Button variant="red" leftIcon={<UserX size={20} />}>
            Delete account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
