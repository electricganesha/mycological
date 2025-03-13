import styled from "styled-components";

// Grid Layouts
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

// Base Card styles
export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.small};
  cursor: pointer;
  transition:
    transform ${({ theme }) => theme.transitions.quick},
    box-shadow ${({ theme }) => theme.transitions.quick};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  &.selected {
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

// Status Display
export const StatusPanel = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  justify-content: space-around;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

// Phase Container
export const PhaseContainer = styled.div`
  animation: fadeIn ${({ theme }) => theme.transitions.default};
`;

// Control Group
export const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

// Effect Tag
export const EffectTag = styled.span`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  margin: ${({ theme }) => theme.spacing.xs};
  display: inline-block;
`;

// Available/Missing States
export const AvailableText = styled.span`
  color: ${({ theme }) => theme.colors.success};
`;

export const MissingText = styled.span`
  color: #e74c3c;
`;

// Scientific Name
export const ScientificName = styled.span`
  font-style: italic;
  color: ${({ theme }) => theme.colors.textLight};
`;

// Observations List
export const ObservationsList = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

// Footer Content
export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${({ theme }) => theme.containers.maxWidth};
  margin: 0 auto;
`;

// Companions Section
export const CompanionsSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

export const CompanionList = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

export const CompanionGrid = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const Companion = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SkillTag = styled.span`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

// Next Day Button
export const NextDayButton = styled.button`
  background-color: ${({ theme }) => theme.colors.success};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.successDark};
  }
`;
