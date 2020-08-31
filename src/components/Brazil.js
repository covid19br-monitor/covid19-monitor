import React from "react";
import StatsBr from "../components/StatsBr";
import acronymous from "../db/acronymous";

export default function Brazil(props) {
  const stats = props.data;
  const statesData = {};

  if (stats) {
    Object.keys(acronymous).forEach((key) => {
      statesData[key] = {
        id: key,
        name: acronymous[key],
        confirmed: null,
        deaths: null,
      }
    })

    stats.results.forEach((city) => {
      const stateIndex = city.state.toUpperCase();
      
      if (city.is_last) {
        if (city.place_type === 'state') {
          statesData[stateIndex].confirmed = city.confirmed;
          statesData[stateIndex].deaths = city.deaths;
        }
      }
    });
  }

  return (
    <>
      <StatsBr data={statesData} />
    </>
  );
}
