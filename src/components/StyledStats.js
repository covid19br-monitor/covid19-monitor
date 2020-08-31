import styled from 'styled-components';

export const StatGrid = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1em;
`;

export const StatBlock = styled.article`
  display: flex;
  flex: 1;
  flex-direction: column;
  transition: all 200ms ease-out;

  > h3 {
    font-size: 0.6rem;
    text-transform: uppercase;
    margin: 0;
    font-weight: 300;
    display: inline-block;
  }

  > p {
    font-size: 1.4rem;
    flex: 2;
    font-weight: 900;

    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
`;

export const Separator = styled.div`
  border-top: 1px dotted var(--color-primary);
  height: 1px;
  width: 100%;
  margin: 0 1rem;
  flex: 4;
`;

export const Row = styled.li`
  font-size: small;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-primary);

  :first-of-type {
    color: var(--color-danger);
  }
  :nth-of-type(2) {
    color: var(--color-warning);
  }
  :nth-of-type(3),
  :nth-of-type(4) {
    color: var(--color-secondary);
  }
  @media (max-width: 960px) {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  span {
    display: inline-block;
    :last-of-type {
      font-weight: 900;
    }
  }
`;

export const TwoCols = styled.ol`
  padding-left: 0;
  columns: 2;
  -webkit-columns: 2;
  -moz-columns: 2;
  @media (max-width: 960px) {
    columns: 1;
    -webkit-columns: 1;
    -moz-columns: 1;
  }
`;
