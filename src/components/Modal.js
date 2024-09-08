import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function Modal({ isVisible, onClose, children }) {
  if (!isVisible) return null;
  const handleClose = (e) => {
    if (e.target.id === "wrapper" && onClose) onClose();
    e.stopPropagation();
  };
  return (
    <div
      className="fixed z-50 inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[600px] flex flex-col">
        {onClose && (
          <button onClick={() => onClose()} className="place-self-end">
            <FontAwesomeIcon
              icon={faClose}
              className="text-white hover:text-black text-xl"
            />
          </button>
        )}
        <div className="bg-white p-2 rounded">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
