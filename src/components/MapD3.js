import React from "react";
import styled from "styled-components";
import * as d3 from "d3";
import * as topojson from "topojson";
import acronymous from "../db/acronymous";
import brazilStates from "../db/br-states.json";
import brazilCities from '../db/brazil-cities.json';

const ToolTip = styled.div`
  position: fixed;
  transform: translate(-50%, -120%);
  padding: 10px;
  background: rgba(000,000,000,0.9);
  color: #fff;
  font-size: 0.7em;
  pointer-events: none;
  width: 250px;
  opacity: 0;

  &:after {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 9px);
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 7.5px 0 7.5px;
    border-color: rgba(000,000,000,0.9) transparent transparent transparent;
  }
`;

const MapWrapper = styled.div`
  position: relative;
  height: 100%;

  .map-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    text-transform: uppercase;
    font-size: 0.7em;
  }

  .map-options {
    position: absolute;
    bottom: 1rem;
    right: 0.5rem;

    label {
      font-size: 0.6em;
      text-transform: uppercase;
      background: rgba(255,255,255,0.1);
      padding: 0.5em 1em;
      border-radius: 0.5em;

      input {
        vertical-align: middle;
      }
    }

    @media screen and (min-width: 768px) {
      bottom: 2rem;
      right: 1rem;

      label {
        font-size: 0.8em;
      }
    }
  }
`;

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
    this.avgConfirmedCities = 0;
    this.colorScale = null;
    this.path = null;
    this.state = {
      tooltipPos: {top: 0, left: 0},
      loadingMap: true,
    };
  }

  _mousemove = () => {
    const x = d3.event.pageX - this.mapWrapper.current.getBoundingClientRect().left;
    const y = d3.event.pageY;
    this.setState({tooltipPos: {
      opacity: 1,
      left: `${x}px`,
      top: `${y}px`,
    }})
  }

  _mouseleave = d => {
    this.setState({tooltipPos: {
      opacity: 0,
    }})
  };

  _mouseover = d => {
    if (this.showCities) return;
    this.tooltip.current.innerHTML = `${d.properties.nome}
    <br>Confirmados: ${d.data.deaths === null ? 'Não disponível' : d.data.confirmed}
    <br>Mortes: ${d.data.deaths === null ? 'Não disponível' : d.data.deaths}`;
  };

  _mouseoverCity = d => {
    if (!this.showCities) return;
    this.tooltip.current.innerHTML = `${d.data.city} - ${d.data.state}
    <br>Confirmados: ${d.data.confirmed}
    <br>Mortes: ${d.data.deaths}
    <br>Casos / 100k habitantes: ${parseFloat(d.data.confirmed_per_100k_inhabitants).toFixed(2)}`;
  };

  _radiusSize = (zoom) => {
    const ratio = 1000;
    const radiusSize = ((10 * this.width) / zoom) / ratio;
    return radiusSize;
  }

  _zoomed = () => {
    const zoom = d3.event.transform.k;
    const radius = d3.scaleSqrt([0, this.avgConfirmedCities], [0, this._radiusSize(zoom)]);
    this.g.attr("transform", d3.event.transform);
    this.g.select('.cities')
        .selectAll("circle")
        .attr("r", d => {
          return radius(d.data.confirmed);
        })
  };

  _build = () => {
    this.width = this.mapWrapper.current && this.mapWrapper.current.offsetWidth;
    this.height = this.mapWrapper.current && this.mapWrapper.current.parentNode.offsetHeight;

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
      Object.values(this.statesData).map(o => o.confirmed)
    );

    this.colorScale = d3
      .scaleLinear()
      .range(["#ffc2c2", "#860000"])
      .domain([0, this.maxConfirmed / 2, this.maxConfirmed])
      .interpolate(d3.interpolateLab);

    const totalConfirmed = Object.values(this.citiesData)
      .map(city => city.confirmed)
      .reduce((accumulator, currentValue) => accumulator + currentValue);
    this.avgConfirmedCities = totalConfirmed / Object.values(this.citiesData).length;

    const bounds = d3.geoBounds(statesFeatures);
    const center = d3.geoCentroid(statesFeatures);

    // Compute the angular distance between bound corners
    const distance = d3.geoDistance(bounds[0], bounds[1]);
    const scale = (this.height / distance) * 1.2;

    // Update the projection scale and centroid
    this.projection.scale(scale).center(center);
    this.path = d3.geoPath().projection(this.projection);

    if (this.g) this.g.remove();

    this.g = this.svg.append("g");

    this.zoom = d3
    .zoom()
    .translateExtent([
      [0, 0],
      [this.width, this.height]
    ])
    .scaleExtent([1, 5])
    .on("zoom", this._zoomed);
        
    this.svg.call(this.zoom);

    this.g
      .append('g')
      .attr('class', 'states')
        .selectAll(".state")
        .data(statesFeatures.features
          .map(d => (d.data = this.statesData[d.id], d)))
        .enter()
        .append("path")
        .attr("fill", d => this.colorScale(d.data.confirmed))
        .attr("d", this.path)
        .on("mouseover", this._mouseover)
        .on("mouseleave", this._mouseleave)
        .on("mousemove", () => {
          if(!this.showCities) this._mousemove();
        });

    this.g
      .append("path")
      .datum(statesContour)
      .attr("d", this.path)
      .attr("fill", "none")
      .attr("pointer-events", "none")
      .attr("vector-effect", "non-scaling-stroke")
      .attr("stroke", "#666");

    const radius = d3.scaleSqrt([0, this.avgConfirmedCities], [0, this._radiusSize(1)]);

    const that = this;
    this.g
      .append('g')
      .attr('class', 'cities')
        // .attr('display', 'none')
        .attr("fill", "brown")
        .attr("fill-opacity", 0.5)
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5)
        .selectAll("circle")
        .data(topojson.feature(brazilCities, brazilCities.objects.BR_LEVE).features
          .filter(d => this.citiesData[d.properties.NM_MUNICIP])
          .map(d => (d.data = this.citiesData[d.properties.NM_MUNICIP], d))
          .sort((a, b) => b.data.confirmed - a.data.confirmed))
        .join("circle")
          .attr("vector-effect", "non-scaling-stroke")
          .attr("transform", d => `translate(${this.path.centroid(d)}) scale(0)`)
          .attr("r", d => {
            return radius(d.data.confirmed);
          })
          .on("mouseover", function (d) {
            d3.select(this)
              .transition()
              .duration(300)
              .attr('transform', `translate(${that.path.centroid(d)}) scale(1.15)`);
            that._mouseoverCity(d);
          })
          .on("mouseleave", function (d) {
            d3.select(this)
              .transition()
              .duration(100)
              .attr('transform', `translate(${that.path.centroid(d)}) scale(1)`);
            that._mouseleave(d);
          })
          .on("mousemove", this._mousemove);
  };

  _init = async () => {
    const data = this.props.data

    Object.keys(acronymous).forEach((key) => {
      this.statesData[key] = {
        id: key,
        name: acronymous[key],
        confirmed: null,
        deaths: null,
      }
    })

    if (data) {
      data.results.forEach((city) => {
        const cityIndex = city.city ? city.city.toUpperCase() : '';
        const stateIndex = city.state.toUpperCase();
        
        if (city.is_last) {
          if (city.place_type === 'city' && city.city !== '') {
            this.citiesData[cityIndex] = city;
          }
          
          if (city.place_type === 'state') {
            this.statesData[stateIndex].confirmed = city.confirmed;
            this.statesData[stateIndex].deaths = city.deaths;
          }
        }
      });

      this.width = this.mapWrapper.current && this.mapWrapper.current.offsetWidth;
      this.height = this.mapWrapper.current && this.mapWrapper.current.parentNode.offsetHeight;

      this.svg = d3
        .select(this.mapWrapper.current && this.mapWrapper.current)
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height);

      this._build();

      window.addEventListener("resize", this._build);
    }
  }

  _randomInt = (min, max) => {
    return min + Math.floor((max - min) * Math.random());
  }

  toggleCities = () => {
    this.showCities = !this.showCities;

    if (!this.showCities) {
      this.g.select('.cities')
        .selectAll("circle")
        .transition()
        .duration(300)
        .attr("transform", d => `translate(${this.path.centroid(d)}) scale(0)`);
      this.g.select('.states')
        .selectAll("path")
        .transition()
        .duration(300)
        .attr("fill", d => this.colorScale(d.data.confirmed));
    } else {
      this.g.select('.cities')
        .selectAll("circle")
        .transition()
        .delay((d, i) => this._randomInt(100, 300))
        .duration(700)
        .attr("transform", d => `translate(${this.path.centroid(d)}) scale(1)`);
      this.g.select('.states')
        .selectAll("path")
        .transition()
        .duration(300)
        .attr("fill", "#333");
    }
  }
  
  zoomIn = () => {
    this.zoom.scaleBy(this.g.transition().duration(500), 1.2);
  }

  zoomOut = () => {
    this.zoom.scaleBy(this.g.transition().duration(500), 0.8);
  }

  componentDidMount() {
    if (this.state.loadingMap) {
      this._init();
    }
  }

  componentDidUpdate() {
    if (this.state.loadingMap) {
      this._init();
      this.setState({loadingMap: false});
    }
  }

  render() {
    return (
      <MapWrapper ref={this.mapWrapper}>
        <div className="map-options">
          <label><input type="checkbox" value={this.showCities} onChange={this.toggleCities} /> Mostrar cidades</label>
        </div>
        {this.state.loadingMap && 
          <div className="map-loading">Carregando Mapa...</div>
        }
        <ToolTip ref={this.tooltip} style={this.state.tooltipPos} />
      </MapWrapper>
    );
  }
}

export default Map;
