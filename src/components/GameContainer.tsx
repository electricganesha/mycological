import { useGame } from "../context/GameContext";
import ExplorationPhase from "./phases/ExplorationPhase";
import GameHeader from "./ui/GameHeader";
import GameFooter from "./ui/GameFooter";
import IdentificationPhase from "./phases/IdentificationPhase";
import ShopPhase from "./phases/ShopPhase";
import CraftingPhase from "./phases/CraftingPhase";

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
    <div className="game-container">
      <GameHeader />
      <main className="game-content">{renderPhase()}</main>
      <GameFooter />
    </div>
  );
};

export default GameContainer;
