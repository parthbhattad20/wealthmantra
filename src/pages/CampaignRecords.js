import React, { useEffect, useState } from "react";
import RadialChart from "../components/RadialChart";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router";
import axios from "axios";
import { useAuth } from "../utils/auth";
import config from "../config/config";
import { saveAs } from 'file-saver';
import PieChart from "../components/PieChart";
import RadialChartRecords from "../components/RadialChartRecords";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faClock, faUser, faEnvelope, faFileAlt } from "@fortawesome/free-regular-svg-icons";
const CAMPAIGNRECORDDETAILURL = `${config.apiBaseUrl}dashboard/startpage`;
const DEVICESURL = `${config.apiBaseUrl}dashboard/devices`;

function CampaignRecords() {
  const { id } = useParams();
  const auth = useAuth();
  const [campaignDetails, setCampaignDetails] = useState();
  const [adminName, setAdminName] = useState();
  const [readDevices, setReadDevices] = useState([]);
  const [phishedDevices, setPhishedDevices] = useState([]);
  const [chunkId, setChunkId] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const data = {
        id: `${auth.user.id}`,
        chunkId: `${1}`,
        campaign_id: `${id}`,
      };
      try {
        const response = await axios.get(CAMPAIGNRECORDDETAILURL, {
          params: data,
          headers: { authorization: auth.user.token },
        });

        // response.data.campaign_id = id;
        setCampaignDetails(response.data);
      } catch (err) {
        console.error("Error:", err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = {
        id: `${auth.user.id}`,
        chunkId: `${chunkId}`,
        campaign_id: `${id}`,
      };
      try {
        const response = await axios.get(DEVICESURL, {
          params: data,
          headers: { authorization: auth.user.token },
        });
        setPhishedDevices(response.data.phishedDevices);
        setReadDevices(response.data.readDevice);
        // const x = {
        //   readDevice: [
        //     {
        //       user_activity_read_device: "WINDOWS",
        //       count: 1,
        //     },
        //     {
        //       user_activity_read_device: "Iphone",
        //       count: 10,
        //     },
        //     {
        //       user_activity_read_device: "test1",
        //       count: 7,
        //     },
        //   ],
        //   phishedDevices: [
        //     {
        //       user_activity_phished_device: "WINDOWS",
        //       count: 1,
        //     },
        //     {
        //       user_activity_phished_device: "MACOS",
        //       count: 10,
        //     },
        //     {
        //       user_activity_phished_device: "test1",
        //       count: 2,
        //     },
        //     {
        //       user_activity_phished_device: "test2",
        //       count: 5,
        //     },
        //     {
        //       user_activity_phished_device: "test3",
        //       count: 1,
        //     },
        //   ],
        // };
        // setPhishedDevices(x.phishedDevices);
        // setReadDevices(x.readDevice);
      } catch (err) {
        console.error("Error:", err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${config.apiBaseUrl}get/admin`, {
          headers: { authorization: auth.user.token },
        });
        setAdminName(response.data.name);
      } catch (err) {
        console.error("Error:", err);
      }
    }

    fetchData();
  }, []);

  const exportData = async () => {
    try {
      const response = await axios.get(`${config.apiBaseUrl}generate/excel?campaign_id=${id}`, {
        headers: { authorization: auth.user.token },
        responseType: 'blob'
      });
      //NOTE: Cannot save to a specified location due to restrictions on file API
      saveAs(response.data, 'generated_excel.xlsx');
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const exportPDF = async () => {
    try {
      const response = await axios.get(`${config.apiBaseUrl}generate/pdf?campaign_id=${id}`, {
        headers: { authorization: auth.user.token },
        responseType: 'blob'
      });
      //NOTE: Cannot save to a specified location due to restrictions on file API
      saveAs(response.data, 'generated_pdf.pdf');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex bg-white">
      <div className="w-60">
        <Sidebar />
      </div>
      <div className="flex flex-grow relative flex-col">
        <Navbar />
        <div id="PageContent" className="pt-30 mt-[81.5px]">
          <div id="PageContent" className="overflow-y-auto overflow-x-hidden ">
            <div className="flex p-3 space-x-1 items-center">

              {/* Button for PDF report download */}
              <button onClick={() => { exportPDF() }} className="ml-auto focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">
                Export PDF Report
              </button>

              {/* Button for Excel report download */}
              <button onClick={() => { exportData() }} className="ml-auto focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">
                Export Excel Report
              </button>

            </div>
            <div className="px-5">
              <h1 className="text-2xl text-center font-bold">
                Campaign Details
              </h1>
              <hr className="h-0.5 my-3 bg-gray-700  rounded dark:bg-gray-700" />
              <div className="flex w-full px-5 py-2 mx-5 gap-20 place-content-center">

                <div className="flex flex-col p-10 w-4/12 border-solid border-gray-400 shadow-lg rounded-lg bg-blue-100 transition align-center duration-300 cursor-pointer">
                  {/* Section 1 */}
                  <div className="flex items-center px-5 flex-1 border-b border-solid border-gray-400 pb-5">
                    <FontAwesomeIcon icon={faFlag} className="text-2xl mr-3" />
                    <div className="px-5">
                      <div className="text-2xl">
                        {campaignDetails ? campaignDetails.campaignName : ""}
                      </div>
                      <div className="text-1rem text-gray-500">Campaign Name</div>
                    </div>
                  </div>

                  {/* Section 2 */}
                  <div className="flex items-center px-5 flex-1 border-b border-solid border-gray-400 pb-5">
                    <FontAwesomeIcon icon={faClock} className="text-2xl mr-3" />
                    <div className="px-5">
                      <div className="text-2xl">
                        {campaignDetails ? campaignDetails.campaignTimestamp.split("T")[0] : ""}
                      </div>
                      <div className="text-1rem text-gray-500">Campaign Timestamp</div>
                    </div>
                  </div>

                  {/* Section 3 */}
                  <div className="flex items-center px-5 text-left flex-1 border-b border-solid border-gray-400 pb-5">
                    <FontAwesomeIcon icon={faUser} className="text-2xl mr-3" />
                    <div className="px-5">
                      <div className="text-2xl">
                        {adminName}
                      </div>
                      <div className="text-1rem text-gray-500">Sender name</div>
                    </div>
                  </div>

                  {/* Section 4 */}
                  <div className="flex items-center px-5 flex-1 border-b border-solid border-gray-400 pb-5">
                    <FontAwesomeIcon icon={faEnvelope} className="text-2xl mr-3" />
                    <div className="px-5">
                      <div className="text-2xl">
                        {campaignDetails ? campaignDetails.campaignEnvelopeEmailId : ""}
                      </div>
                      <div className="text-1rem text-gray-500">Sender email address</div>
                    </div>
                  </div>

                  {/* Section 5 */}
                  <div className="flex px-5 items-center flex-1">
                    <FontAwesomeIcon icon={faFileAlt} className="text-2xl mr-3" />
                    <div className="px-5">
                      <div className="text-2xl">
                        {campaignDetails ? campaignDetails.campaignSubject : ""}
                      </div>
                      <div className="text-1rem text-gray-500">Email subject</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-100 rounded-lg border border-blue-100 p-4 m-2 shadow-lg">
                  <div className="bg-blue-100 thumbnail-container rounded-lg border p-4 w-96 overflow-hidden">
                    {campaignDetails && (
                      <img
                        src={`data:image/png;base64,${campaignDetails.imageData}`}
                        alt="template"
                        className="object-cover rounded-lg border border-gray-300"
                      />
                    )}
                    <div className="pt-8">
                      <h5 className="mb-2 text-4xl tracking-tight text-gray-500 dark:text-gray-900">
                        {campaignDetails ? campaignDetails.templateName : ""}
                      </h5>
                      <p className="text-gray-700 dark:text-gray-500 pl-1">
                        {"Template"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5">
              <h1 className="text-2xl text-center font-bold text-gray-700">
                User Details
              </h1>
              <hr className="h-0.5 my-3 bg-gray-700 border-0 rounded dark:bg-gray-700" />
              <table className="w-full text-sm text-left text-gray-500 m-2 p-2">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr className="text-center">
                    <th scope="col" className="px-4 py-3">
                      {" "}
                      Name{" "}
                    </th>
                    <th scope="col" className="px-4 py-3">
                      {" "}
                      Email{" "}
                    </th>
                    <th scope="col" className="px-4 py-3">
                      {" "}
                      Department{" "}
                    </th>
                    <th scope="col" className="px-4 py-3">
                      {" "}
                      Location{" "}
                    </th>
                    <th scope="col" className="px-4 py-3">
                      {" "}
                      Opened Device{" "}
                    </th>
                    <th scope="col" className="px-4 py-3">
                      {" "}
                      Clicked Device{" "}
                    </th>
                    <th scope="col" className="px-4 py-3 bg-[#7cb4fc]">
                      {" "}
                      Sent{" "}
                    </th>
                    <th scope="col" className="px-4 py-3 bg-[#64e4a4]">
                      {" "}
                      Opened{" "}
                    </th>
                    <th scope="col" className="px-4 py-3 bg-[#f4bc54]">
                      {" "}
                      Clicked{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* <UserData users={users}/> */}
                  {campaignDetails?.campaignUsers.length > 0 &&
                    campaignDetails?.campaignUsers.map((curUser) => {
                      return (
                        <tr
                          key={curUser.id}
                          className="bg-white border-b hover:bg-gray-100 text-center"
                        >
                          <td className="px-3 py-4">{curUser.name}</td>
                          <td className="px-3 py-4">{curUser.email}</td>
                          <td className="px-3 py-4">{curUser.department}</td>
                          <td className="px-3 py-4">{curUser.location}</td>
                          <td className="px-3 py-4">
                            {curUser.openedDevice === null
                              ? "None"
                              : curUser.openedDevice}
                          </td>
                          <td className="px-3 py-4">
                            {curUser.clickedDevice === null
                              ? "None"
                              : curUser.clickedDevice}
                          </td>
                          <td className="px-3 py-4">
                            {curUser.sent === 1 ? "✅" : "❌"}
                          </td>
                          <td className="px-3 py-4">
                            {curUser.opened === 1 ? "✅" : "❌"}
                          </td>
                          <td className="px-3 py-4">
                            {curUser.clicked === 1 ? "✅" : "❌"}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="p-5">
              <h1 className="text-2xl text-center font-bold text-gray-700">
                Campaign Stats
              </h1>
              <hr className="h-0.5 my-3 bg-gray-700 border-0 rounded dark:bg-gray-700" />
              <div className="flex p-3 my-10 justify-center">
                <RadialChartRecords campaign_id={id} />
                {readDevices && readDevices.length > 0 ? (
                  <PieChart Devices={readDevices} Type={"Opened"} />
                ) : (
                  null
                )}
                {phishedDevices && phishedDevices.length > 0 ? (
                  <PieChart Devices={phishedDevices} Type={"Clicked"} />
                ) : (
                  null
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignRecords;
