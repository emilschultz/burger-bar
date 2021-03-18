import styled from "styled-components";

const MenuCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f9f3f2;
  border: 0.1rem solid #f5173d;
  border-radius: 0.3rem;
  color: #f5173d;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  padding: 1rem;
  width: 90%;
  box-shadow: rgba(255, 255, 255, 0.16) 0px 1px 4px;
  transition: transform 0.1s ease;
  cursor: pointer;

  &&:hover {
    transform: scale(1.01);
    transition: 0.1s ease;
  }
`;

export default MenuCard;
