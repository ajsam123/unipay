import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSubaccount,
  getBankDetails,
  getBanks,
  updateBankDetails,
} from "../services/appService";
import { handleApiError } from "../utils/getErrorMessage";

/* -------------------- Fetch Banks -------------------- */
export function useGetBanks() {
  return useQuery({
    queryKey: ["banks"],
    queryFn: getBanks,
    staleTime: Infinity,
    select: (banks) => {
      if (!Array.isArray(banks)) return [];

      const uniqueBanks = new Map();

      banks.forEach((bank) => {
        uniqueBanks.set(bank.code, bank);
      });

      return [...uniqueBanks.values()];
    },
  });
}

export function useGetBankDetails(enabled = true) {
  return useQuery({
    queryKey: ["bank-details"],
    queryFn: getBankDetails,
    onError: handleApiError,
    refetchOnWindowFocus: false, // optional, avoids unnecessary refetch
    enabled,
  });
}

export function useUpdateBankDetails() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBankDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bank-details"],
      });
    },
  });
}

// export function useAddBankDetails() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: createSubaccount,
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["bank-details"],
//       });
//     },
//   });
// }
