import { FC } from "react";
import styled from "styled-components";
import { useGame } from "../../context/GameContext";

export const Inventory: FC = () => {
  const { state } = useGame();

  return (
    <InventoryContainer>
      <Title>Inventory</Title>
      <ItemsContainer>
        {state.inventory.length > 0 ? (
          state.inventory.map((item) => (
            <Item key={item.id}>
              <span>
                <b>{item.mushroom.name}</b>
              </span>
              <span>Quantity: {item.quantity}</span>
              <span>Quality: {item.quality}</span>
            </Item>
          ))
        ) : (
          <EmptyMessage>No items in inventory</EmptyMessage>
        )}
      </ItemsContainer>
    </InventoryContainer>
  );
};
const InventoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  color: #fff;
`;

const Title = styled.h1`
  margin: 0;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #fff;
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 100%;
  max-width: 600px;
  max-height: 120px;
  overflow-y: auto;

  span {
    font-size: 0.6rem;
    width: 100%;
  }
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: #3e3e3e;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  span {
    font-size: 0.5rem;
    width: 100%;
  }
`;

const EmptyMessage = styled.span`
  font-size: 0.6rem;
`;
