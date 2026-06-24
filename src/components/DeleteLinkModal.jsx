// components/DeleteLinkModal.jsx - BRAND NEW
import { AlertTriangle } from "lucide-react";
import Button from "./Button";
import toast from "react-hot-toast";
import { useDeleteLink } from "../hooks/useLinks";

// NO STORE IMPORTS HERE!
const DeleteLinkModal = ({ linkId, onClose }) => {
  const { mutate: deleteLink, isLoading } = useDeleteLink();

  const handleDelete = () => {
    deleteLink(linkId, {
      onSuccess: () => {
        toast.success("Link deleted successfully");
        onClose(); // Just call onClose
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <AlertTriangle size={48} className="text-red-500" />
      <div className="text-center space-y-1">
        <p className="text-lg font-semibold">Delete Link</p>
        <p className="text-sm text-gray-600">
          Are you sure you want to delete this link? This action cannot be
          undone and the link will stop receiving payments.
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full mt-2">
        <Button variant="stroke" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="red"
          onClick={handleDelete}
          isLoading={isLoading}
          disabled={isLoading}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteLinkModal;
