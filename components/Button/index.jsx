import styled from "styled-components";

const Button = styled.button`
  border: 0.1rem solid #f5173d;
  border-radius: 0.3rem;

  background-color: #f9f3f2;
  color: #f5173d;
  width: 10%;
  height: 2rem;
  margin: 0rem 1rem 0rem 0rem;

  cursor: pointer;
  transition: 0.2s ease;

  font-weight: 700;

  &&:hover {
    background-color: #f5173d;
    color: #f9f3f2;
    border: 0.1rem solid #f9f3f2;
    transition: 0.2s ease;
  }
`;

export default Button;
