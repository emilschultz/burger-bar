import styled from 'styled-components';

const NavnbarStyle = styled.ul`
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  list-style-type: none; 
  color: #000000;

  li {
    margin: 0, 5rem;
  }
  
  a {
    color: #000000;
    text-decoration: none;
  }

  a:hover {
    color: rgba(255, 0, 0, 1);
    font-style: italic;
  }
`

export default NavnbarStyle;