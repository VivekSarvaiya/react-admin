import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/system";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/userContext";
import Donut from "../Charts/Donut";
import ReactApexChart from "react-apexcharts";
import Donut2 from "../Charts/Donut2";

function Dashboard(props) {
  const [open, setOpen] = useState(true);
  const nav = useNavigate();
  const { authState } = useContext(AuthContext);
  const [users, setUsers] = useState("")
  const [staff, setStaff] = useState("")
  const [issues, setIssues] = useState("")
  // localStorage.setItem("URL", window.location.pathname);
  const fetchUsers = () => {
    console.log("asdjashdashbdhasb");
    // debugger
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/UserAllDetails`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
    })
      .then((res) => {
        console.log("asdjashdashbdhasb");
        console.log(res, "users");
        setUsers(res.data?.count)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchStaff = () => {

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/StaffAllDetails`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      })
      .then((res) => {
        console.log(res);
        setStaff(res.data?.count)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const fetchIssues = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/issue/AllIssuesGet/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setIssues(res.data?.count)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchUsers()
    fetchStaff()
    fetchIssues()
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
      <div style={{
        margin: "24px 16px",
        padding: 24,
      }}>


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
              <Box sx={{ fontSize: 34, fontWeight: "medium" }}>{users}</Box>
              <Box
                sx={{
                  color: "darkgreen",
                  display: "inline",
                  fontWeight: "bold",
                  mx: 0.5,
                  fontSize: 14,
                }}
              >
                Number of current users
              </Box>
              {/* <Box
                sx={{
                  color: "",
                  display: "inline",
                  fontSize: 14,
                }}
              >
                vs. last week
              </Box> */}
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
              <Box sx={{ fontSize: 34, fontWeight: "medium" }}>{staff} </Box>

              <Box
                sx={{
                  color: "darkgreen",
                  display: "inline",
                  fontWeight: "bold",
                  mx: 0.5,
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
              <Box sx={{ color: "grey" }}>Issues</Box>
              <Box sx={{ fontSize: 34, fontWeight: "medium" }}>{issues}</Box>
              <Box
                sx={{
                  color: "darkgreen",
                  display: "inline",
                  fontWeight: "bold",
                  mx: 0.5,
                  fontSize: 14,
                }}
              >
                Issues reported till date
              </Box>
              {/* <Box
                sx={{
                  color: "text.secondary",
                  display: "inline",
                  fontSize: 14,
                }}
              >
                vs. last week
              </Box> */}
            </Box>
            {/* <Box
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
            </Box> */}
          </div>
        </div>
        <div className="p-4 px-2">
          {/* <ReactApexChart
            className="chart-body"
            options={options}
            series={series}
            type="area"
            height={350}
            width="100%"
          /> */}

          <div className="d-flex gap-5 mt-4">

            <Donut />
            <Donut2 />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
