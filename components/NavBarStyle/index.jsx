import styled from "styled-components";

const NavnbarStyle = styled.ul`
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  list-style-type: none;
  color: #000000;
  padding: 0;
  margin-left: 1rem;

  li {
    margin: 0 2rem 0 0;
  }

  a {
    color: #000000;
    text-decoration: none;
  }

  a:hover {
    color: rgba(255, 0, 0, 1);
    font-style: italic;
  }
`;

export default NavnbarStyle;
