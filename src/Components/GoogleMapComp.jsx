import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  GoogleMap,
  Marker,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Card, Checkbox, Divider, Form, Modal } from "antd";
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
  const [markers, setMarkers] = useState([]);
  const { isLoaded } = useJsApiLoader({
    id: "AIzaSyBIdCLzkLBCvy1qua21hklBXhY_XH2h-IA",
    googleMapsApiKey: "AIzaSyBIdCLzkLBCvy1qua21hklBXhY_XH2h-IA",
  });

  const containerStyle = {
    width: "100vw",
    height: "100vh",
    position: "absolute",
    // marginTop: "50px",
  };

  // const center = ;

  const changeIssueType = (event) => {
    if (event.target.checked) {
      // console.log(event.target["aria-checked"]);
      types.push(event.target["aria-checked"]);
      // console.log(addType);
      // setTypes(addType);
      // setFlag(!flag);
    } else {
      const removeItem = types.indexOf(event.target["aria-checked"]);
      // console.log(removeItem);
      types.splice(removeItem, 1);
      setTypes(types);
      // console.log(types, "dfsdfsdfsdf");
    }
    setFlag(!flag);
  };
  // console.log(types);

  // const coordinates = [
  //   { lat: 21.1458, lng: 72.781 },
  //   { lat: 21.1399, lng: 72.8111 },
  //   { lat: 21.1291, lng: 72.8111 },
  //   { lat: 21.1292, lng: 72.781 },
  // ];
  // const map_theme = [
  //   {
  //     featureType: "all",
  //     elementType: "labels.text",
  //     stylers: [
  //       {
  //         color: "#878787",
  //       },
  //     ],
  //   },
  //   {
  //     featureType: "all",
  //     elementType: "labels.text.stroke",
  //     stylers: [
  //       {
  //         visibility: "off",
  //       },
  //     ],
  //   },
  //   {
  //     featureType: "landscape",
  //     elementType: "all",
  //     stylers: [
  //       {
  //         color: "#f9f5ed",
  //       },
  //     ],
  //   },
  //   {
  //     featureType: "road.highway",
  //     elementType: "all",
  //     stylers: [
  //       {
  //         color: "#f5f5f5",
  //       },
  //     ],
  //   },
  //   {
  //     featureType: "road.highway",
  //     elementType: "geometry.stroke",
  //     stylers: [
  //       {
  //         color: "#c9c9c9",
  //       },
  //     ],
  //   },
  //   {
  //     featureType: "water",
  //     elementType: "all",
  //     stylers: [
  //       {
  //         color: "#aee0f4",
  //       },
  //     ],
  //   },
  // ];
  const map_theme = [
    {
      featureType: "administrative.neighborhood",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "on",
        },
        {
          color: "#e0efef",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "on",
        },
        {
          hue: "#1900ff",
        },
        {
          color: "#c0e8e8",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          lightness: 100,
        },
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#616184",
        },
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#4f44bf",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#083754",
        },
        {
          lightness: "-26",
        },
        {
          gamma: "7.86",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#5d7227",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          visibility: "on",
        },
        {
          saturation: "-43",
        },
        {
          lightness: "55",
        },
        {
          gamma: "1.14",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "geometry.fill",
      stylers: [
        {
          saturation: "-86",
        },
        {
          lightness: "58",
        },
        {
          gamma: "1.14",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          visibility: "on",
        },
        {
          lightness: 700,
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#f84747",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#f64d4d",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#7dcdcd",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#95ace7",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#0079ff",
        },
      ],
    },
  ];

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
        styles: map_theme,
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
                url: `../assets/images/${
                  item.type === "Potholes"
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
              src={`../assets/images/${
                item === "Potholes"
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

        {/* <div className="d-flex align-items-center justify-content-between">
          <Checkbox defaultChecked>Road</Checkbox>
          <img src="../assets/images/road.png" alt="road" />
        </div>
        <br />
        <div className="d-flex align-items-center justify-content-between">
          <Checkbox defaultChecked>Drainage</Checkbox>
          <img src="../assets/images/drain.png" alt="drain" />
        </div>
        <br />
        <div className="d-flex align-items-center justify-content-between">
          <Checkbox defaultChecked>Oil Leakeage</Checkbox>
          <img src="../assets/images/road.png" alt="raod" />
        </div>
        <br /> */}
      </div>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default GoogleMapComp;
// export default GoogleApiWrapper({
//   apiKey: "AIzaSyBIdCLzkLBCvy1qua21hklBXhY_XH2h-IA",
// })(GoogleMapComp);
