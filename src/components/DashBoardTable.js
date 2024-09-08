import React, { useEffect } from "react";
import Dropdown from "./DropDown";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../utils/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config/config";
const SIMULATIONTABLE_URL = `${config.apiBaseUrl}dashboard/campaigns`;
const RESEND_URL = `${config.apiBaseUrl}campaign/startCampaign`;
const DUPLICATEANDRESEND_URL = `${config.apiBaseUrl}campaign/duplicateAndStartCampaign`;

const DashBoardTable = () => {
  var [tableData, setTableData] = useState();
  var [completeTableData, setCompleteTableData] = useState();
  const [filterDropdown, setfilterDropdown] = useState(0);
  const [tableChunkId, setTableChunkId] = useState(1);
  const [chunkSize, setChunkSize] = useState(1);

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const data = { id: `${auth.user.id}`, chunkId: `${tableChunkId}` };
    axios({
      method: "get",
      url: SIMULATIONTABLE_URL,
      params: data,
      headers: { authorization: auth.user.token },
    })
      .then((response) => {
        const dataSorted = response.data.campaign;
        setTableData(dataSorted);
        setCompleteTableData(dataSorted);

        if (response.data.pages !== -1) {
          setChunkSize(response.data.pages);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, [tableChunkId]);

  useEffect(() => {
    if (completeTableData) {
      const filteredData = completeTableData.filter((item) => {
        if (filterDropdown === 0) {
          return true; // Show all data
        } else if (filterDropdown === 1) {
          return item.status_ === "Pending";
        } else if (filterDropdown === 2) {
          return item.status_ === "Finished";
        }
      });
      setTableData(filteredData);
    }
  }, [filterDropdown]);

  const handleResend = async (campaign_id) => {
    try {
      const data = { campaign_id: `${campaign_id}` };
      const response = await axios({
        method: "POST",
        url: RESEND_URL,
        headers: {
          authorization: auth.user.token,
        },
        data: data,
      });
      toast.success("Emails sent!");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDuplicateAndResend = async (campaign_id) => {
    try {
      const data = { campaign_id: `${campaign_id}` };
      const response = await axios({
        method: "POST",
        url: DUPLICATEANDRESEND_URL,
        headers: {
          authorization: auth.user.token,
        },
        data: data,
      });
      if (response) {
        toast.success("Emails sent!");
        //refresh the page contents
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="px-6 py-0 my-0 mx-10">
      <div className="w-full place-center relative overflow-x-auto shadow-md sm:rounded-lg content-center m-2 border-2">
        <div className="flex">
          <Dropdown
            labels={{
              0: "All",
              1: "Pending",
              2: "Finished",
            }}
            option={filterDropdown}
            setOption={setfilterDropdown}
          />
          <div className="flex content-center space-x-3 items-center px-4 ml-auto">
            <div>Page:</div>
            <div>
              <button
                onClick={() => {
                  if (tableChunkId > 1) {
                    setTableChunkId(tableChunkId - 1);
                  }
                }}
                disabled={tableChunkId <= 1}
              >
                <FontAwesomeIcon icon={faCircleArrowLeft} size="xl" />
              </button>
            </div>

            <div className="font-small text-gray-500 whitespace-nowra">
              {tableChunkId}/{chunkSize}
            </div>
            <div>
              <button
                onClick={() => {
                  if (tableChunkId < chunkSize) {
                    setTableChunkId(tableChunkId + 1);
                  }
                }}
                disabled={tableChunkId >= chunkSize}
              >
                <FontAwesomeIcon icon={faCircleArrowRight} size="xl" />
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-2/3">
          <table className="w-full text-sm text-left text-gray-500 m-2 p-2">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Simulation
                </th>
                <th scope="col" className="px-4 py-3">
                  Date
                </th>
                <th scope="col" className="px-4 py-3">
                  Subject
                </th>
                <th scope="col" className="px-4 py-3">
                  Status
                </th>
                <th scope="col" className="px-4 py-3">
                  Sent
                </th>
                <th scope="col" className="px-4 py-3">
                  Opened
                </th>
                <th scope="col" className="px-4 py-3">
                  Clicked
                </th>
                <th scope="col" className="px-4 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData &&
                tableData.map((row) => (
                  <tr
                    key={row.campaign_id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <th
                      scope="row"
                      className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap transition-color duration-300 hover:text-blue-500"
                      onClick={() =>
                        navigate(`/campaignrecords/${row.campaign_id}`)
                      }
                    >
                      {row.campaign}
                    </th>
                    <td className="px-3 py-4">
                      {row.CamapignTimestamp.split("T")[0]}
                    </td>
                    <td className="px-3 py-4">{row.subject}</td>

                    <td className="px-3 py-4">{row.status_}</td>
                    <td className="px-3 py-4">{row.sent}</td>
                    <td className="px-3 py-4">{row.open}</td>
                    <td className="px-3 py-4">{row.clicked}</td>
                    <td className="px-4 py-4">
                      {row.status_ === "Finished" ? (
                        <button
                          className="mx-auto focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2 w-[100%]"
                          type="button"
                          onClick={() => {
                            handleDuplicateAndResend(row.campaign_id);
                          }}
                        >
                          Resend
                        </button>
                      ) : (
                        <button
                          className="ml-auto focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 w-[100%]"
                          type="button"
                          onClick={() => {
                            handleResend(row.campaign_id);
                          }}
                        >
                          Retry
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashBoardTable;
