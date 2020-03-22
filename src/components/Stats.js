import React from "react";
import useStats from "../hooks/useStats";
import { StatGrid, StatBlock } from "../components/StyledStats";

export default function Stats({ url }) {
  const nf = Intl.NumberFormat();
  const { stats, loading, error } = useStats(url);
  function formatDate(date) {
    const day = date.getDate().toString(),
      finalDay = day.length === 1 ? "0" + day : day,
      month = (date.getMonth() + 1).toString(),
      finalMonth = month.length === 1 ? "0" + month : month,
      finalYear = date.getFullYear();
    return finalDay + "/" + finalMonth + "/" + finalYear;
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;
  return (
    <>
      <p>
        <small>
          Última atualização: <em>{formatDate(new Date(stats.lastUpdate))}</em>
        </small>
      </p>
      <StatGrid>
        <StatBlock>
          <p>{nf.format(stats.confirmed.value)}</p>
          <h3>Confirmados</h3>
        </StatBlock>
        <StatBlock>
          <p>{nf.format(stats.deaths.value)}</p>
          <h3>Mortos</h3>
        </StatBlock>
        <StatBlock>
          <p>{nf.format(stats.recovered.value)}</p>
          <h3>Recuperados</h3>
        </StatBlock>
      </StatGrid>
    </>
  );
}
