import { useQuery } from "@tanstack/react-query";
import { getBankDetails } from "../services/appService";
import { handleApiError } from "../utils/getErrorMessage";

export function useGetBankDetails() {
  return useQuery({
    queryKey: ["bank-details"],
    queryFn: getBankDetails,
    onError: handleApiError,
    refetchOnWindowFocus: false, // optional, avoids unnecessary refetch
  });
}
