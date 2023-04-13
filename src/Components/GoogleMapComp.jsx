import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Card, Checkbox, Divider, Form, Modal } from "antd";
import MapTheme from "./MapTheme"

const allTypes = ["Potholes", "Road", "Drainage", "Oil Leakeage"];
function GoogleMapComp(props) {
  const [selectedMarker, setSelectedMarker] = useState("");
  const [open, setOpen] = useState(false);
  const [types, setTypes] = useState(["Potholes", "Road", "Drainage", "Oil Leakeage"]);
  const [flag, setFlag] = useState(false);
  const [markers, setMarkers] = useState([]);
  const { isLoaded } = useJsApiLoader({
    id: "AIzaSyBIdCLzkLBCvy1qua21hklBXhY_XH2h-IA",
    googleMapsApiKey: "AIzaSyBIdCLzkLBCvy1qua21hklBXhY_XH2h-IA",
  });

  const containerStyle = {
    width: "85%",
    height: "85%",
    position: "absolute",
    // bottom: 0,
    zIndex: 100000000000,
    overflow: "hidden"
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

  useEffect(() => {
    setMarkers([
      {
        name: "Railway Station",
        type: "Drainage",
        location: {
          lat: 21.1266,
          lng: 72.8312,
        },
      },
      {
        name: "Katargam",
        type: "Road",
        location: {
          lat: 21.2339372,
          lng: 72.811659,
        },
      },
      {
        name: "Adajan",
        type: "Potholes",
        location: {
          lat: 21.228125,
          lng: 72.833771,
        },
      },
      {
        name: "varachha",
        type: "Oil Leakeage",
        location: {
          lat: 21.1959,
          lng: 72.7933,
        },
      },
    ]);
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
      {markers.map((item, index) => {
        if (types.includes(item.type)) {
          return (
            <Marker
              key={index}
              onClick={() => {
                setSelectedMarker(item);
                setOpen(true);
              }}
              icon={{
                // url: "../assets/images/potholes.png",
                url: `../assets/images/${item.type === "Potholes"
                  ? "pothole.png"
                  : item.type === "Drainage"
                    ? "drain1.png"
                    : item.type === "Road"
                      ? "road2.png"
                      : item.type === "Oil Leakeage"
                        ? "road2.png"
                        : ""
                  }`,
              }}
              position={item.location}
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
          style={{
            textTransform: "capitalize",
          }}
        >
          <Card>
            <Form.Item label="Name">{selectedMarker.name}</Form.Item>
            <Form.Item label="Lattitude">
              {selectedMarker.location.lat}
            </Form.Item>
            <Form.Item label="Longitude">
              {selectedMarker.location.lng}
            </Form.Item>
            <Form.Item label="Type of Issue">{selectedMarker.type}</Form.Item>
            <Form.Item label="Address">{selectedMarker.address}</Form.Item>
            <Form.Item label="City">{selectedMarker.city}</Form.Item>
            <Form.Item label="Joining Date">{selectedMarker.jdate}</Form.Item>
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
              src={`../assets/images/${item === "Potholes"
                ? "potholes.png"
                : item === "Drainage"
                  ? "drainage.png"
                  : item === "Road"
                    ? "road-100.png"
                    : item === "Oil Leakeage"
                      ? "road-100.png"
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
