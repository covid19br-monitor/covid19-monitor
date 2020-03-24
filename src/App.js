import React from "react";
import { Router } from "@reach/router";
import useStats from "./hooks/useStats";
import MapChart from "../src/components/MapChart";
import {
  ConfirmedByProvinceChart,
  DetailsChart
} from "../src/components/Charts";
import ConfirmedChart from "../src/components/ConfirmedChart";
import NewCasesChart from "../src/components/NewCasesChart";
import { GlobalStyle } from "../src/components/GlobalStyle";
import DataPanel from "../src/components/DataPanel";
import Nav from "../src/components/Nav";

export default function App() {
  const { stats } = useStats(
    "https://brasil.io/api/dataset/covid19/caso/data?format=json"
  );
  
  return (
    <>
      <GlobalStyle  />
      <main>
        <DataPanel data={stats} />
        <section>
          <Nav />
          <Router>
            <MapChart data={stats} path="/" />
            <ConfirmedChart path="/contagios" />
            <ConfirmedByProvinceChart data={stats} path="/contagios-provincia" />
            <DetailsChart path="/detalles" />
            <NewCasesChart path="/novos-casos" />
          </Router>
        </section>
      </main>
    </>
  );
}
