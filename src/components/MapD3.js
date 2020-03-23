import React from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import brazilStates from "../db/br-states.json";
import brazilCities from '../db/brazil-cities.json';

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

const mapOptions = {
  position: "absolute",
  top: 0,
  right: '1rem',
  fontSize: '0.6em',
  textTransform: 'uppercase',
};

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.mapWrapper = React.createRef();
    this.tooltip = React.createRef();
    this.projection = null;
    this.svg = null;
    this.g = null;
    this.zoom = null;
    this.width = 0;
    this.height = 0;
    this.citiesData = {};
    this.statesData = {};
    this.showCities = false;
    this.maxConfirmed = 0;
  }

  _mouseleave = d => {
    this.tooltip.current.style.opacity = 0;
  };

  _mouseover = d => {
    if (this.showCities) return;
    this.tooltip.current.innerHTML = `${d.properties.nome}
    <br>Confirmados: ${d.value}`;
    
    this.tooltip.current.style.opacity = 1;
  };

  _mouseoverCity = d => {
    if (!this.showCities) return;
    this.tooltip.current.innerHTML = `${d.data.city_name} - ${d.data.state}
    <br>Confirmados: ${d.data.cases}`;
    
    this.tooltip.current.style.opacity = 1;
  };

  _mousemoveCity = function(mouse, d) {
    this.tooltip.current.style.left = mouse[0] + "px";
    this.tooltip.current.style.top = mouse[1] + "px";
    this.tooltip.current.innerHTML = `${d.data.city_name}
      <br>Confirmados: ${d.data.cases}`;
  };

  _setTooltipPosition = (mouse, feature) => {
    this.tooltip.current.style.left = mouse[0];
    this.tooltip.current.style.top = mouse[1];
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

    const statesFeatures = topojson.feature(
      brazilStates,
      brazilStates.objects.estados
    );
    const statesContour = topojson.mesh(brazilStates, brazilStates.objects.estados);
    
    this.maxConfirmed = Math.max.apply(
      Math,
      Object.values(this.statesData)
    );

    const totalConfirmed = Object.values(this.citiesData)
      .map(city => city.cases)
      .reduce((accumulator, currentValue) => accumulator + currentValue);
    const avgConfirmedCities = totalConfirmed / Object.values(this.citiesData).length;

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

    const colorScale = d3
      .scaleLinear()
      .range(["#ffc2c2", "#860000"])
      .domain([0, this.maxConfirmed / 2, this.maxConfirmed])
      .interpolate(d3.interpolateLab);

    this.g
      .append('g')
      .attr('class', 'states')
        .selectAll(".estado")
        .data(statesFeatures.features
          .map(d => (d.value = this.statesData[d.id], d)))
        .enter()
        .append("path")
        .attr("fill", d => colorScale(d.value))
        .attr("d", path)
        .on("mouseover", this._mouseover)
        .on("mouseleave", this._mouseleave)
        .on("mousemove", function(d) {
          const mouse = d3.mouse(this);
          that.tooltip.current.style.left = mouse[0] + "px";
          that.tooltip.current.style.top = mouse[1] + "px";
        });

    this.g
      .append("path")
      .datum(statesContour)
      .attr("d", path)
      .attr("fill", "none")
      .attr("vector-effect", "non-scaling-stroke")
      .attr("stroke", "#666");

    const radius = d3.scaleSqrt([0, avgConfirmedCities], [0, 10]);

    this.g
      .append('g')
      .attr('class', 'cities')
        .attr('display', 'none')
        .attr("fill", "brown")
        .attr("fill-opacity", 0.5)
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5)
        .selectAll("circle")
        .data(topojson.feature(brazilCities, brazilCities.objects.BR_LEVE).features
          .filter(d => this.citiesData[d.properties.NM_MUNICIP])
          .map(d => (d.data = this.citiesData[d.properties.NM_MUNICIP], d))
          .sort((a, b) => b.data.cases - a.data.cases))
        .join("circle")
          .attr("vector-effect", "non-scaling-stroke")
          .attr("transform", d => `translate(${path.centroid(d)})`)
          .attr("r", d => {
            return radius(d.data.cases);
          })
          .on("mouseover", this._mouseoverCity)
          .on("mouseleave", this._mouseleave)
          .on("mousemove", function(d) {
            const mouse = d3.mouse(this.parentNode);
            that.tooltip.current.style.left = mouse[0] + "px";
            that.tooltip.current.style.top = mouse[1] + "px";
          });

    this.zoom = d3
    .zoom()
    .translateExtent([
      [0, 0],
      [this.width, this.height]
    ])
    .scaleExtent([1, 5])
    .on("zoom", this._zoomed)
        
    this.svg.call(this.zoom);
  };

  _init = async() => {
    const response = await fetch('https://covid-19br.firebaseio.com/data.json');
    const data = await response.json();

    data.docs.forEach((city) => {
      const cityIndex = city.city_name.toUpperCase();
      const stateIndex = city.state.toUpperCase();
    
      if (this.citiesData[cityIndex]) {
        this.citiesData[cityIndex].cases += city.cases;
      } else {
        this.citiesData[cityIndex] = city;
      }
    
      if (this.statesData[stateIndex]) {
        this.statesData[stateIndex] += city.cases;
      } else {
        this.statesData[stateIndex] = city.cases;
      }
    });

    this.width = this.mapWrapper.current.offsetWidth;
    this.height = this.mapWrapper.current.parentNode.offsetHeight;

    this.svg = d3
      .select(this.mapWrapper.current)
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    this._build();

    window.addEventListener("resize", this._build);
  }

  toggleCities = () => {
    this.showCities = !this.showCities;
    if (!this.showCities) {
      this.g.select('.cities').attr('display', 'none');
    } else {
      this.g.select('.cities').attr('display', 'block');
    }
  }
  
  zoomIn = () => {
    this.zoom.scaleBy(this.g.transition().duration(500), 1.2);
  }

  zoomOut = () => {
    this.zoom.scaleBy(this.g.transition().duration(500), 0.8);
  }

  componentDidMount() {
    this._init();
  }

  render() {
    return (
      <div ref={this.mapWrapper} style={mapWrapperStyle}>
        <div style={mapOptions}>
          <label><input type="checkbox" value={this.showCities} onChange={this.toggleCities} /> Mostrar cidades</label>
        </div>
        <div ref={this.tooltip} style={tooltipStyle} />
      </div>
    );
  }
}

export default Map;
