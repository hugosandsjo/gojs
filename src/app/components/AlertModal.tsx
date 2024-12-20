import React from "react";

type AlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
};

const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: AlertModalProps) => {
  if (!isOpen) return null;

  // Stop propagation of click events
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 z-50"
        onClick={handleModalClick}
      >
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <div className="mb-6">
            <p className="text-gray-600">{message}</p>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
