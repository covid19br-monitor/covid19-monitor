import React from "react";
import Stats from "../components/Stats";
import Brazil from "../components/Brazil";
import Heading from "../components/Heading";
import Footer from "../components/Footer";

export default function DataPanel(props) {
  return (
    <section>
      <Heading />
      <div>
        <h2>
          Brasil{" "}
          <span role="img" aria-label="Brazil Flag">
            🇧🇷
          </span>
        </h2>
        <Brazil data={props.data} />
      </div>
      <div>
        <h2>Mundo</h2>
        <Stats url="https://covid19.mathdro.id/api/" />
      </div>
      <Footer />
    </section>
  );
}
