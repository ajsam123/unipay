// store/modalStore.js - BRAND NEW
import { create } from 'zustand';

// NO IMPORTS of any components here!

export const useModalStore = create((set) => ({
  open: false,
  modalContent: null, // Store the actual component here
  modalProps: {},
  
  openModal: (content, props = {}) => 
    set({ 
      open: true, 
      modalContent: content,
      modalProps: props
    }),
    
  closeModal: () => 
    set({ 
      open: false, 
      modalContent: null,
      modalProps: {} 
    }),
}));