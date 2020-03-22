import React from "react";
import Map from "./MapGL";

export default function MapChart() {
  return (
    <>
      <Map lat={-14.2} lng={-51.92} z={3.6} />
    </>
  );
}
