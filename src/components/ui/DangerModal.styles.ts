import styled, { keyframes } from "styled-components";
import { ButtonRow, DangerButton } from "../phases/ExplorationPhase.styles";

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

export const DangerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 1rem;
`;

export const DangerIcon = styled.span`
  font-size: 2rem;
  animation: ${pulse} 2s infinite;
`;

export const DamageDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 1.5rem 0;
  font-size: 1.5rem;
`;

export const DamageText = styled.span`
  color: ${({ theme }) => theme.colors.danger || "#ff4444"};
  font-weight: bold;
  font-size: 2rem;
`;

export const DamageIcon = styled.span`
  animation: ${pulse} 2s infinite;
`;

// Re-export components we want to reuse
export { ButtonRow, DangerButton };
