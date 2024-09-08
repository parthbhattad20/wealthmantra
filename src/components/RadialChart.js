import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Dropdown from "./DropDown";
import axios from "axios";
import { useAuth } from "../utils/auth";
import config from "../config/config";

const STATS_URL = `${config.apiBaseUrl}dashboard/stats`;
const CAMPAIGN_URL = `${config.apiBaseUrl}dashboard/campaigns`;
function RadialChart({ campaign_id }) {
  const [series, setSeries] = useState([0, 0, 0]);
  const [absolutes, setAbsolutes] = useState([0, 0, 0]);
  const [pieDropdown, setPieDropdown] = useState(0);

  const options = {
    chart: {
      height: 350,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        data: { strokeWidth: 10 },
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
            formatter: function (val, state) {
              var percentage = (val / state.config.series[0]) * 100;
              return `${percentage.toFixed(2)}%`; // Display the value in percentage
            },
          },
          total: {
            show: true,
            label: "Sent",
            formatter: function (state) {
              if (state.config.series[0] === 0) {
                return "NA";
              }
              return `${state.config.series[0]}%`;
            },
          },
        },
      },
    },
    labels: ["Sent", "Opened", "Clicked"],
    legend: {
      show: true,
    },
  };
  const [optionsState, setOptionsState] = useState(options);

  useEffect(() => {
    axios({
      method: "get",
      url: campaign_id ? CAMPAIGN_URL : STATS_URL,
      params: data,
      headers: { authorization: auth.user.token },
    })
      .then((response) => {
        let totalSent = 0;
        let totalClicked = 0;
        let totalOpened = 0;
        let total = 0;
        if (campaign_id) {
          totalSent = parseInt(response.data[0].sent);
          totalClicked = parseInt(response.data[0].clicked);
          totalOpened = parseInt(response.data[0].open);
          total = totalSent;
        } else {
          totalSent = parseInt(response.data.totalSent);
          totalClicked = parseInt(response.data.totalClicked);
          totalOpened = parseInt(response.data.totalOpened);
          total = totalSent;
        }

        setAbsolutes([totalSent, totalClicked, totalOpened]);
        if (total !== 0) {
          setSeries([
            (totalSent / total) * 100,
            (totalClicked / total) * 100,
            (totalOpened / total) * 100,
          ]);
        } else {
          setSeries([0, 0, 0]);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, [pieDropdown]);

  const mapPieDropDown = {
    0: 7,
    1: 30,
    2: 90,
  };
  const auth = useAuth();
  var data;
  if (campaign_id) {
    data = {
      days: `${mapPieDropDown[pieDropdown]}`,
      campaign_id: `${campaign_id}`,
      chunkId: `${1}`,
    };
  } else {
    data = { days: `${mapPieDropDown[pieDropdown]}` };
  }
  useEffect(() => {
    axios({
      method: "get",
      url: campaign_id ? CAMPAIGN_URL : STATS_URL,
      params: data,
      headers: { authorization: auth.user.token },
    })
      .then((response) => {
        let totalSent = 0;
        let totalClicked = 0;
        let totalOpened = 0;
        let total = 0;
        if (campaign_id) {
          totalSent = parseInt(response.data[0].sent);
          totalClicked = parseInt(response.data[0].clicked);
          totalOpened = parseInt(response.data[0].open);
          total = totalSent;
        } else {
          totalSent = parseInt(response.data.totalSent);
          totalClicked = parseInt(response.data.totalClicked);
          totalOpened = parseInt(response.data.totalOpened);
          total = totalSent;
        }
        setAbsolutes([totalSent, totalClicked, totalOpened]);

        if (total !== 0) {
          setSeries([
            (totalSent / total) * 100,
            (totalClicked / total) * 100,
            (totalOpened / total) * 100,
          ]);
        } else {
          setSeries([0, 0, 0]);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, [pieDropdown]);
  useEffect(() => {
    setOptionsState({
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          data: { strokeWidth: 10 },
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
              formatter: function (val, state) {
                var percentage = (val / state.config.series[0]) * 100;
                return `${percentage.toFixed(2)}%`;
              },
            },
            total: {
              show: true,
              label: "Sent",
              formatter: function (state) {
                if (state.config.series[0] === 0) {
                  return "NA";
                }
                return `${state.config.series[0]}%`;
              },
            },
          },
        },
      },
      labels: ["Sent", "Opened", "Clicked"],
      legend: {
        show: true,
      },
    });
  }, [series]);

  return (
    <div
      id="Radialchart"
      className="w-1/2 rounded-lg shadow-xl mx-10 border-2 "
    >
      <div className="px-6 py-0 my-0 mx-10">
        <Dropdown
          labels={{
            0: "Last 7 days",
            1: "Last 30 days",
            2: "Last 90 days",
          }}
          option={pieDropdown}
          setOption={setPieDropdown}
        />
      </div>

      <ReactApexChart
        options={optionsState}
        series={series}
        type="radialBar"
        height={350}
      />
      <div className="px-6 py-0 my-0 mx-10">
        {/* Links to Sent,Clicked,Opened */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="grid grid-cols-3 gap-3 mb-2">
            <dl className="bg-orange-50 rounded-lg flex flex-col items-center justify-center h-[88px]">
              <dt className="w-8 h-8 rounded-full bg-orange-100 text-orange-500 text-sm font-medium flex items-center justify-center mb-1">
                {absolutes[2]}
              </dt>
              <dd className="text-orange-500 text-sm font-medium">Clicked</dd>
            </dl>

            <dl className="bg-teal-50 rounded-lg flex flex-col items-center justify-center h-[88px]">
              <dt className="w-8 h-8 rounded-full bg-teal-100 text-teal-500 text-sm font-medium flex items-center justify-center mb-1">
                {absolutes[1]}
              </dt>
              <dd className="text-teal-500 text-sm font-medium">Opened</dd>
            </dl>

            <dl className="bg-blue-50 rounded-lg flex flex-col items-center justify-center h-[88px]">
              <dt className="w-8 h-8 rounded-full bg-blue-100 text-blue-500 text-sm font-medium flex items-center justify-center mb-1">
                {absolutes[0]}
              </dt>
              <dd className="text-blue-500 text-sm font-medium">Total Sent</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RadialChart;
