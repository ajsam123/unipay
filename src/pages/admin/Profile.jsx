import {
  IdCard,
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
import { useProfileDetails } from "../../hooks/useUsers.js";
import { useGetBankDetails } from "../../hooks/useBank.js";
import LogoutModal from "../../components/LogoutModal.jsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { changePasswordSchema } from "../../schemas/auth.schema.js";
import { useAuth } from "../../hooks/useAuth.js";
import toast from "react-hot-toast";
import { logout } from "../../services/appService.js";
import { handleApiError } from "../../utils/getErrorMessage.js";
import { routes } from "../../constants/routes.js";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
const Profile = () => {
  const { openModal } = useModalStore((s) => s);

  const navigate = useNavigate();

  // Fetch User Data
  const { data: user, isLoading: isUserLoading } = useProfileDetails();

  const { changePasswordMutation } = useAuth();

  const onboardingInfo = user?.onboarding;

  // Fetch bank details
  const { data: bankDetails, isLoading: bankDetailsLoading } =
    useGetBankDetails(user?.has_subaccount);

  // Change password
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    },
  });

  // Log out after changing password

  const refresh = localStorage.getItem("refresh");

  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onError: handleApiError,
    onSuccess: () => {
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");

      toast.success("Password Changed Succesfully. Please sign in again");
      navigate({ to: routes.LOGIN });
    },
  });

  const handleLogout = () => {
    logoutMutation({ refresh });
  };

  const submitHandler = (val) => {
    changePasswordMutation.mutate(val, {
      onSuccess: () => {
        reset();

        handleLogout();
      },
    });
  };

  return (
    <div className="rounded-lg flex gap-6 w-full flex-col">
      {/* ================= PERSONAL INFORMATION ================= */}
      <div className="md:flex justify-between gap-10 w-full border-b border-neutral-black-5 pb-6">
        <ProfileUserInfo
          title="Personal Information"
          body="Your personal information"
          className="w-full"
        />

        <div className="flex gap-5 flex-col w-full col-span-2">
          {isUserLoading ? (
            <div className="lg:flex gap-2 w-full animate-pulse">
              <div className="h-12 bg-neutral-200 rounded-lg w-full" />
              <div className="h-12 bg-neutral-200 rounded-lg w-full" />
              <div className="h-12 bg-neutral-200 rounded-lg w-full" />
            </div>
          ) : (
            <div className="flex flex-col gap-2 w-full">
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
            </div>
          )}
        </div>
      </div>

      {/* ========== ACCOUNT INFORMATION ==========  */}
      <div className="md:flex justify-between gap-10 w-full border-b border-neutral-black-5 pb-6">
        <ProfileUserInfo
          title="Account Information"
          body="Your account information"
          className="w-full"
        />

        <div className="flex gap-2 flex-col w-full ">
          <Input
            className="w-full"
            label="University"
            placeholder={onboardingInfo?.university || "Not provided"}
            disabled
            leftIcon={<LucideUniversity size={20} />}
          />

          <Input
            className="w-full"
            label="Faculty"
            placeholder={onboardingInfo?.faculty || "Not provided"}
            disabled
            leftIcon={<LucideUniversity size={20} />}
          />

          <Input
            className="w-full"
            label="Department"
            placeholder={onboardingInfo?.department || "Not provided"}
            disabled
            leftIcon={<LucideUniversity size={20} />}
          />

          <Input
            className="w-full"
            label="Matric number"
            placeholder={onboardingInfo?.matric_no || "Not provided"}
            disabled
            leftIcon={<IdCard size={20} />}
          />

          <Input
            className="w-full"
            label="Organization name"
            placeholder={onboardingInfo?.organization_name || "Not provided"}
            disabled
            leftIcon={<LucideUniversity size={20} />}
          />
        </div>
      </div>

      {/* ========= CHANGE PASSWORD =========== */}
      <div className="md:flex justify-between gap-10 w-full border-b border-neutral-black-5 pb-6">
        <ProfileUserInfo
          title="Change Password"
          body="Change your password here"
          className="w-full"
        />

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex gap-2 flex-col w-full "
        >
          <Input
            label="Old password"
            placeholder="Password"
            leftIcon={<Lock size={20} />}
            {...register("old_password")}
            error={errors?.old_password?.message}
          />

          <Input
            label="New password"
            placeholder="Password"
            leftIcon={<Lock size={20} />}
            {...register("new_password")}
            error={errors?.new_password?.message}
          />

          <Input
            label="Confirm new password"
            placeholder="Password"
            leftIcon={<Lock size={20} />}
            {...register("confirm_new_password")}
            error={errors?.confirm_new_password?.message}
          />

          <Button type="submit" isLoading={changePasswordMutation.isPending}>
            Change Password
          </Button>
        </form>
      </div>

      {/* ================= BANK DETAILS SECTION ================= */}
      <div
        className="w-full border-b border-neutral-black-5 pb-6 "
        id="bank-detailsa"
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
