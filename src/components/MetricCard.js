import React from "react";

function MetricCard({ number, link, title }) {
  return (
    <div className="w-full md:w-1/3 xl:w-1/2 p-6 m-10">
      {/* Metric Card */}
      <a href={link}>
        <div className="bg-gradient-to-b from-light-white to-white border-b-4 border-light-white rounded-lg shadow-xl p-5">
          <div className="flex flex-row items-center">
            {/* <div className="flex-shrink pr-4">
              <div className="rounded-full p-5 bg-blue-300">
                <i className="fa fa-desktop" aria-hidden="true"></i>
              </div>
            </div> */}
            <div className="flex-1 text-right md:text-center">
              <h2 className="font-bold uppercase text-gray-600">{title}</h2>
              <p className="font-bold text-3xl">
                {number}
                <span className="text-green-500"></span>
              </p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default MetricCard;
