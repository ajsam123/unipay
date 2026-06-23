// hooks/useTransactions.js
import { useQuery } from "@tanstack/react-query";
import {
  // getTransactionDetails,
  getTransactions,
  getTransactionsByLink,
} from "../services/appService";
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

// export function useGetTransactionDetails({ id }) {
//   return useQuery({
//     queryKey: ["transaction-details"],
//     queryFn: () => getTransactionDetails({ id }),
//     onError: handleApiError,
//     refetchOnWindowFocus: false, // optional, avoids unnecessary refetch
//   });
// }

export function useGetTransactionsByLink({ id }) {
  return useQuery({
    queryKey: ["transactions-by-link"],
    queryFn: () => getTransactionsByLink({ id }),
    onError: handleApiError,
    refetchOnWindowFocus: false, // optional, avoids unnecessary refetch
  });
}
