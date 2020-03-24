import React from "react";
import { Router } from "@reach/router";
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
  return (
    <>
      <GlobalStyle />
      <main>
        <DataPanel />
        <section>
          <Nav />
          <Router>
            <MapChart path="/" />
            <ConfirmedChart path="/contagios" />
            <ConfirmedByProvinceChart path="/contagios-provincia" />
            <DetailsChart path="/detalles" />
            <NewCasesChart path="/novos-casos" />
          </Router>
        </section>
      </main>
    </>
  );
}
