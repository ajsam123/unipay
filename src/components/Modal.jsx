// components/Modal.js
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog"; // shadcn dialog

import { useModalStore } from "../store/modalStore";

export default function Modal() {
  const { open, closeModal, title, description, content, footer } =
    useModalStore();

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-lg rounded-2xl border-none">
        {/* Optional header */}
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        {/* Modal body */}
        <div className="py-2">{content}</div>

        {/* Optional footer */}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
