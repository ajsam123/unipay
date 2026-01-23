import { create } from "zustand";

export const useNavbar = create((set) => ({
    navbar: false,
    setNavbar: (newNavbar) => set({navbar: newNavbar})
}))