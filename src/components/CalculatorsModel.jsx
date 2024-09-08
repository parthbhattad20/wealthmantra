import React, { useEffect, useRef } from "react";

const ModalComponent = ({
    isVisible,
    onClose,
    onCalculate,
    inputs,
    handleInputChange,
    children,
}) => {
    const modalRef = useRef(null);

    // Automatically focus on the first input when the modal is opened
    useEffect(() => {
        if (isVisible && modalRef.current) {
            const firstInput = modalRef.current.querySelector("input");
            if (firstInput) firstInput.focus();
        }
    }, [isVisible]);

    // Close modal on pressing "Escape"
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-60 flex justify-center items-center transition-opacity duration-300 ease-in-out">
            <div
                className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out scale-100 opacity-100"
                ref={modalRef}
                style={{
                    animation: isVisible ? "fadeIn 0.3s" : "fadeOut 0.3s",
                }}
            >
                <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
                    WealthMantra Calculator
                </h2>

                {/* Input Fields (Passed through children) */}
                <div className="space-y-4">{children}</div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-8 space-x-4">
                    <button
                        onClick={onCalculate}
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                    >
                        Calculate
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-400 text-white p-3 rounded-lg hover:bg-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalComponent;
