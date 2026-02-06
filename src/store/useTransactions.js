import { transactions } from "../data/paymentTable";
import { create } from "zustand";

export const useTransactions = create((set) => ({
  transaction: [],
  setTransactions: (transactions) => set({ transaction: transactions }),
}));
