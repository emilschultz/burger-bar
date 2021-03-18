import styled from "styled-components";

const SectionGrid = styled.section`
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 3fr));
  grid-template-rows: auto;
  grid-gap: 1rem;

  div {
    grid-column: span 1;
    justify-self: center;
  }
`;

export default SectionGrid;
