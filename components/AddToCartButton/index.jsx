import styled from "styled-components";

const AddToCartButton = styled.button`
  border: 0.1rem solid #f5173d;
  border-radius: 0.3rem;

  background-color: #f9f3f2;
  color: #f5173d;
  width: 100%;
  height: 2rem;

  cursor: pointer;
  transition: 0.2s ease;

  font-weight: 700;

  display: flex;
  align-items: center;
  padding-left: 0.5rem;

  &&:hover {
    background-color: #f5173d;
    color: #f9f3f2;
    border: 0.1rem solid #f9f3f2;
    transition: 0.2s ease;
  }
`;

export default AddToCartButton;
