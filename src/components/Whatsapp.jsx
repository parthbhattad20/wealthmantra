import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppIcon = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center">
      {/* Popping Headline */}
      <div className="mb-4">
        <h3 className="text-white text-lg font-extrabold bg-green-500 px-4 py-2 rounded-lg shadow-lg animate-bounce glow-effect">
          Join us
        </h3>
      </div>
      {/* WhatsApp Icon */}
      <a
        href="https://chat.whatsapp.com/J4RDYAllFrrKdE29VXFhXR"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
      >
        <FaWhatsapp className="text-3xl" />
      </a>
    </div>
  );
};

export default WhatsAppIcon;
