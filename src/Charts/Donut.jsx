import React from "react";
import ReactApexChart from "react-apexcharts";

function Donut(props) {
  const options = {
    series: [44, 55, 13, 43, 22, 50],
    chart: {
      width: 380,
      type: "pie",
    },
    theme: {
      mode: "light",
      palette: "palette3",
      monochrome: {
        enabled: false,
        color: "#255aee",
        shadeTo: "light",
        shadeIntensity: 0.65,
      },
    },
    labels: ["Karatgam", "Varachha", "Adajan", "vesu", "Amroli", "Dumas"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 180,
            height: 180,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <ReactApexChart
            options={options}
            series={options.series}
            type="donut"
            width="500"
          />
        </div>
      </div>
    </div>
  );
}

export default Donut;
