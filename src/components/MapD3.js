import React from "react";
import * as d3 from 'd3';
import * as topojson from 'topojson';

import brazilStates from "../db/br-states.json";
import data from "../db/BrazilData";

const states = data.map((state) => state.name);

const _fill = (feature) => {
  const stateIndex = states.findIndex((state) => state === feature.properties.nome);
  if (stateIndex === -1) console.log(feature.properties.nome);
}

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.map = React.createRef();
  }

  componentDidMount() {
    const width = 600;
    const height = 600;

    const projection = d3.geoMercator()
      .scale(650)
      .center([-52, -15])
      .translate([width / 2, height / 2]);
    
    const path = d3.geoPath().projection(projection);

    const states = topojson.feature(brazilStates, brazilStates.objects.estados);
    const states_contour = topojson.mesh(brazilStates, brazilStates.objects.estados);

    const svg = d3.select(this.map.current).append("svg")
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g");

    svg.call(d3.zoom().on("zoom", () => {
      g.attr("transform", d3.event.transform);
    }));
  
    g.selectAll(".estado")
      .data(states.features)
      .enter()
      .append("path")
      .attr("fill", _fill)
      .attr("d", path);
    
    g.append("path")
      .datum(states_contour)
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", '#000');
  }

  render() {
    return <div ref={this.map} />;
  }
}

export default Map;
