import React, { useState } from "react";
import { AlertTriangle, Eye, EyeOff } from "lucide-react";
import Button from "./Button";
import Input from "./Input";
import { deleteAccount } from "../services/appService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleApiError } from "../utils/getErrorMessage";
import toast from "react-hot-toast";
import { routes } from "../constants/routes";
import { useModalStore } from "../store/modalStore";
import { useNavigate } from "@tanstack/react-router";

const DeleteAccountModal = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore((s) => s);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: deleteAccount,
    onError: (err) => {
      // Show backend field errors like {"password": ["Incorrect password."]} inline
      const fieldError = err?.response?.data?.password?.[0];
      if (fieldError) {
        setError(fieldError);
      } else {
        handleApiError(err);
      }
    },
    onSuccess: () => {
      closeModal();
      toast.success("Account deleted successfully");

      queryClient.cancelQueries();
      queryClient.clear();

      localStorage.removeItem("refresh");
      localStorage.removeItem("access");

      navigate({ to: routes.HOMEPAGE });
    },
  });

  const handleDelete = () => {
    if (!password.trim()) {
      setError("Password is required");
      return;
    }
    setError("");
    mutate({ password });
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

      <Input
        className="w-full"
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password to confirm"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (error) setError("");
        }}
        onKeyDown={(e) => e.key === "Enter" && !isPending && handleDelete()}
        error={error}
        disabled={isPending}
        autoComplete="current-password"
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-neutral-500"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        }
      />

      <div className="mt-2 flex w-full flex-col gap-2">
        <Button variant="stroke" onClick={closeModal} disabled={isPending}>
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
