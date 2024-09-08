import React, { useState } from "react";

const Dropdown = ({ labels, option, setOption }) => {
  var [selectedDays, setSelectedDays] = useState(Object.keys(labels)[option]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const Labels = labels;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDaySelect = (days) => {
    setSelectedDays(days);
    setOption(days);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center pt-5">
        <button
          className="text-md font-medium text-gray-500 hover:text-gray-900 text-center inline-flex items-center hover:bg-gray-100 px-4 py-2 rounded-lg"
          onClick={toggleDropdown}
        >
          {Labels[selectedDays]}
          <svg
            className={`w-2.5 m-2.5 ml-1.5 ${
              isDropdownOpen ? "transform rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-fit mt-[140px]">
            <ul
              className="py-2 text-sm text-gray-700"
              aria-labelledby="dropdownDefaultButton"
            >
              {Object.entries(Labels).map(([days, label]) => (
                <li key={days}>
                  <button
                    className={`block px-4 py-2 hover:bg-gray-100 ${
                      selectedDays === parseInt(days) ? "font-semibold" : ""
                    }`}
                    onClick={() => handleDaySelect(parseInt(days))}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
