import React from "react";

const Testimonials = ({ testimonial }) => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg my-8">
      <div className="flex items-center">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-16 h-16 rounded-full border-2 border-blue-500"
        />
        <div className="ml-4">
          <h4 className="text-xl font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-sm text-gray-600">{testimonial.position}</p>
        </div>
      </div>
      <p className="mt-4 text-gray-700 text-lg leading-relaxed">
        "{testimonial.quote}"
      </p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">{testimonial.company}</span>
        <span className="text-xs text-gray-400">{testimonial.date}</span>
      </div>
    </div>
  );
};

export default Testimonials;
