import React from "react";
import { AlertTriangle } from "lucide-react";
import Button from "./Button";
import { logout } from "../services/appService";
import { useMutation } from "@tanstack/react-query";
import { handleApiError } from "../utils/getErrorMessage";
import toast from "react-hot-toast";
import { routes } from "../constants/routes";
import { useModalStore } from "../store/modalStore";
import { useNavigate } from "@tanstack/react-router";

// import { redirect } from ""

const LogoutModal = () => {
  const navigate = useNavigate();

  const refresh = localStorage.getItem("refresh");
  const { closeModal } = useModalStore((s) => s);

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onError: handleApiError,
    onSuccess: () => {
      closeModal();
      toast.success("Logout Succesful");
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      navigate({ to: routes.LOGIN });
    },
  });

  const handleLogout = () => {
    mutate({ refresh });
  };
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <AlertTriangle size={48} className="text-red-500" />
      <div className="text-center space-y-1">
        <p className="text-lg font-semibold">Logout</p>
        <p className="text-sm text-gray-600">
          Are you sure you want to logout?
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full mt-2">
        <Button
          variant="stroke"
          onClick={() => {
            closeModal();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="red"
          onClick={handleLogout}
          isLoading={isPending}
          disabled={isPending}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default LogoutModal;
