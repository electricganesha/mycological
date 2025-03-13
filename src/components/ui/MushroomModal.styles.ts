import styled from "styled-components";
import {
  RarityBadge,
  NativeBadge,
  QualityStars,
  ButtonRow,
  CollectButton,
  CancelButton,
} from "../phases/ExplorationPhase.styles";

export const MushroomInfo = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin: 10px 0;
`;

export const QualityValue = styled.span`
  margin-left: 8px;
  font-size: 0.9em;
  opacity: 0.8;
  color: #aaa;
  white-space: nowrap;
`;

export const QualityBonus = styled.span`
  color: ${({ theme }) => theme.colors.success};
  animation: qualityImprovement 0.5s ease-out;
  position: relative;
  display: inline-block;

  @keyframes qualityImprovement {
    0% {
      transform: translateY(0);
      opacity: 0;
    }
    50% {
      transform: translateY(-10px);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const QuantityText = styled.span`
  color: ${({ theme }) => theme.colors.success};
  font-weight: bold;

  .bonus {
    color: #8bc34a;
    font-size: 0.9em;
    margin-left: 5px;
  }
`;

export const ValueText = styled.span`
  color: ${({ theme }) => theme.colors.warning};
  font-weight: bold;
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
`;

// Re-export components from ExplorationPhase.styles for convenience
export {
  RarityBadge,
  NativeBadge,
  QualityStars,
  ButtonRow,
  CollectButton,
  CancelButton,
};
