import React from "react";
import { useState, useEffect } from "react";
import Dropdown from "./DropDown";
import ReactApexChart from "react-apexcharts";
import { useAuth } from "../utils/auth";
import axios from "axios";
import config from "../config/config";

const LINECHART_URL = `${config.apiBaseUrl}dashboard/lineChart`;

function LineChart({ campaign_id }) {
  const auth = useAuth();
  const [lineDropdown, setLineDropdown] = useState(0);
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Sent",
        data: [],
      },
      {
        name: "Opened",
        data: [],
      },
      {
        name: "Clicked",
        data: [],
      },
    ],
    // colors:['#000000', '#E91E63', '#9C27B0'],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "date",
        categories: [],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
      },
    },
  });
  const maplineDropDown = {
    0: 7,
    1: 30,
    2: 90,
  };
  useEffect(() => {
    async function fetchData() {
      var data;
      if (campaign_id) {
        data = {
          days: `${maplineDropDown[lineDropdown]}`,
          campaign_id: `${campaign_id}`,
        };
      } else {
        data = { days: `${maplineDropDown[lineDropdown]}` };
      }

      try {
        const response = await axios.get(LINECHART_URL, {
          params: data,
          headers: { authorization: auth.user.token },
        });

        if (Array.isArray(response.data)) {
          var clicked = [];
          var open = [];
          var sent = [];
          var dates = [];

          response.data.forEach((element) => {
            clicked.push(parseInt(element["clicked"]));
            open.push(parseInt(element["open"]));
            sent.push(parseInt(element["sent"]));
            const date = new Date(element["date"]);
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${
              date.getFullYear() % 100
            }`;
            dates.push(formattedDate);
          });
          const updatedChartData = {
            series: [
              {
                name: "Sent",
                data: sent,
              },
              {
                name: "Opened",
                data: open,
              },
              {
                name: "Clicked",
                data: clicked,
              },
            ],
            options: {
              chart: {
                height: 350,
                type: "area",
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: "smooth",
              },
              xaxis: {
                type: "date",
                categories: dates,
              },
              tooltip: {
                x: {
                  format: "yy/MM/dd",
                },
              },
            },
          };

          setChartData(updatedChartData);
        } else {
          console.error("Response is not an array:", response);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [lineDropdown]);

  return (
    <div id="LineChart" className="rounded-lg shadow-lg mx-10 border-2">
      <div className="px-6 py-0 my-0 mx-10">
        <Dropdown
          labels={{
            0: "Last 7 days",
            1: "Last 30 days",
            2: "Last 90 days",
          }}
          option={lineDropdown}
          setOption={setLineDropdown}
        />
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
}

export default LineChart;
