import { FC } from "react";
import { useGame } from "../../context/GameContext";
import "./PlayerStats.css";

export const PlayerStats: FC = () => {
  const { state } = useGame();

  return (
    <div className="player-info">
      <h1>{state.player.name}</h1>
      <div className="player-stats">
        <div className="stats-row">
          <span>Day {state.currentDay}</span>
        </div>
        <div className="stats-bars">
          <div className="status-bar">
            <div className="bar-container">
              <div
                className="bar health"
                style={{
                  width: `${(state.player.health / state.player.maxHealth) * 100}%`,
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    width: "100%",
                    textAlign: "center",
                    color: "white",
                    fontSize: "0.5rem",
                  }}
                >
                  Health: {state.player.health}/{state.player.maxHealth}
                </span>
              </div>
            </div>
          </div>
          <div className="status-bar">
            <div className="bar-container">
              <div
                className="bar stamina"
                style={{
                  width: `${(state.player.stamina / state.player.maxStamina) * 100}%`,
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    width: "100%",
                    textAlign: "center",
                    color: "white",
                    fontSize: "0.5rem",
                  }}
                >
                  Stamina: {state.player.stamina}/{state.player.maxStamina}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
