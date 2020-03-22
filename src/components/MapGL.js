import React, { useState } from "react";
import ReactMapGL, { Source, Layer, Marker } from "react-map-gl";
import data from "../db/BrazilData";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const provinces = data;
const sortedProvinces = provinces.sort((a, b) => {
  return b.confirmed - a.confirmed;
});

let confirmedProvinces = [];

sortedProvinces.forEach(province => {
  if (province.confirmed > 0) {
    confirmedProvinces.push(province);
  }
});

export default function Map({ lat, lng, z }) {
  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: lng,
    zoom: z,
    bearing: 0,
    pitch: 0
  });

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/juanmnl/ck7spea0200we1inzkgusnusr"
      onViewportChange={setViewport}
      mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
    >
      {confirmedProvinces.map(point => {
        return (
          <Marker
            key={point.name}
            latitude={point.coord.lat}
            longitude={point.coord.lng}
          >
            <svg
              className="on"
              width={point.status === "alert" ? "80" : "40"}
              height={point.status === "alert" ? "80" : "40"}
              viewBox={point.status === "alert" ? "0 0 100 100" : "0 0 40 40"}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx={point.status === "alert" ? "50" : "20"}
                cy={point.status === "alert" ? "50" : "20"}
                r={point.status === "alert" ? "50" : "20"}
                fill={
                  point.status === "alert"
                    ? "hsla(0, 100%, 67%, 8.0)"
                    : "hsla(50, 100%, 54%, 8.0)"
                }
                fillOpacity="0.6"
              />
              <text
                x={point.status === "alert" ? "50" : "20"}
                y={point.status === "alert" ? "55" : "25"}
                fontFamily="sans-serif"
                fontSize={point.status === "alert" ? "18px" : "16px"}
                fill="black"
                textAnchor="middle"
              >
                {point.confirmed}
              </text>
            </svg>
          </Marker>
        );
      })}
    </ReactMapGL>
  );
}
