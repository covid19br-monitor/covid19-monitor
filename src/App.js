import React from "react";
import { Router } from "@reach/router";
import { useState } from "react";
import MapChart from "../src/components/MapChart";
import { ConfirmedByProvinceChart } from "../src/components/Charts";
import ConfirmedChart from "../src/components/ConfirmedChart";
import NewCasesChart from "../src/components/NewCasesChart";
import ProjectionsChart from "../src/components/ProjectionsChart";
import { GlobalStyle } from "../src/components/GlobalStyle";
import DataPanel from "../src/components/DataPanel";
import Nav from "../src/components/Nav";

export default function App() {
  const [data, setData] = useState("");
  const [dailyData, setdailyData] = useState("");
  const [projectionData, setProjectionData] = useState("");

  async function getData() {
    const response = await fetch(
      "https://brasil.io/api/dataset/covid19/caso/data?format=json"
    );
    const data = await response.json();
    setData(data);
  }

  async function getDailyData() {
    const response = await fetch(
      `https://covid-19br.firebaseio.com/daily.json`
    );
    const data = await response.json();
    setdailyData(data);
  }

  async function getProjectionData() {
    const response = await fetch(
      `https://api.myjson.com/bins/1ddqtw`
    );
    const data = await response.json();
    setProjectionData(data);
  }

  if (!data) {
    getData();
  }

  if (!dailyData) {
    getDailyData();
  }

  if (!projectionData) {
    getProjectionData();
  }

  return (
    <>
      <GlobalStyle />
      <main>
        <DataPanel data={data} />
        <section>
          <Nav />
          <Router>
            <MapChart data={data} path="/" />
            <ConfirmedChart dailyData={dailyData} path="/contagios" />
            <ConfirmedByProvinceChart data={data} path="/contagios-provincia" />
            <NewCasesChart dailyData={dailyData} path="/novos-casos" />
            <ProjectionsChart dailyData={dailyData} projectionData={projectionData} path="/projecoes" />
          </Router>
        </section>
      </main>
    </>
  );
}
