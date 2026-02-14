import { AlertTriangle } from "lucide-react";
import useLinkStore from "../store/useLinkStore";
import Button from "./Button";
import { useModalStore } from "../store/modalStore";
import toast from "react-hot-toast";

const DeleteLinkModal = ({ linkId }) => {
  const { deleteLink } = useLinkStore((s) => s);
  const { closeModal } = useModalStore((s) => s);
  const handleClose = () => {
    deleteLink(linkId);
    closeModal();
    toast.success("Link deleted successfully");
  };

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {/* Icon and warning */}
      <AlertTriangle size={48} className="text-red-500" />
      <div className="text-center space-y-1">
        <p className="text-lg font-semibold">Delete Link</p>
        <p className="text-sm text-gray-600">
          Are you sure you want to delete this link? This action cannot be
          undone and the link will stop receiving payments.
        </p>
      </div>

      {/* Footer buttons */}
      <div className="flex flex-col gap-2 w-full mt-2">
        <Button variant="stroke" onClick={() => closeModal()}>
          Cancel
        </Button>
        <Button variant="red" onClick={handleClose}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteLinkModal;
