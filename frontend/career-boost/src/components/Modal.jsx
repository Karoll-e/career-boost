import React from "react";
import { X } from "lucide-react";

const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  hideHeader = false,
  closeOnBackdrop = true,
  showCloseButton = true,
  maxWidth = "max-w-md",
  animated = true
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className={`
        fixed inset-0 z-50 flex justify-center items-center w-full h-full
        transition-colors duration-300
        ${isOpen ? "bg-black/70" : "bg-black/0"}
      `}
    >
      {/* Modal Content */}
      <div
        className={`
          relative flex flex-col bg-white shadow-lg rounded-xl overflow-hidden
          ${maxWidth} w-full mx-4
          ${animated 
            ? `transition-transform ${
                isOpen 
                  ? "scale-100 opacity-100" : "scale-125 opacity-0"
              }`
            : ""
          }
        `}
      >
        {/* Close Button */}
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-1.5 rounded-lg text-gray-400 bg-white/80 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        )}

        {/* Modal Header */}
        {!hideHeader && title && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto max-h-[80vh] custom-scrollbar">
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;