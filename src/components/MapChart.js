import React from "react";
import Map from "./MapD3";

export default function MapChart(props) {
  return (
    <>
      <Map data={props.data}  />
    </>
  );
}
