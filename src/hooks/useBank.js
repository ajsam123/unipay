import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSubaccount,
  getBankDetails,
  getBanks,
  resolveAccount,
  updateBankDetails,
} from "../services/appService";
import toast from "react-hot-toast";
import { useModalStore } from "../store/modalStore";

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

/* -------------------- Get Bank Details -------------------- */
export function useGetBankDetails(enabled = true) {
  return useQuery({
    queryKey: ["bank-details"],
    queryFn: async () => {
      try {
        return await getBankDetails();
      } catch (err) {
        // No bank added yet -> treat as "no bank" instead of an error
        if (err?.response?.status === 404) return null;
        throw err;
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
    enabled,
  });
}

/* -------------------- Update Bank Details -------------------- */
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

/* -------------------- Add Bank Details -------------------- */
export function useAddBankDetails() {
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore((s) => s);

  return useMutation({
    mutationFn: createSubaccount,
    onSuccess: () => {
      toast.success("Bank account added successfully");
      queryClient.invalidateQueries({
        queryKey: ["bank-details"],
      });
      closeModal();
    },
    onError: () => {
      toast.error("Failed to add bank account");
    },
  });
}

/* -------------------- Resolve Account -------------------- */
export function useResolveAccount() {
  return useMutation({
    mutationFn: resolveAccount,
    onSuccess: () => {
      toast.success("Account verified successfully");
    },
    onError: () => {
      toast.error("Failed to verify account");
    },
  });
}
