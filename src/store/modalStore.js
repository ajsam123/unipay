// stores/modalStore.js
import { create } from "zustand";

export const useModalStore = create((set) => ({
  open: false,
  title: "",
  description: "",
  content: null,
  footer: null,

  // Open modal with any content
  openModal: ({ title, description, content, footer }) =>
    set({ open: true, title, description, content, footer }),

  // Close modal and reset
  closeModal: () =>
    set({
      open: false,
      title: "",
      description: "",
      content: null,
      footer: null,
    }),

    
}));
