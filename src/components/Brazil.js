import React from "react";
import Stats from "../components/Stats";
import useStats from "../hooks/useStats";
import { TwoCols, Row, Separator } from "./StyledStats";
import acronymous from "../db/acronymous";

export default function Brazil() {
  const { stats } = useStats("https://covid-19br.firebaseio.com/data.json");
  const statesData = {};

  if (stats) {
    stats.docs.forEach((city) => {
      const stateIndex = city.state.toUpperCase();
    
      if (statesData[stateIndex]) {
        statesData[stateIndex].confirmed += city.cases;
      } else {
        statesData[stateIndex] = {
          id: city.state,
          name: acronymous[city.state],
          confirmed: city.cases,
        };
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
          Object.values(statesData).sort((a, b) => {
            return b.confirmed - a.confirmed;
          }).map(province => (
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
