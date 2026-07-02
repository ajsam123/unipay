import React from "react";
import DeleteLinkModal from "./DeleteLinkModal";
import { useMutation } from "@tanstack/react-query";
import { handleApiError } from "../utils/getErrorMessage";
import toast from "react-hot-toast";
import { redirect } from "react-router";
import { routes } from "../constants/routes";

const DeleteAccountModal = ({ onClose }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: DeleteLinkModal,
    onError: handleApiError,
    onSuccess: () => {
      toast.success("Account deleted successfully");
      (onclose(), redirect(routes.HOMEPAGE));
    },
  });

  const handleDelete = () => {
    mutate();
  };

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <AlertTriangle size={48} className="text-red-500" />
      <div className="text-center space-y-1">
        <p className="text-lg font-semibold">Delete Account</p>
        <p className="text-sm text-gray-600">
          Are you sure you want to delete this account? This action cannot be
          undone and all you acoount information will be deleted
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full mt-2">
        <Button variant="stroke" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="red"
          onClick={handleDelete}
          isLoading={isLoading}
          disabled={isLoading}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
