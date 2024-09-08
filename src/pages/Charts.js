import React from "react";
import RadialChart from "../components/RadialChart";
import LineChart from "../components/LineChart";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Charts() {
  return (
    <div className="flex bg-white">
      <div className="w-1/6">
        {" "}
        {/* Adjust the width as needed */}
        <Sidebar />
      </div>

      <div className="flex flex-grow relative flex-col">
        {/* Allow the Navbar to take remaining width */}
        <Navbar />
        <div id="PageContent" className="pt-30 mt-[81.5px]">
          <div id="PageContent" className="overflow-y-auto overflow-x-hidden ">
            <div className="flex py-0 mt-10 mx-10">
              <h5 className="text-2xl pb-4 font-bold leading-none text-gray-700 ">
                Simulation Status
              </h5>
              <div className="group">
                <svg
                  data-popover-target="chart-info"
                  data-popover-placement="bottom"
                  className="w-3.5 h-3.5 text-gray-500 hover:text-gray-900 cursor-pointer ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
                </svg>
                <div
                  id="chart-info"
                  className="absolute z-10 inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 transform scale-0 transform-origin-top-left group-hover:opacity-100 group-hover:scale-100 w-72"
                >
                  <div className="p-3 space-y-2">
                    <h3 className="font-semibold text-gray-900">
                      Simulation - Status
                    </h3>
                    <p>
                      A phishing simulation graph visually presents key data and
                      insights from the simulation in a concise manner. It aids
                      in understanding success rates, vulnerable areas, user
                      behavior, and overall security posture, allowing quick
                      identification of strengths and weaknesses to enhance
                      cybersecurity measures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <LineChart />
              <RadialChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charts;
