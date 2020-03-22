import React from "react";
import data from "../db/BrazilData";
import { StatGrid, StatBlock, TwoCols, Row, Separator } from "./StyledStats";

export default function Brazil() {
  const provinces = data;
  const sortedProvinces = provinces.sort((a, b) => {
    return b.confirmed - a.confirmed;
  });

  const dataTotals = {
    confirmed: 1178,
    deaths: 18,
    surveillance: 1213,
    suspicious: 870,
    negatives: 649,
    recoveries: 2,
    tests: 2051
  };

  var result = (dataTotals.confirmed / dataTotals.tests) * 100;

  return (
    <>
      <p>
        <small>
          Última atualização: 21.03 | Fonte:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://g1.globo.com/bemestar/coronavirus/noticia/2020/03/21/casos-de-coronavirus-no-brasil-em-21-de-marco.ghtml"
          >
            Globo
          </a>
        </small>
      </p>
      <StatGrid>
        <StatBlock className="warning">
          <p>{dataTotals.confirmed}</p>
          <h3>Confirmados</h3>
        </StatBlock>
        <StatBlock className="danger">
          <p>{dataTotals.deaths}</p>
          <h3>Mortos</h3>
        </StatBlock>
        <StatBlock>
          <p>{dataTotals.recoveries}</p>
          <h3>Recuperados</h3>
        </StatBlock>
      </StatGrid>
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
