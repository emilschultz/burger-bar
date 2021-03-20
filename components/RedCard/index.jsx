import styled from "styled-components";

const RedCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: #f9f3f2;
  color: #f5173d;
  border: 0.1rem solid #f5173d;
  border-radius: 0.3rem;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

  padding: 1rem;
  width: 90%;
  transition: transform 0.1s ease;

  cursor: pointer;

  &&:hover {
    transform: scale(1.01);
    transition: 0.1s ease;
  }
`;

export default RedCard;
