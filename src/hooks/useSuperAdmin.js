import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPendingVerifications, verifyUser } from "../services/appService";
import { handleApiError } from "../utils/getErrorMessage";

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
