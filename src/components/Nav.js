import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: "active" } : {};
};

const Navigation = styled.nav`
  padding: 0.2rem 0.3rem;
  border-radius: 2px;
  position: absolute;
  top: 1rem;
  left: 0;
  width: 100%;
  text-align: center;

  > a {
    display: inline-block;
    font-weight: bolder;
    padding: 0.2rem 0.6rem;
    font-size: 0.8rem;
    line-height: 1.6rem;
    text-transform: uppercase;
    margin-right: 0.4rem;
    text-decoration: none;
    background-color: transparent;
    transition: 280ms background-color ease-in-out;
    border-radius: 2px;

    @media (max-width: 480px) {
      font-size: 0.6em;
      margin-right: 0.2rem;
      padding: 0rem 0.3rem;
    }

    :hover {
      background-color: var(--color-secondary);
      color: var(--color-background);
      transition: 280ms background-color ease-in-out;
    }
    :active {
      transform: scale(0.9);
      transition: 280ms background-color ease-in-out;
    }
  }

  .active {
    background-color: var(--color-primary);
    color: var(--color-background);
    transition: 280ms background-color ease-in-out;
  }
`;

export default function Nav() {
  return (
    <Navigation>
      <Link to="/" getProps={isActive}>
        Mapa
      </Link>
      <Link to="contagios-provincia" getProps={isActive}>
        Estados
      </Link>
      <Link to="contagios" getProps={isActive}>
        Total
      </Link>
      <Link to="novos-casos" getProps={isActive}>
        Casos
      </Link>
      <Link to="projecoes" getProps={isActive}>
        Projeções
      </Link>
    </Navigation>
  );
}
