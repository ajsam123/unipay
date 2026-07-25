import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUser,
  getUserProfile,
  onboarding,
  updateUser,
} from "../services/appService";
import { handleApiError } from "../utils/getErrorMessage";

// ---------------- GET USER DETAILS ----------------
export function useUsers() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    onError: handleApiError,
    refetchOnWindowFocus: false,
  });
}

// ------------ GET USER PROFILE DETAILS --------
export function useProfileDetails() {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
    onError: handleApiError,
    refetchOnWindowFocus: false,
  });
}

// ---------------- UPDATE USER ----------------
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["pendingVerifications"] });
    },
    onError: handleApiError(),
  });
}
export function useOnboardingUser() {
  return useMutation({
    mutationFn: onboarding,
    onError: (error) => {
      handleApiError(error);
    },
  });
}
