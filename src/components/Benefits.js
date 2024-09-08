// Benefits.js

import React from 'react';
import BenefitCard from './BenefitCard';

function Benefits() {
  const benefits = [
    {
      title: "DRIVE SECURITY AWARENESS",
      details: "Train staff on modern security best practices through engaging security awareness courses. Ensure they understand the importance of protecting sensitive information and how to recognize and respond to security threats."
    },
    {
      title: "DEMONSTRATE COMPLIANCE",
      details: "Showcase your compliance efforts with real-time reporting on how your business is addressing human risk. Implement policies and procedures to meet regulatory requirements and industry standards, demonstrating a commitment to protecting customer data and maintaining trust."
    },
    {
      title: "REDUCE HUMAN ERROR",
      details: "Educate staff on how to avoid common mishaps like sending sensitive data to the wrong person. Implement training programs and technologies that help employees recognize potential risks and take appropriate action to mitigate them, reducing the likelihood of costly errors."
    },
    {
      title: "COMBAT PHISHING ATTACKS",
      details: "Empower users with the ability to spot, avoid and report even the most sophisticated phishing attacks. Provide ongoing training and awareness programs to educate employees about the latest phishing techniques and how to protect themselves and the organization from cyber threats."
    },
    {
      title: "SAFEGUARD EXPOSED USERS",
      details: "Reduce the chances of an attack by detecting when user credentials are stolen and exposed on the dark web. Implement security solutions that monitor for compromised credentials and provide real-time alerts, allowing you to take proactive measures to protect affected users and systems."
    },
    {
      title: "IMPLEMENT SECURITY STANDARDS",
      details: "Keep staff well-versed on company security procedures with core policy templates and trackable approvals. Develop and enforce security policies that align with industry best practices and regulatory requirements, ensuring consistency and accountability across the organization."
    }
  ];

  return (
    <div className='h-auto mb-20 bg-white' id='why-us-section'>
      <div className="text-center  pt-6 font-sans font-semibold text-custom-blue text-4xl rounded-md  ">
        Why Choose us
      </div>
      <div className="container mx-auto px-6 pt-6" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} title={benefit.title} details={benefit.details} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Benefits;
