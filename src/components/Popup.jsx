import React from 'react';

const Popup = ({ isOpen, onClose, inputText }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
                <h2 className="text-xl font-semibold mb-4">Popup Message</h2>
                <p className="text-lg mb-4">{inputText}</p>
                <button
                    type="button"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Popup;
