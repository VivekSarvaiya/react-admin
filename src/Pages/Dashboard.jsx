import React, { useState } from "react";
import { Box } from "@mui/system";
import GoogleMapComp from "../Components/GoogleMapComp";
import Sidebar from "../Components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
function Dashboard(props) {
  const [open, setOpen] = useState(true);
  localStorage.setItem("URL", window.location.pathname);
  return (
    <div>
      <div className="h-100">
        <Sidebar setClose={setOpen} />
        <GoogleMapComp />
        <div
          style={open ? { margin: "68px 0 0 240px" } : { margin: "68px 0 0 0" }}
        >
          <div style={{ position: "relative" }}>
            {/* <span className="page-title mx-5">Users</span> */}
            <div className="d-flex mx-5 gap-2 ">
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
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
