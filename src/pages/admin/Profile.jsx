import {
  Lock,
  LogOut,
  LucideUniversity,
  Mail,
  Phone,
  User,
  UserX,
} from "lucide-react";
import Input from "../../components/Input";
import ProfileUserInfo from "../../components/ProfileUserInfo";
import Button from "../../components/Button";
import { useModalStore } from "../../store/modalStore";
import BankDetailsForm from "../../components/BankDetailsForm";
import { useUsers } from "../../hooks/useUsers.js";
import { useGetBankDetails } from "../../hooks/useBank.js";
import LogoutModal from "../../components/LogoutModal.jsx";
const Profile = () => {
  const { openModal } = useModalStore((s) => s);

  // Fetch User Data
  const { data: user, isLoading: isUserLoading } = useUsers();

  // Fetch bank details
  const { data: bankDetails, isLoading: bankDetailsLoading } =
    useGetBankDetails(user?.has_subaccount);

  return (
    <div className="rounded-lg flex gap-6 w-full flex-col">
      {/* ================= PROFILE SECTION ================= */}
      <div className="lg:grid grid-cols-3 gap-10 w-full border-b border-neutral-black-5 pb-6">
        <ProfileUserInfo
          title="Profile"
          body="Your personal information and account security settings."
          className="w-full"
        />

        <div className="flex gap-5 flex-col w-full col-span-2">
          <ProfileUserInfo title="Avatar" />

          {isUserLoading ? (
            <div className="lg:flex gap-2 w-full animate-pulse">
              <div className="h-12 bg-neutral-200 rounded-lg w-full" />
              <div className="h-12 bg-neutral-200 rounded-lg w-full" />
              <div className="h-12 bg-neutral-200 rounded-lg w-full" />
            </div>
          ) : (
            <div className="lg:flex gap-2 w-full">
              <Input
                placeholder={
                  user ? `${user.first_name} ${user.last_name}` : "Full Name"
                }
                className="w-full"
                label="Full Name"
                disabled
                leftIcon={<User size={20} />}
              />

              <Input
                className="w-full"
                label="Email"
                placeholder={user?.email}
                disabled
                leftIcon={<Mail size={20} />}
              />

              <Input
                className="w-full"
                label="Phone number"
                placeholder={user?.phone_number}
                disabled
                leftIcon={<Phone size={20} />}
              />

              <Input
                className="w-full"
                label="University"
                placeholder={user?.university_name || "Not provided"}
                disabled
                leftIcon={<LucideUniversity size={20} />}
              />
            </div>
          )}

          {/* <Input
            label="Password"
            placeholder="Enter new password"
            leftIcon={<Lock size={20} />}
          /> */}
        </div>
      </div>

      {/* ================= BANK DETAILS SECTION ================= */}
      <div
        className="w-full border-b border-neutral-black-5 pb-6 "
        id="bank-details"
      >
        <div className="flex md:justify-between md:flex-row flex-col gap-5">
          <ProfileUserInfo
            title="Bank details"
            body="Enter bank details required for payouts"
          />

          {!isUserLoading && !user?.has_subaccount && (
            <Button
              variant="outline"
              className="w-full max-w-40"
              onClick={() => openModal(BankDetailsForm)}
            >
              Add Bank Details
            </Button>
          )}
        </div>

        {/* Loading Skeleton */}
        {(isUserLoading || bankDetailsLoading) && (
          <div className="mt-5 rounded-xl border border-neutral-black-5 p-5 animate-pulse">
            <div className="space-y-4">
              <div>
                <div className="h-3 w-24 bg-neutral-200 rounded mb-2" />
                <div className="h-5 w-40 bg-neutral-200 rounded" />
              </div>

              <div>
                <div className="h-3 w-32 bg-neutral-200 rounded mb-2" />
                <div className="h-5 w-48 bg-neutral-200 rounded" />
              </div>

              <div>
                <div className="h-3 w-28 bg-neutral-200 rounded mb-2" />
                <div className="h-5 w-36 bg-neutral-200 rounded" />
              </div>
            </div>
          </div>
        )}

        {/* Bank Details Card */}
        {!isUserLoading &&
          !bankDetailsLoading &&
          user?.has_subaccount &&
          bankDetails && (
            <div className="mt-5 rounded-xl border border-neutral-black-5 p-5 flex md:flex-row flex-col justify-between gap-5">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-paragraph">Bank Name</p>
                  <p className="font-medium">{bankDetails.bank_name}</p>
                </div>

                <div>
                  <p className="text-xs text-paragraph">Account Number</p>
                  <p className="font-medium">{bankDetails.account_number}</p>
                </div>

                <div>
                  <p className="text-xs text-paragraph">Account Name</p>
                  <p className="font-medium">{bankDetails.account_name}</p>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => openModal(BankDetailsForm)}
              >
                Edit Details
              </Button>
            </div>
          )}
      </div>

      {/* ================= DANGER ZONE ================= */}
      <div className="lg:grid grid-cols-3 lg:gap-10 gap-5 flex flex-col w-full">
        <ProfileUserInfo title="Danger zone" body="Proceed with Caution" />

        <div className="flex gap-5 col-span-2 flex-col w-full">
          <Button
            variant="stroke"
            leftIcon={<LogOut size={20} />}
            onClick={() => {
              openModal(LogoutModal);
            }}
          >
            Logout
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
