import React from 'react';
import { Router } from '@reach/router';
import MapChart from '../src/components/MapChart';
import {
  ConfirmedChart,
  ConfirmedByProvinceChart,
  DetailsChart
} from '../src/components/Charts';
import { GlobalStyle } from '../src/components/GlobalStyle';
import DataPanel from '../src/components/DataPanel';
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
          </Router>
        </section>
      </main>
    </>
  );
}
