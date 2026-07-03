import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { handleApiError } from "../utils/getErrorMessage";
import { superAdminLogin } from "../services/authService";
import {
  getAdminDashboard,
  getPendingVerifications,
  verifyUser,
} from "../services/appService";

// ---------------- GET PENDING VERIFICATIONS ----------------
export const useGetPendingVerifications = () => {
  return useQuery({
    queryKey: ["pending-verifications"],
    queryFn: getPendingVerifications,
    onError: handleApiError,
  });
};

// ---------------- VERIFY USER ----------------
export const useVerifyUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["pending-verifications"]);
    },
    onError: handleApiError,
  });
};

export function useAdminLogin() {
  return useMutation({
    mutationFn: superAdminLogin,
    onError: handleApiError,
    onSuccess: (data) => {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
    },
  });
}

export function useGetAdminDashboard() {
  return useQuery({
    queryFn: getAdminDashboard,
    queryKey: ["admin-dashboard"],
  });
}
