import React from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { useModalStore } from "../store/modalStore";

export default function Modal() {
  const open = useModalStore((s) => s.open);
  const closeModal = useModalStore((s) => s.closeModal);
  const Content = useModalStore((s) => s.modalContent);
  const modalProps = useModalStore((s) => s.modalProps);

  if (!open || !Content) return null;

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-lg max-h-2/3 w-full rounded-2xl border-none overflow-auto">
        <Content {...modalProps} onClose={closeModal} />
      </DialogContent>
    </Dialog>
  );
}
