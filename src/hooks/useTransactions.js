// hooks/useTransactions.js
import { useQuery } from "@tanstack/react-query";
import { getTransactions, getTransactionsByLink } from "../services/appService";
import { handleApiError } from "../utils/getErrorMessage";

// ----------------- QUERY -----------------
export function useGetTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
    onError: handleApiError,
    refetchOnWindowFocus: false, // optional, avoids unnecessary refetch
  });
}

export function useGetTransactionsByLink({ id }) {
  return useQuery({
    queryKey: ["transactions-by-link"],
    queryFn: () => getTransactionsByLink({ id }),
    onError: handleApiError,
    refetchOnWindowFocus: false, // optional, avoids unnecessary refetch
  });
}
