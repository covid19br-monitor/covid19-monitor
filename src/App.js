import React from "react";
import { Router } from "@reach/router";
import { useState } from "react";
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
  const [data, setData] = useState('');

  if (!data) {
    getData();
  }
  
  async function getData() {
    const response = await fetch('https://brasil.io/api/dataset/covid19/caso/data?format=json');
    const data = await response.json();
    setData(data);
  }

  return (
    <>
      <GlobalStyle  />
      <main>
        <DataPanel data={data} />
        <section>
          <Nav />
          <Router>
            <MapChart data={data} path="/" />
            <ConfirmedChart path="/contagios" />
            <ConfirmedByProvinceChart data={data} path="/contagios-provincia" />
            <DetailsChart path="/detalles" />
            <NewCasesChart path="/novos-casos" />
          </Router>
        </section>
      </main>
    </>
  );
}
