import { FC } from "react";
import styled from "styled-components";
import { useGame } from "../../context/GameContext";

export const PlayerStats: FC = () => {
  const { state } = useGame();

  return (
    <Container>
      <Title>{state.player.name}</Title>
      <Stats>
        <StatsBars>
          <StatusBar>
            <BarContainer>
              <Bar
                type="health"
                width={(state.player.health / state.player.maxHealth) * 100}
              >
                <BarText>
                  Health: {state.player.health}/{state.player.maxHealth}
                </BarText>
              </Bar>
            </BarContainer>
          </StatusBar>
          <StatusBar>
            <BarContainer>
              <Bar
                type="stamina"
                width={(state.player.stamina / state.player.maxStamina) * 100}
              >
                <BarText>
                  Stamina: {state.player.stamina}/{state.player.maxStamina}
                </BarText>
              </Bar>
            </BarContainer>
          </StatusBar>
        </StatsBars>
      </Stats>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const Title = styled.h1`
  margin: 0;
  margin-bottom: 0.5rem;
  color: #fff;
  font-size: 1rem;
  border-bottom: 1px solid white;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 400px;
`;

const StatsBars = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const StatusBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: #fff;

  span {
    min-width: 60px;
    font-size: 0.5rem;
  }
`;

const BarContainer = styled.div`
  flex: 1;
  max-height: 16px;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

interface BarProps {
  width: number;
  type: "health" | "stamina";
}

const Bar = styled.div<BarProps>`
  max-height: 100%;
  transition: width 0.3s ease;
  width: ${(props) => props.width}%;
  height: 16px;
  position: relative;
  background: ${(props) =>
    props.type === "health"
      ? "linear-gradient(to right, #ff4444, #691a1a)"
      : "linear-gradient(to right, #44ff44, #116311)"};
  box-shadow: ${(props) =>
    props.type === "health"
      ? "0 0 10px rgba(255, 68, 68, 0.3)"
      : "0 0 10px rgba(68, 255, 68, 0.3)"};
`;

const BarText = styled.span`
  position: absolute;
  width: 100%;
  text-align: center;
  color: white;
  font-size: 0.5rem;
`;
