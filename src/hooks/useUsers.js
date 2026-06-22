import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, updateUser } from "../services/appService";
import { handleApiError } from "../utils/getErrorMessage";

// ---------------- GET ALL USERS ----------------
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    onError: handleApiError,
    refetchOnWindowFocus: false,
  });
}

// // ---------------- GET PENDING VERIFICATIONS ----------------
// export function usePendingVerifications() {
//   return useQuery({
//     queryKey: ["pendingVerifications"],
//     queryFn: getPendingVerifications,
//     onError: handleApiError,
//     refetchOnWindowFocus: false,
//   });
// }

// ---------------- UPDATE USER ----------------
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["pendingVerifications"] });
    },
    onError: handleApiError,
  });
}
