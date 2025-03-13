import styled from "styled-components";
import { useGame } from "../context/GameContext";
import ExplorationPhase from "./phases/ExplorationPhase";
import IdentificationPhase from "./phases/IdentificationPhase";
import ShopPhase from "./phases/ShopPhase";
import CraftingPhase from "./phases/CraftingPhase";
import GameHeader from "./ui/GameHeader";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Main = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  margin: 0 auto;
  width: 100%;
`;

const GameContainer = () => {
  const { state } = useGame();

  // Render different phase components based on current game phase
  const renderPhase = () => {
    switch (state.gamePhase) {
      case "exploration":
        return <ExplorationPhase />;
      case "identification":
        return <IdentificationPhase />;
      case "shop":
        return <ShopPhase />;
      case "crafting":
        return <CraftingPhase />;
      default:
        return <div>Unknown game phase</div>;
    }
  };

  return (
    <Container>
      <GameHeader />
      <Main>{renderPhase()}</Main>
    </Container>
  );
};

export default GameContainer;
