import React, { useState } from "react";
import Donut from "../Charts/Donut";
import LineChart from "../Charts/LineChart";
import Sidebar from "../Components/Sidebar";

function Reports(props) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <div className="h-100">
        <Sidebar setClose={setOpen} />
        <div
          //   className="content-bg"
          style={open ? { margin: "65px 0 0 240px" } : { margin: "65px 0 0 0" }}
        >
          <div className="p-4">
            {/* <h2 className="text-center">Issues Posted Data</h2> */}
            <div className="d-flex">
              <LineChart />
              <Donut />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
