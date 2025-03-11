import React from "react";
import { useGame } from "../../context/GameContext";

const GameHeader: React.FC = () => {
  const { state, dispatch } = useGame();

  const phases: { id: typeof state.gamePhase; label: string }[] = [
    { id: "exploration", label: "Explore" },
    { id: "identification", label: "Identify" },
    { id: "shop", label: "Shop" },
    { id: "crafting", label: "Craft" },
  ];

  return (
    <header className="game-header">
      <div className="player-info">
        <h1>{state.player.name}</h1>
        <div className="player-stats">
          <span>Day {state.currentDay}</span>
          <span>
            Stamina: {state.player.stamina}/{state.player.maxStamina}
          </span>
        </div>
      </div>
      <nav className="phase-navigation">
        {phases.map((phase) => (
          <button
            key={phase.id}
            onClick={() =>
              dispatch({ type: "CHANGE_GAME_PHASE", payload: phase.id })
            }
            className={`phase-button ${state.gamePhase === phase.id ? "active" : ""}`}
          >
            {phase.label}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default GameHeader;
