import { create } from "zustand";

export const useActionsStore = create((set) => ({
  profileDropdownAction: false,
  setProfileDropdownAction: (newProfileDropdownAction) =>
    set({ profileDropdownAction: newProfileDropdownAction }),
}));
