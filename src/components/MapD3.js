import React from "react";
import * as d3 from "d3";
import * as topojson from "topojson";

import brazilStates from "../db/br-states.json";
import brazilData from "../db/BrazilData";

const tooltipStyle = {
  position: "absolute",
  transform: "translate(-50%, -110%)",
  padding: "10px",
  background: "rgba(000,000,000,0.9)",
  color: "#fff",
  fontSize: "0.7em",
  pointerEvents: "none",
  minWidth: "200px",
  opacity: 0
};

const mapWrapperStyle = {
  position: "relative"
};

const statesFeatures = topojson.feature(
  brazilStates,
  brazilStates.objects.estados
);
const statesContour = topojson.mesh(brazilStates, brazilStates.objects.estados);

const maxConfirmed = Math.max.apply(
  Math,
  brazilData.map(function(o) {
    return o.confirmed;
  })
);

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.mapWrapper = React.createRef();
    this.tooltip = React.createRef();
    this.projection = null;
    this.svg = null;
    this.g = null;
    this.width = 0;
    this.height = 0;
  }

  _mouseleave = d => {
    this.tooltip.current.style.opacity = 0;
  };

  _mouseover = d => {
    this.tooltip.current.style.opacity = 1;
  };

  _mousemove = function(mouse, d) {
    const data = brazilData.find(o => o.name === d.properties.nome);
    this.tooltip.current.style.left = mouse[0] + "px";
    this.tooltip.current.style.top = mouse[1] + "px";
    this.tooltip.current.innerHTML = `${d.properties.nome}
      <br>Confirmados: ${data.confirmed}
      <br>Mortes: ${data.deaths}
    `;
  };

  _setTooltipPosition = (mouse, feature) => {
    this.tooltip.current.style.left = mouse[0];
    this.tooltip.current.style.top = mouse[1];
  };

  colorScale = d3
    .scaleLinear()
    .range(["#ffc2c2", "#860000"])
    .domain([0, maxConfirmed / 2, maxConfirmed])
    .interpolate(d3.interpolateLab);

  _fill = feature => {
    const state = brazilData.find(
      state => state.name === feature.properties.nome
    );
    return this.colorScale(state.confirmed);
  };

  _zoomed = () => {
    this.g.attr("transform", d3.event.transform);
  };

  _build = () => {
    this.width = this.mapWrapper.current.offsetWidth;
    this.height = this.mapWrapper.current.parentNode.offsetHeight;

    this.svg.attr("width", this.width).attr("height", this.height);

    this.projection = d3
      .geoMercator()
      .translate([this.width / 2, this.height / 2.5]);

    const bounds = d3.geoBounds(statesFeatures);
    const center = d3.geoCentroid(statesFeatures);

    // Compute the angular distance between bound corners
    const distance = d3.geoDistance(bounds[0], bounds[1]);
    const scale = (this.height / distance) * 1.2;

    // Update the projection scale and centroid
    this.projection.scale(scale).center(center);

    const that = this;
    const path = d3.geoPath().projection(this.projection);

    if (this.g) this.g.remove();

    this.g = this.svg.append("g");

    this.g.on("mouseleave", this._mouseleave);

    this.g
      .selectAll(".estado")
      .data(statesFeatures.features)
      .enter()
      .append("path")
      .attr("fill", this._fill)
      .attr("d", path)
      .on("mouseover", this._mouseover)
      .on("mousemove", function(d) {
        const mouse = d3.mouse(this);
        that._mousemove(mouse, d);
      });

    this.g
      .append("path")
      .datum(statesContour)
      .attr("d", path)
      .attr("fill", "none")
      .attr("vector-effect", "non-scaling-stroke")
      .attr("stroke", "#666");
  };

  componentDidMount() {
    this.width = this.mapWrapper.current.offsetWidth;
    this.height = this.mapWrapper.current.parentNode.offsetHeight;

    this.svg = d3
      .select(this.mapWrapper.current)
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    this._build();

    this.svg.call(
      d3
        .zoom()
        .translateExtent([
          [0, 0],
          [this.width, this.height]
        ])
        .scaleExtent([1, 5])
        .on("zoom", this._zoomed)
    );

    window.addEventListener("resize", this._build);
  }

  render() {
    return (
      <div ref={this.mapWrapper} style={mapWrapperStyle}>
        <div ref={this.tooltip} style={tooltipStyle} />
      </div>
    );
  }
}

export default Map;
