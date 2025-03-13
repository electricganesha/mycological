import React, { useMemo } from "react";
import styled from "styled-components";
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
    <Header>
      <TimeDisplay>
        <Time>
          {formatTime(state.currentTime.hour, state.currentTime.minute)}
        </Time>
        <DayInfo>
          <DayPeriod>{dayPeriod}</DayPeriod>
          <DayCount>Day {state.currentDay}</DayCount>
        </DayInfo>
      </TimeDisplay>
      <PhaseNavigation>
        {phases.map((phase) => (
          <PhaseButton
            key={phase.id}
            onClick={() =>
              dispatch({ type: "CHANGE_GAME_PHASE", payload: phase.id })
            }
            isActive={state.gamePhase === phase.id}
          >
            {phase.label}
          </PhaseButton>
        ))}
      </PhaseNavigation>
    </Header>
  );
};

export default GameHeader;

const Header = styled.header`
  background: rgba(0, 0, 0, 0.8);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TimeDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Time = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
`;

const DayInfo = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const DayPeriod = styled.span`
  color: #ffd700;
`;

const DayCount = styled.span`
  color: #a8e6cf;
`;

const PhaseNavigation = styled.nav`
  display: flex;
  gap: 0.5rem;
`;

const PhaseButton = styled.button<{ isActive: boolean }>`
  padding: 0.5rem 1rem;
  background: ${(props) =>
    props.isActive ? "#4a6741" : "rgba(255, 255, 255, 0.1)"};
  border: 1px solid
    ${(props) => (props.isActive ? "#4a6741" : "rgba(255, 255, 255, 0.2)")};
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.isActive ? "#4a6741" : "rgba(255, 255, 255, 0.2)"};
  }
`;
