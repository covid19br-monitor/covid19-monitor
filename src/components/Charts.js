import React from "react";
import { HorizontalBar, Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import useStats from "../hooks/useStats";

const ChartSection = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 0.3rem 0.7rem 0;
  display: flex;
  position: relative;
`;

const ChartPieSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 1rem;

  @media (max-width: 960px) {
    padding: 0 1rem 0.4rem;
  }
`;

export function ConfirmedByProvinceChart() {
  const { stats } = useStats("https://covid-19br.firebaseio.com/data.json");
  let sortedProvinces;
  let confirmedByProvince;

  if (stats) {
    const { docs } = stats;

    let values = {};

    docs.map(doc => {
      if (values[doc.state]) {
        values[doc.state] = values[doc.state] + doc.cases;
      } else {
        values[doc.state] = doc.cases;

        console.log(doc);
      }
    });

    const acronymous = {
      AC: "Acre",
      AL: "Alagoas",
      AP: "Amapá",
      AM: "Amazonas",
      BA: "Bahia",
      CE: "Ceará",
      DF: "Distrito Federal",
      ES: "Espírito Santo",
      GO: "Goiás",
      MA: "Maranhão",
      MT: "Mato Grosso",
      MS: "Mato Grosso do Sul",
      MG: "Minas Gerais",
      PA: "Pará",
      PB: "Paraíba",
      PR: "Paraná",
      PE: "Pernambuco",
      PI: "Piauí",
      RJ: "Rio de Janeiro",
      RN: "Rio Grande do Norte",
      RS: "Rio Grande do Sul",
      RO: "Rondônia",
      RR: "Roraima",
      SC: "Santa Catarina",
      SP: "São Paulo",
      SE: "Sergipe",
      TO: "Tocantins"
    };

    let provinces = [];

    for (let [key, value] of Object.entries(values)) {
      provinces.push({
        id: key,
        name: acronymous[key],
        confirmed: value
      });
    }

    sortedProvinces = provinces.sort((a, b) => {
      return b.confirmed - a.confirmed;
    });

    const labels = sortedProvinces.map(province => province.name);
    const confirmedCases = sortedProvinces.map(province => province.confirmed);

    confirmedByProvince = {
      labels: labels,
      datasets: [
        {
          label: "Confirmados",
          backgroundColor: "hsla(163, 72%, 48%, .4)",
          borderColor: "hsla(163, 72%, 48%, 1.0)",
          borderWidth: 1,
          hoverBackgroundColor: "hsla(163, 72%, 48%, .9)",
          hoverBorderColor: "hsla(163, 72%, 48%, 1)",
          data: confirmedCases
        }
      ]
    };
  }

  return (
    <>
      <ChartSection>
        <HorizontalBar
          data={confirmedByProvince ? confirmedByProvince : {}}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: false,
            legend: {
              display: true,
              position: "top",
              fullWidth: true,
              reverse: false,
              labels: {
                fontColor: "hsla(163, 72%, 48%, 1)"
              }
            }
          }}
        />
      </ChartSection>
    </>
  );
}

const data = {
  labels: [
    "Recuperados",
    "Estables/Domicilio",
    "Estables/Hospital",
    "Pronóstico Reservado/Hospital",
    "Fallecidos"
  ],
  datasets: [
    {
      data: [3, 502, 5, 15, 7],
      borderColor: "hsla(164, 23%, 3%, 0.6)",
      backgroundColor: [
        "hsla(163, 72%, 100%, 0.9)",
        "hsla(163, 72%, 48%, 0.7)",
        "hsla(50, 100%, 64%, 0.7)",
        "hsla(25, 100%, 67%, 0.7)",
        "hsla(0, 100%, 67%, 0.7)"
      ],
      hoverBackgroundColor: [
        "hsla(163, 72%, 100%, 1.0)",
        "hsla(163, 72%, 48%, 1.0)",
        "hsla(50, 100%, 64%, 1.0)",
        "hsla(25, 100%, 67%, 1.0)",
        "hsla(0, 100%, 67%, 1.0)"
      ]
    }
  ]
};

export function DetailsChart() {
  return (
    <ChartPieSection>
      <Doughnut
        data={data}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: false,
          legend: {
            display: true,
            position: "top",
            fullWidth: true,
            reverse: false,
            labels: {
              fontColor: "hsla(163, 72%, 48%, 1)"
            }
          }
        }}
      />
    </ChartPieSection>
  );
}
