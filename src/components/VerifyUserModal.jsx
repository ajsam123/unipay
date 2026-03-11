import { useModalStore } from "../store/modalStore";
import { useVerifyUser } from "../hooks/useSuperAdmin";
import Button from "../components/Button";
import toast from "react-hot-toast";

const VerifyUserModal = ({ userId }) => {
  const closeModal = useModalStore((s) => s.closeModal);
  const { mutate, isPending } = useVerifyUser();

  const handleApprove = () => {
    mutate(
      { userId, approved: true },
      {
        onSuccess: () => {
          toast.success("User approved successfully");
          closeModal();
        },
      }
    );
  };

  const handleDisapprove = () => {
    mutate(
      { userId, approved: false },
      {
        onSuccess: () => {
          toast.success("User disapproved successfully");
          closeModal();
        },
      }
    );
  };

  return (
    <div className="p-6 w-full max-w-md">

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        Review User Verification
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-6">
        Approving this user will unlock their ability to create payment links.
        Are you sure you want to proceed?
      </p>

      {/* Buttons */}
      <div className="flex justify-end gap-3">

        {/* Cancel */}
        <Button
          variant="ghost"
          onClick={closeModal}
        >
          Cancel
        </Button>

        {/* Disapprove */}
        <Button
          variant="red"
          onClick={handleDisapprove}
          isLoading={isPending}
        >
          Disapprove
        </Button>

        {/* Approve */}
        <Button
          variant="outline"
          onClick={handleApprove}
          isLoading={isPending}
        >
          Approve
        </Button>

      </div>

    </div>
  );
};

export default VerifyUserModal;