import React from "react";
import { AlertTriangle } from "lucide-react";
import Button from "./Button";
import { deleteAccount } from "../services/appService";
import { useMutation } from "@tanstack/react-query";
import { handleApiError } from "../utils/getErrorMessage";
import toast from "react-hot-toast";
import { routes } from "../constants/routes";
import { useModalStore } from "../store/modalStore";
import { useNavigate } from "@tanstack/react-router";

const DeleteAccountModal = () => {
  const navigate = useNavigate();
  const { closeModal } = useModalStore((s) => s);

  const { mutate, isPending } = useMutation({
    mutationFn: deleteAccount,
    onError: handleApiError,
    onSuccess: () => {
      closeModal();
      toast.success("Account deleted successfully");

      localStorage.removeItem("refresh");
      localStorage.removeItem("access");

      navigate({ to: routes.HOMEPAGE });
    },
  });

  const handleDelete = () => {
    mutate();
  };

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <AlertTriangle size={48} className="text-red-500" />

      <div className="space-y-1 text-center">
        <p className="text-lg font-semibold">Delete Account</p>

        <p className="text-sm text-gray-600">
          Are you sure you want to delete this account? This action cannot be
          undone, and all your account information will be deleted.
        </p>
      </div>

      <div className="mt-2 flex w-full flex-col gap-2">
        <Button
          variant="stroke"
          onClick={() => {
            closeModal();
          }}
          disabled={isPending}
        >
          Cancel
        </Button>

        <Button
          variant="red"
          onClick={handleDelete}
          isLoading={isPending}
          disabled={isPending}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
