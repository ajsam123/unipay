import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Camera, Upload, Image as ImageIcon, X } from "lucide-react";

const IDUpload = ({ onImageUpload }) => {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result);
          // onImageUpload(file); // Send actual file to parent for Cloudinary/Backend
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const removeImage = (e) => {
    e.stopPropagation();
    setPreview(null);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="body-small-medium dark:text-neutral-400 text-neutral-black-13">
        School ID Card Photo
      </label>

      <div
        {...getRootProps()}
        className={`relative cursor-pointer group flex flex-col items-center justify-center w-full min-h-50 rounded-xl border-2 border-dashed transition-all
          ${isDragActive ? "border-primary-100 bg-primary-50/10" : "border-neutral-black-5 dark:border-neutral-600 bg-neutral-black-2 dark:bg-background"}
          ${preview ? "border-none p-0" : "p-6"}
        `}
      >
        <input {...getInputProps()} />

        {preview ? (
          /* PREVIEW STATE */
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <img
              src={preview}
              alt="ID Preview"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-sm font-medium">
                Click or Drag to change photo
              </p>
            </div>
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 p-1.5 bg-destructive rounded-full text-white hover:scale-110 transition-transform"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex gap-2">
              <div className="p-3 bg-white dark:bg-neutral-800 rounded-full shadow-sm">
                <Camera size={24} className="text-neutral-black-9" />
              </div>
              <div className="p-3 bg-white dark:bg-neutral-800 rounded-full shadow-sm">
                <Upload size={24} className="text-neutral-black-9" />
              </div>
            </div>

            <div>
              <p className="body-small-medium text-neutral-black-13 dark:text-white">
                <span className="text-primary-100">Click to upload</span> or
                drag and drop
              </p>
              <p className="text-[12px] text-neutral-black-9 mt-1">
                PNG, JPG or JPEG (max. 5MB)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IDUpload;
