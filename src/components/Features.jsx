import React from 'react';
import {
  FaShieldAlt,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaUserShield,
  FaEye,
  FaFileSignature
} from 'react-icons/fa';

export const Features = () => {
  return (
    <div>
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-12">
            Why Choose Us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaClipboardCheck color="#0D47A1" className="w-8 h-8 text-primary-600" />}
              title="Drive security awareness"
              description="Train staff on modern security best practices through engaging security
              awareness courses."
            />

            <FeatureCard
              icon={<FaShieldAlt color="#0D47A1" className="w-8 h-8 text-primary-600" />}
              title="Demonstrate compliance"
              description="Showcase your compliance efforts with real-time reporting on how your
              business is addressing human risk."
            />

            <FeatureCard
              icon={<FaExclamationTriangle color="#0D47A1" className="w-8 h-8 text-primary-600" />}
              title="Reduce human error"
              description="Educate staff on how to avoid common mishaps like sending sensitive data
                to the wrong person."
            />

            <FeatureCard
              icon={<FaUserShield color="#0D47A1" className="w-8 h-8 text-primary-600" />}
              title="Combat phishing attacks"
              description="Empower users with the ability to spot, avoid, and report even the most
                sophisticated phishing attacks."
            />

            <FeatureCard
              icon={<FaEye color="#0D47A1" className="w-8 h-8 text-primary-600" />}
              title="Safeguard exposed users"
              description="Reduce the chances of an attack by detecting when user credentials are
                stolen and exposed on the dark web."
            />

            <FeatureCard
              icon={<FaFileSignature color="#0D47A1" className="w-8 h-8 text-primary-600" />}
              title="Implement security standards"
              description="Keep staff well-versed on company security procedures with core policy
                templates and trackable approvals."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900">
        {title}
      </h3>
      <p className="text-sm md:text-base text-center text-gray-600 text-justify">
        {description}
      </p>
    </div>
  );
};
