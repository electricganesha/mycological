import { FC } from "react";
import styled from "styled-components";
import { useGame } from "../../context/GameContext";

export const Inventory: FC = () => {
  const { state } = useGame();

  return (
    <InventoryContainer>
      <Title>Inventory</Title>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Rare</TableHeaderCell>
            <TableHeaderCell>Qty</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Quality</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {state.inventory.length > 0 ? (
            state.inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.mushroom.rarity === "rare" ? "⭐" : ""}
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <b>{item.mushroom.name}</b>
                </TableCell>
                <TableCell>{item.quality}%</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <EmptyCell colSpan={4}>No items in inventory</EmptyCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
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
  overflow-y: auto;
  max-height: 160px;
  width: 100%;
`;

const Title = styled.h1`
  margin: 0;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #fff;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  display: table;
`;

const TableHeader = styled.thead`
  background-color: #2e2e2e;
`;

const TableBody = styled.tbody`
  overflow-y: auto;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #353535;
  }

  &:nth-child(odd) {
    background-color: #3e3e3e;
  }

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
`;

const TableHeaderCell = styled.th`
  text-align: left;
  padding: 6px;
  font-size: 0.6rem;
  font-weight: normal;
`;

const TableCell = styled.td`
  padding: 6px;
  font-size: 0.5rem;
`;

const EmptyCell = styled.td`
  text-align: center;
  padding: 10px;
  font-size: 0.6rem;
`;
