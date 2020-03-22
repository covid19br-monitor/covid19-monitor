import React from "react";
import useStats from "../hooks/useStats";
import { StatGrid, StatBlock } from "../components/StyledStats";

export default function Stats({ url }) {
  const nf = Intl.NumberFormat();
  const { stats, loading, error } = useStats(url);
  function formatDate(date) {
    let day = date.getDate().toString(),
      finalDay = day.length === 1 ? "0" + day : day,
      month = (date.getMonth() + 1).toString(),
      finalMonth = month.length === 1 ? "0" + month : month,
      finalYear = date.getFullYear(),
      hour = date.getUTCHours(),
      minutes = date.getUTCMinutes();

    if (hour < 10) {
      hour = "0" + hour;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return `${finalDay}/${finalMonth}/${finalYear} ${hour}:${minutes}`;
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
