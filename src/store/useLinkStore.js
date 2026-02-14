import { create } from "zustand";
import { userLinks } from "../data/links";

const useLinkStore = create((set) => ({
  links: userLinks,
  addLink: (link) => set((state) => ({ links: [...state.links, link] })),
  deleteLink: (linkId) =>
    set((state) => ({
      links: state.links.filter((link) => link.id !== linkId),
    })),
}));

export default useLinkStore;
