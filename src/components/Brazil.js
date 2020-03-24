import React from "react";
import Stats from "../components/Stats";
import useStats from "../hooks/useStats";
import { TwoCols, Row, Separator } from "./StyledStats";
import acronymous from "../db/acronymous";

export default function Brazil() {
  const { stats } = useStats(
    "https://brasil.io/api/dataset/covid19/caso/data?format=json"
  );
  const statesData = {};

  if (stats) {
    stats.results.forEach(dataPoint => {
      const stateIndex = dataPoint.state.toUpperCase();

      if (dataPoint.is_last && dataPoint.place_type === "state") {
        if (statesData[stateIndex]) {
          statesData[stateIndex].confirmed += dataPoint.confirmed;
        } else {
          statesData[stateIndex] = {
            id: dataPoint.state,
            name: acronymous[dataPoint.state],
            confirmed: dataPoint.confirmed
          };
        }
      }
    });
  }

  return (
    <>
      <Stats url="https://covid19.mathdro.id/api/countries/brazil" />
      <br />
      <h4>Estados / Confirmados</h4>
      <br />
      <TwoCols>
        {statesData &&
          Object.values(statesData)
            .sort((a, b) => {
              return b.confirmed - a.confirmed;
            })
            .map(province => (
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
