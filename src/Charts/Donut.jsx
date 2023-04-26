import { Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

function Donut(props) {
  const [labels, setLabels] = useState([])
  const [load, setLoad] = useState(false)

  const [areas, setAreas] = useState([])
  const [users, setUsers] = useState([])

  const fetchAreaDetails = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL
        }/api/details/areaDetail/${localStorage.getItem("CITY_ID")}`
      )
      .then((res) => {
        setAreas(res.data.results);
        console.log(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUsersPerArea = () => {
    let arr = []
    setLoad(true)
    // debugger
    console.log(areas, "areas");
    areas?.forEach((area) => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/UserAllDetails?search=${area?.area_name}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      }).then((res) => {
        console.log(res.data, "area");
        arr.push(res.data.count)
        // setData(res.data?.results);
        setLoad(false);
      }).catch((err) => {
        console.log(err);
        // message.error("Something went wrong while fetching data !");
        setLoad(false);
      });
    })
    setUsers(arr)
  }

  const getAreaLabels = () => {
    let arr = []
    console.log(users, areas);
    areas?.map((item) => arr.push(item?.area_name))
    setLabels(arr)
  }

  useEffect(() => {
    fetchAreaDetails()
    getUsersPerArea()
    setTimeout(() => {
      getAreaLabels()
    }, 1000);

  }, [])
  const options = {
    series: props.users,
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
    labels: labels,
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
  if (load) {
    // {load && (
    <Spin
      tip="Loading..."
      style={{
        justifyContent: "center",
        display: "flex",
        padding: "20px 0px",
        position: "absolute",
        left: "50%",
        top: "50%"
      }}
    ></Spin>
    // )}
  }
  return (
    <div className="row">
      <div className="mixed-chart chart-body">
        <h3>Area wise users</h3>
        <ReactApexChart
          className=""
          options={options}
          series={options.series}
          type="donut"
          width="500"
        />
      </div>
    </div>
  );
}

export default Donut;
