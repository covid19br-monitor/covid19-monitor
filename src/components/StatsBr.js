import React from "react";
import { StatGrid, StatBlock } from "../components/StyledStats";

export default function Stats({ data = {} }) {
  const nf = Intl.NumberFormat();
  let totalConfirmed = null;
  let totalDeaths = null;
  
  if (data && Object.values(data).length) {
    totalConfirmed = Object.values(data).map(o => o.confirmed).reduce((prev, next) => prev += next);
    totalDeaths = Object.values(data).map(o => o.deaths).reduce((prev, next) => prev += next);
  } else {
    return <p>Loading...</p>;
  }

  return (
    <>
      <p>
        <small>
          Fonte: <a href="http://brasil.io/" target="blank">brasil.io </a>
        </small>
      </p>
      <StatGrid>
        <StatBlock>
          <p>{nf.format(totalConfirmed)}</p>
          <h3>Confirmados</h3>
        </StatBlock>
        <StatBlock>
          <p>{nf.format(totalDeaths)}</p>
          <h3>Mortos</h3>
        </StatBlock>
      </StatGrid>
    </>
  );
}
