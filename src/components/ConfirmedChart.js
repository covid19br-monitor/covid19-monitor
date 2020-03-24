import React from "react";
import styled from "styled-components";
import { getDates } from "../utils/dateUtils";
import { Bar } from "react-chartjs-2";

const ChartSection = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 0.3rem 0.7rem 0;
  display: flex;
  position: relative;
`;

class ConfirmedChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valuesArray: []
    };
  }

  componentDidMount() {
    const datesArray = getDates(new Date("02/26/2020"), new Date());

    let valuesStateArray = Object.assign(this.state.valuesArray);

    datesArray.map(async date => {
      const value = await fetch(
        `https://covid19.mathdro.id/api/daily/${date.apiFormat}`
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          return data.filter(country => country.countryRegion === "Brazil")[0];
        })
        .catch(error => {
          return { confirmed: 0 };
        });

      valuesStateArray.push(parseInt(value && value.confirmed, 10));

      if (datesArray.indexOf(date) === datesArray.length - 1) {
        valuesStateArray = valuesStateArray.sort((a, b) => a - b);

        this.setState({
          valuesArray: valuesStateArray
        });

        this.chartReference && this.chartReference.chartInstance.update();
      }
    });
  }

  render() {
    const datesArray = getDates(new Date("02/26/2020"), new Date());

    const confirmed = {
      labels: datesArray.map(date => date.displayFormat),
      datasets: [
        {
          label: "Confirmados",
          type: "line",
          pointBorderColor: "hsla(163, 72%, 48%, 1.0)",
          pointBackgroundColor: "hsla(163, 72%, 48%, 0.7)",
          backgroundColor: "hsla(163, 72%, 48%, .4)",
          borderColor: "hsla(163, 72%, 48%, 1.0)",
          borderWidth: 1,
          hoverBackgroundColor: "hsla(163, 72%, 48%, .9)",
          hoverBorderColor: "hsla(163, 72%, 48%, 1)",
          pointRadius: 6,
          pointStyle: "mitter",
          showLines: false,
          lineTension: 0.4,
          data: this.state.valuesArray
        }
      ]
    };
    return (
      <>
        <ChartSection>
          <Bar
            data={confirmed}
            width={100}
            height={50}
            ref={reference => (this.chartReference = reference)}
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
              },
              scales: {
                yAxes: [
                  {
                    // type: 'logarithmic'
                  }
                ]
              }
            }}
          />
        </ChartSection>
      </>
    );
  }
}

export default ConfirmedChart;
