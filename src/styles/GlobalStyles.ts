import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    line-height: 1.5;
    font-weight: ${({ theme }) => theme.typography.weights.normal};
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    min-width: ${({ theme }) => theme.breakpoints.mobile};
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  h1, h2, h3, h4 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text};
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.sizes.xxxl};
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.sizes.xxl};
    font-weight: ${({ theme }) => theme.typography.weights.medium};
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.sizes.xl};
    font-weight: ${({ theme }) => theme.typography.weights.medium};
  }

  h4 {
    font-size: ${({ theme }) => theme.typography.sizes.lg};
    font-weight: ${({ theme }) => theme.typography.weights.medium};
  }

  button {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    cursor: pointer;
    transition: background-color ${({ theme }) => theme.transitions.default};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primaryDark};
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.disabled};
      cursor: not-allowed;
    }
  }

  input[type="number"] {
    padding: ${({ theme }) => theme.spacing.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    width: 80px;
  }

  ul {
    list-style-type: none;
  }

  .status-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};

    span:first-child {
      font-weight: ${({ theme }) => theme.typography.weights.medium};
      color: ${({ theme }) => theme.colors.textLight};
    }

    span:last-child {
      font-size: ${({ theme }) => theme.typography.sizes.lg};
      color: ${({ theme }) => theme.colors.text};
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
