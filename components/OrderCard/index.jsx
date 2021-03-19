import styled from "styled-components";

const OrderCard = styled.div`
  background-color: #f2f2f9;
  color: #1731f5;
  border: 0.1rem solid #1731f5;
  border-radius: 0.3rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

  padding: 1rem;
  width: 90%;
  transition: transform 0.1s ease;

  cursor: pointer;

  button {
    border: 0.1rem solid #1731f5;
    border-radius: 0.3rem;

    background-color: #f2f2f9;
    color: #1731f5;
    width: 50%;
    height: 4rem;
    margin: 2rem 0rem 0rem 0rem;

    cursor: pointer;
    transition: 0.2s ease;

    font-weight: 700;

    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 0.5rem;

    :hover {
      background-color: #1731f5;
      color: #f9f3f2;
      border: 0.1rem solid #f9f3f2;
      transition: 0.2s ease;
    }
  }
`;

export default OrderCard;
