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

class NewCasesChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valuesArray: [],
      loading: true
    };
  }

  componentDidUpdate() {
    if (this.state.loading && this.props.dailyData) {
      const datesArray = getDates(new Date("02/26/2020"), new Date());
      let newCasesArray = [];

      const valuesStateArray = Object.values(this.props.dailyData);

      datesArray.map((value, index) => {
        if (index === 0) {
          newCasesArray[index] = valuesStateArray[index];
        }

        newCasesArray[index] =
          valuesStateArray[index] - valuesStateArray[index - 1];
      });

      this.setState({
        valuesArray: newCasesArray,
        loading: false
      });

      this.chartReference && this.chartReference.chartInstance.update();
    }
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
  }

  render() {
    const datesArray = getDates(new Date("02/26/2020"), new Date());

    const confirmed = {
      labels: datesArray.map(date => date.displayFormat),
      datasets: [
        {
          label: "Novos casos",
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

export default NewCasesChart;
