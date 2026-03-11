// hooks/useLinks.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPaymentLinks,
  createPaymentLink,
  deletepaymentLink,
} from "../services/appService";
import { handleApiError } from "../utils/getErrorMessage";

// ----------------- QUERY -----------------
export function useGetLinks() {
  return useQuery({
    queryKey: ["links"],
    queryFn: getPaymentLinks,
    onError: handleApiError,
    refetchOnWindowFocus: false, // optional, avoids unnecessary refetch
  });
}

// ----------------- MUTATION -----------------
export function useCreateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPaymentLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
    onError: handleApiError,
  });
}

// ----------------- DELETE LINK -----------------
export function useDeleteLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletepaymentLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
    onError: handleApiError,
  });
}
