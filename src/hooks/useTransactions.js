// hooks/useTransactions.js
import { useQuery} from "@tanstack/react-query";
import { getTransactions } from "../services/appService";
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
