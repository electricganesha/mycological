import styled, { keyframes } from "styled-components";
import { PhaseContainer } from "../../styles/components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const glowPulse = keyframes`
  0% { box-shadow: 0 0 5px #4CAF50; }
  50% { box-shadow: 0 0 20px #4CAF50; }
  100% { box-shadow: 0 0 5px #4CAF50; }
`;

const starPop = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1.1); }
`;

const contentFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const dangerPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

export const ExplorationContainer = styled(PhaseContainer)`
  position: relative;
`;

export const ExplorationScene = styled.div`
  width: 100%;
  height: 80vh;
  position: relative;
  background: #1a1a1a;
  margin-bottom: 20px;
`;

export const StatsPanel = styled.div<{ position: "top" | "bottom" }>`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.2);
  position: absolute;
  ${({ position }) => (position === "top" ? "top: 16px;" : "bottom: 16px;")};
  right: 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 16px;
`;

export const Overlay = styled.div`
  position: relative;
  z-index: 1;
  background: rgba(0, 0, 0, 0.7);
  padding: 15px;
  border-radius: 8px;
  color: white;
  margin: 10px;
`;

export const GameOverOverlay = styled(Overlay)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.9) !important;
  padding: 2rem !important;
  text-align: center;
  border: 2px solid #ff0000;
  z-index: 10;

  h2 {
    color: #ff0000;
    margin-bottom: 1rem;
  }

  p {
    margin: 0.5rem 0;
  }

  button {
    margin-top: 1.5rem;
    background: #ff0000;
  }
`;

export const EventDialog = styled(Overlay)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 400px;
  text-align: center;
  background: rgba(0, 0, 0, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.3s ease-out forwards;

  h3,
  p,
  .button-row {
    opacity: 0;
    transform: translateY(10px);
    animation: ${contentFadeIn} 0.5s ease-out forwards;
  }

  h3 {
    animation-delay: 0.1s;
  }
  .mushroom-info {
    animation-delay: 0.2s;
  }
  p:nth-of-type(2) {
    animation-delay: 0.3s;
  }
  p:nth-of-type(3) {
    animation-delay: 0.4s;
  }
  p:nth-of-type(4) {
    animation-delay: 0.5s;
  }
  .button-row {
    animation-delay: 0.6s;
  }
`;

export const WarningMessage = styled(Overlay)`
  color: #ff4444;
  text-align: center;
  margin-top: 10px;
  animation: ${pulse} 2s infinite;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const CollectButton = styled.button`
  background: linear-gradient(45deg, #43a047, #66bb6a);
  transform: translateY(-1px);
  transition: all 0.2s ease;
  min-width: 150px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-weight: bold;
  letter-spacing: 0.5px;
  padding: 12px 24px;
  position: relative;
  overflow: hidden;

  &:hover {
    background: linear-gradient(45deg, #66bb6a, #81c784);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

export const CancelButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
    color: white;
  }
`;

export const RarityBadge = styled.span<{
  rarity: "legendary" | "rare" | "common";
}>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  ${({ rarity }) => {
    switch (rarity) {
      case "legendary":
        return `
          background: linear-gradient(45deg, #FF00FF, #FF69B4);
          box-shadow: 0 0 10px #FF00FF;
          color: white;
        `;
      case "rare":
        return `
          background: linear-gradient(45deg, #FFD700, #FFA500);
          box-shadow: 0 0 10px #FFD700;
          color: black;
        `;
      default:
        return `
          background: #8B4513;
          color: white;
        `;
    }
  }}
`;

export const NativeBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  background: #4caf50;
  color: white;
  animation: ${glowPulse} 2s infinite;
  box-shadow: 0 0 10px #4caf50;
`;

export const QualityStars = styled.div`
  color: #888;
  letter-spacing: 2px;
  cursor: help;
  padding: 2px 5px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .star {
    transition: all 0.3s ease;
    display: inline-block;

    &.filled {
      color: #ffd700;
      text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
      transform: scale(1.1);
      animation: ${starPop} 0.3s ease-out;
    }
  }
`;

export const DangerButton = styled.button`
  background: linear-gradient(45deg, #d32f2f, #f44336);
  color: white;
  animation: ${dangerPulse} 2s infinite;

  &:hover {
    background: linear-gradient(45deg, #f44336, #e57373);
  }
`;
