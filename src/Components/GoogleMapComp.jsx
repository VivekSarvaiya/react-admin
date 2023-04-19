import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Card, Carousel, Checkbox, Divider, Form, Modal, message } from "antd";
import MapTheme from "./MapTheme";
import axios from "axios";
import moment from "moment";

const allTypes = ["Potholes", "Road", "Drainage", "Oil Leakeage"];
function GoogleMapComp(props) {
  const [selectedMarker, setSelectedMarker] = useState("");
  const [open, setOpen] = useState(false);
  const [types, setTypes] = useState([
    "Potholes",
    "Road",
    "Drainage",
    "Oil Leakeage",
  ]);
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState([]);
  const { isLoaded } = useJsApiLoader({
    id: "AIzaSyBIdCLzkLBCvy1qua21hklBXhY_XH2h-IA",
    googleMapsApiKey: "AIzaSyBIdCLzkLBCvy1qua21hklBXhY_XH2h-IA",
  });

  const containerStyle = {
    width: "88%",
    height: "90%",
    position: "absolute",
    // bottom: 0,
    zIndex: 1000000000,
    overflow: "hidden",
    // marginTop: "50px",
  };

  const changeIssueType = (event) => {
    if (event.target.checked) {
      types.push(event.target["aria-checked"]);
    } else {
      const removeItem = types.indexOf(event.target["aria-checked"]);
      types.splice(removeItem, 1);
      setTypes(types);
    }
    setFlag(!flag);
  };

  const getIssues = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/issue/AllIssuesGet/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setData(res.data?.results);
      })
      .catch((err) => {
        console.log(err);
        message.error("Something went wrong while fetching data !");
      });
  };

  const contentStyle = {
    margin: 0,
    height: "80%",
    color: "#364d79",
    lineHeight: "160px",
    textAlign: "center",
  };

  useEffect(() => {
    getIssues();
  }, [flag]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      // mapTypeId="satellite"
      center={{
        lat: 21.2339372,
        lng: 72.811659,
      }}
      // center={coordinates[0]}
      zoom={11}
      options={{
        // mapTypeControlOptions
        mapTypeControlOptions: {
          position: window.google.maps.ControlPosition.BOTTOM_RIGHT,
        },
        fullscreenControlOptions: {
          position: window.google.maps.ControlPosition.BOTTOM_RIGHT,
        },

        fullscreenControl: true,
        styles: MapTheme,
        mapTypeControl: true,
        streetViewControl: false,
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      {data.map((item, index) => {
        if (types.includes(item.issue_type.Issue_Type_Name)) {
          return (
            <Marker
              key={index}
              onClick={() => {
                setSelectedMarker(item);
                setOpen(true);
              }}
              icon={{
                url: `../assets/images/${
                  item.issue_type.Issue_Type_Name === "Potholes"
                    ? "pothole.png"
                    : item.issue_type.Issue_Type_Name === "Drainage"
                    ? "drain1.png"
                    : item.issue_type.Issue_Type_Name === "Road"
                    ? "road2.png"
                    : item.issue_type.Issue_Type_Name === "Oil Leakeage"
                    ? "oil.png"
                    : ""
                }`,
              }}
              position={{
                lat: parseFloat(item?.latitude),
                lng: parseFloat(item?.logitude),
              }}
            />
          );
        } else {
          return null;
        }
      })}
      {selectedMarker && (
        <Modal
          title="Issue Details"
          open={open}
          onCancel={() => setOpen(false)}
          footer={null}
          width={1000}
          zIndex={10000000001}
          style={{
            textTransform: "capitalize",
          }}
        >
          <Card>
            <Carousel autoplay>
              {selectedMarker?.User_Issue_Images.length > 0 ? (
                selectedMarker?.User_Issue_Images.map((elem) => (
                  <div>
                    <img
                      src={elem.image}
                      width="100%"
                      alt=""
                      key={elem.Issue}
                      style={contentStyle}
                    />
                  </div>
                ))
              ) : (
                <div>
                  <h3 style={contentStyle}>No Images Available</h3>
                </div>
              )}
            </Carousel>
            <Form>
              <Form.Item className="mb-3" label="Title">
                {selectedMarker?.issue_title || "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Description">
                {selectedMarker?.User_issue_description || "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Type">
                {selectedMarker?.issue_type?.Issue_Type_Name || "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Created On">
                {moment(selectedMarker?.issue_created_time).format(
                  "MMMM Do YYYY, h:mm:ss a"
                ) || "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Area">
                {selectedMarker?.area?.area_name || "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Landmark">
                {selectedMarker?.landmark || "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Coordinates">
                {selectedMarker?.latitude
                  ? selectedMarker.latitude + " , " + selectedMarker.logitude
                  : "N/A"}
              </Form.Item>

              {/* <Form.Item className="mb-3" label="Site Videos">
                {selectedMarker?.User_Issue_Videos.length > 0
                  ? selectedMarker?.User_Issue_Videos.map((elem) => (
                      <img
                        src={elem.video}
                        width="100%"
                        alt=""
                        key={elem.Issue}
                      />
                    ))
                  : "N/A"}
              </Form.Item> */}
              <Form.Item className="mb-3" label="No. of Votes">
                {selectedMarker?.issue_votes}
              </Form.Item>
            </Form>
          </Card>
        </Modal>
      )}
      <div className="box selectElement p-2">
        <span>Types of Issues</span>
        <Divider className="my-3" />
        {allTypes.map((item, index) => (
          <div className=" my-2 d-flex align-items-center justify-content-between">
            <Checkbox
              defaultChecked
              onChange={changeIssueType}
              aria-checked={item}
            >
              {item}
            </Checkbox>
            <img
              src={`../assets/images/${
                item === "Potholes"
                  ? "potholes.png"
                  : item === "Drainage"
                  ? "drainage.png"
                  : item === "Road"
                  ? "road-100.png"
                  : item === "Oil Leakeage"
                  ? "oil2.png"
                  : ""
              }`}
              width={30}
              alt={item}
            />
          </div>
        ))}
      </div>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default GoogleMapComp;
