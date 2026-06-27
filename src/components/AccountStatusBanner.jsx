import { Link } from "@tanstack/react-router";
import { useUsers } from "../hooks/useUsers";

const AccountStatusBanner = () => {
  const { data: user, isLoading } = useUsers();

  if (isLoading || !user) return null;

  const bannerClasses =
    "w-full border-b border-rose-200 bg-rose-50 px-6 py-3 text-sm text-rose-700";

  // Highest priority: account approval
  return (
    <>
      {!user.is_id_approved && (
        <div className={bannerClasses}>
          Your account is awaiting administrator approval. Payments and payouts
          will be available once your account has been approved.
        </div>
      )}

      {!user.has_subaccount && (
        <div className={bannerClasses}>
          You haven't added a payout bank account yet.{" "}
          <Link
            to="/profile"
            className="font-medium underline underline-offset-2 hover:text-rose-800"
          >
            Add your bank details
          </Link>{" "}
          to start receiving payouts.
        </div>
      )}
    </>
  );
};

export default AccountStatusBanner;
