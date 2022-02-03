import React from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import { Typography } from "antd";

const { Text } = Typography;

const AnyReactComponent = ({ $hover, text }) => {
  return (
    <div
      className="marker"
      style={{
        height: "50px",
        width: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        backgroundColor: "white",
        textAlign: "center",
        border: `10px solid ${$hover ? "red" : "grey"}`,
      }}
    >
      <Text>{text}</Text>
    </div>
  );
};

const Mapper = ({
  markers = [],
  setMarkers = () => {},
  selectedMarker = [],
  setSelectedMarker = () => {},
}) => {
  console.log(markers);
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        //   bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
        defaultCenter={{
          lat: 60,
          lng: 18,
        }}
        defaultZoom={11}
        yesIWantToUseGoogleMapApiInternals
      >
        {/* <AnyReactComponent lat={60} lng={18} text="My Marker" /> */}
        {markers?.map((marker) => (
          <AnyReactComponent
            key={`${marker?.lat}-${marker?.lng}`}
            lat={marker?.lat}
            lng={marker?.lng}
            text={marker?.title}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};
Mapper.propTypes = {
  baseControls: PropTypes.object,
  setBaseControls: PropTypes.func,
  markers: PropTypes.array,
  setMarkers: PropTypes.func,
  selectedMarker: PropTypes.array,
  setSelectedMarker: PropTypes.func,
};

export default Mapper;
