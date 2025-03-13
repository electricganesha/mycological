import React, { useMemo } from "react";
import "./GameHeader.css";
import { useGame } from "../../context/GameContext";

const GameHeader: React.FC = () => {
  const { state, dispatch } = useGame();

  const phases: { id: typeof state.gamePhase; label: string }[] = [
    { id: "exploration", label: "Explore" },
    { id: "identification", label: "Identify" },
    { id: "shop", label: "Shop" },
    { id: "crafting", label: "Craft" },
  ];

  const formatTime = (hour: number, minute: number): string => {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    const displayMinute = minute.toString().padStart(2, "0");
    return `${displayHour}:${displayMinute} ${period}`;
  };

  const dayPeriod = useMemo(() => {
    const hour = state.currentTime.hour;
    if (hour >= 5 && hour < 12) return "Morning";
    if (hour >= 12 && hour < 17) return "Afternoon";
    if (hour >= 17 && hour < 20) return "Evening";
    return "Night";
  }, [state.currentTime.hour]);

  return (
    <header className="game-header">
      <div className="time-display">
        <div className="time">
          {formatTime(state.currentTime.hour, state.currentTime.minute)}
        </div>
        <div className="day-info">
          <span className="day-period">{dayPeriod}</span>
          <span className="day-count">Day {state.currentDay}</span>
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
