import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/system";
import GoogleMapComp from "../Components/GoogleMapComp";
import Sidebar from "../Components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/userContext";
import LineChart from "../Charts/LineChart";
import Donut from "../Charts/Donut";
import ReactApexChart from "react-apexcharts";

function Dashboard(props) {
  const [open, setOpen] = useState(true);
  const nav = useNavigate();
  const { authState } = useContext(AuthContext);
  localStorage.setItem("URL", window.location.pathname);

  useEffect(() => {
    console.log(authState);
  }, []);

  const series = [
    {
      name: "Reported Issues",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "Resolved Issues",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
    {
      name: "Rejected Issues",
      data: [25, 22, 17, 20, 21, 15, 10],
    },
  ];
  const options = {
    chart: {
      height: 350,
      width: "100%",
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return (
    <>
      <div>
        <div className="d-flex gap-2 py-4">
          <Box
            sx={{
              bgcolor: "#ffffff",
              boxShadow: 2,
              borderRadius: 2,
              p: 2,
              width: 300,
            }}
            className="selectElement"
          >
            <Box sx={{ color: "grey" }}>Users</Box>
            <Box sx={{ fontSize: 34, fontWeight: "medium" }}>98,369</Box>
            <Box
              sx={{
                color: "darkgreen",
                display: "inline",
                fontWeight: "bold",
                mx: 0.5,
                fontSize: 14,
              }}
            >
              +18.77%
            </Box>
            <Box
              sx={{
                color: "",
                display: "inline",
                fontSize: 14,
              }}
            >
              vs. last week
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: "#ffffff",
              boxShadow: 2,
              borderRadius: 2,
              p: 2,
              width: 300,
            }}
            className="selectElement"
          >
            <Box sx={{ color: "grey" }}>Staff</Box>
            <Box sx={{ fontSize: 34, fontWeight: "medium" }}>128 </Box>

            <Box
              sx={{
                color: "text.secondary",
                display: "inline",
                fontSize: 14,
              }}
            >
              Active Staff Members
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: "#ffffff",
              boxShadow: 2,
              borderRadius: 2,
              p: 2,
              width: 300,
            }}
            className="selectElement"
          >
            <Box sx={{ color: "grey" }}>Reported Issues</Box>
            <Box sx={{ fontSize: 34, fontWeight: "medium" }}>56,756</Box>
            <Box
              sx={{
                color: "darkgreen",
                display: "inline",
                fontWeight: "bold",
                mx: 0.5,
                fontSize: 14,
              }}
            >
              +18.77%
            </Box>
            <Box
              sx={{
                color: "text.secondary",
                display: "inline",
                fontSize: 14,
              }}
            >
              vs. last week
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: "#ffffff",
              boxShadow: 2,
              borderRadius: 2,
              p: 2,
              width: 300,
            }}
            className="selectElement"
          >
            <Box sx={{ color: "grey" }}>Solved Issues</Box>
            <Box sx={{ fontSize: 34, fontWeight: "medium" }}>15,460</Box>
            <Box
              sx={{
                color: "darkgreen",
                display: "inline",
                fontWeight: "bold",
                mx: 0.5,
                fontSize: 14,
              }}
            >
              +18.77%
            </Box>
            <Box
              sx={{
                color: "text.secondary",
                display: "inline",
                fontSize: 14,
              }}
            >
              vs. last week
            </Box>
          </Box>
        </div>
      </div>
      <div className="p-4 px-2">
        <ReactApexChart
          className="chart-body"
          options={options}
          series={series}
          type="area"
          height={350}
        />

        <div className="d-flex justify-content-around mt-5">
          {/* <LineChart /> */}
          <Donut />
          <Donut />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
