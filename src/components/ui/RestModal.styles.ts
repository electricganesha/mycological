import styled from "styled-components";
import {
  ButtonRow,
  CollectButton,
  CancelButton,
} from "../phases/ExplorationPhase.styles";

export const BenefitsList = styled.ul`
  text-align: left;
  margin: 1rem 0;
  list-style-position: inside;
  color: ${({ theme }) => theme.colors.white};

  li {
    margin: 0.5rem 0;
    padding-left: 0.5rem;

    &:before {
      content: "✓";
      color: ${({ theme }) => theme.colors.success};
      margin-right: 0.5rem;
    }
  }
`;

export const RestButton = styled(CollectButton)`
  background: linear-gradient(45deg, #4a90e2, #357abd);

  &:hover {
    background: linear-gradient(45deg, #357abd, #2868a9);
  }
`;

export const ContinueButton = styled(CancelButton)`
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

// Re-export ButtonRow
export { ButtonRow };
