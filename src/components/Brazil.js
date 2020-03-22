import React from "react";
import data from "../db/BrazilData";
import Stats from "../components/Stats";
import { StatGrid, StatBlock, TwoCols, Row, Separator } from "./StyledStats";

export default function Brazil() {
  const provinces = data;
  const sortedProvinces = provinces.sort((a, b) => {
    return b.confirmed - a.confirmed;
  });

  return (
    <>
      <Stats url="https://covid19.mathdro.id/api/countries/brazil" />
      <br />
      <h4>Estados / Confirmados</h4>
      <br />
      <TwoCols>
        {sortedProvinces.map(province => (
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
