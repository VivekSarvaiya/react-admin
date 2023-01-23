import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
function LineChart(props) {
  const options = {
    series: [
      {
        name: "users",
        data: [45, 66, 88, 31, 17, 46, 26, 57],
      },
    ],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: true,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Issues Reported",
      align: "center",
      color: "red",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  };
  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={options.series}
            type="line"
            width="500"
          />
        </div>
      </div>
    </div>
  );
}

export default LineChart;
