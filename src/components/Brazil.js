import React from "react";
import Stats from "../components/Stats";
import useStats from "../hooks/useStats";
import { TwoCols, Row, Separator } from "./StyledStats";
import acronymous from "../db/acronymous";

export default function Brazil() {
  const { stats } = useStats("https://covid-19br.firebaseio.com/data.json");
  let sortedProvinces;

  if (stats) {
    const { docs } = stats;

    let values = {};

    docs.map(doc => {
      if (values[doc.state]) {
        values[doc.state] = values[doc.state] + doc.cases;
      } else {
        values[doc.state] = doc.cases;

        console.log(doc);
      }
    });

    let provinces = [];

    for (let [key, value] of Object.entries(values)) {
      provinces.push({
        id: key,
        name: acronymous[key],
        confirmed: value
      });
    }

    sortedProvinces = provinces.sort((a, b) => {
      return b.confirmed - a.confirmed;
    });
  }

  return (
    <>
      <Stats url="https://covid19.mathdro.id/api/countries/brazil" />
      <br />
      <h4>Estados / Confirmados</h4>
      <br />
      <TwoCols>
        {sortedProvinces &&
          sortedProvinces.map(province => (
            <Row key={province.id}>
              <span>{province.name}</span>
              <Separator />
              <span>{province.confirmed}</span>
            </Row>
          ))}
      </TwoCols>
      <hr />
    </>
  );
}
