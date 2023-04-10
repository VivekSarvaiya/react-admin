import React, { useState } from "react";
import Donut from "../Charts/Donut";
import LineChart from "../Charts/LineChart";
import GoogleMapComp from "../Components/GoogleMapComp";
import Sidebar from "../Components/Sidebar";

function Map(props) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <div className="h-100">
        <Sidebar setClose={setOpen} />
        <GoogleMapComp />
        {/* <div
          style={open ? { margin: "65px 0 0 240px" } : { margin: "65px 0 0 0" }}
        >
        </div> */}
      </div>
    </div>
  );
}

export default Map
