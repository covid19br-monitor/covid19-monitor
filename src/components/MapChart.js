import React from "react";
import Map from "./MapGL";
import SubScreen from "./SubScreen";

export default function MapChart() {
  return (
    <>
      <SubScreen />
      <Map lat={-14.2} lng={-51.92} z={3.7} />
    </>
  );
}
