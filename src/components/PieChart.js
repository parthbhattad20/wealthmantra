import React from "react";
import ReactApexChart from "react-apexcharts";

function PieChart({ Devices, Type }) {
  var chartData;
  if (Type === "Clicked") {
    chartData = Devices.map((device) => ({
      label: device.user_activity_phished_device,
      count: device.count,
    }));
  } else {
    chartData = Devices.map((device) => ({
      label: device.user_activity_read_device,
      count: device.count,
    }));
  }

  const series = chartData.map((data) => data.count);
  const labels = chartData.map((data) => data.label);
  const options = {
    labels: labels,
    plotOptions: {
      pie: {
        size: 400,
      },
    },
  };

  return (
    <div className="rounded-lg shadow-xl mx-5 w-1/3 h-1/2 my-auto py-auto">
      <h3 className="text-sm text-center text-gray-700 pt-6">{Type} Devices</h3>
      <div className="flex flex-col justify-around">
        <ReactApexChart options={options} series={series} type="pie" />
      </div>
    </div>
  );
}

export default PieChart;
