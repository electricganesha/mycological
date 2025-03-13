export const theme = {
  colors: {
    primary: "#3498db",
    primaryDark: "#2980b9",
    success: "#2ecc71",
    successDark: "#27ae60",
    text: "#2c3e50",
    textLight: "#666",
    background: "#f5f5f5",
    white: "#fff",
    disabled: "#bdc3c7",
    border: "#ddd",
    healthBar: {
      start: "#ff4444",
      end: "#691a1a",
    },
    staminaBar: {
      start: "#44ff44",
      end: "#116311",
    },
  },
  shadows: {
    small: "0 2px 4px rgba(0, 0, 0, 0.1)",
    medium: "0 4px 8px rgba(0, 0, 0, 0.1)",
    top: "0 -2px 4px rgba(0, 0, 0, 0.1)",
  },
  transitions: {
    default: "0.3s ease",
    quick: "0.2s ease",
  },
  borderRadius: {
    small: "4px",
    medium: "8px",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  typography: {
    fontFamily: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`,
    sizes: {
      xs: "0.5rem",
      sm: "0.9rem",
      base: "1rem",
      lg: "1.2rem",
      xl: "1.5rem",
      xxl: "2em",
      xxxl: "2.5em",
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
    },
  },
  breakpoints: {
    mobile: "320px",
    tablet: "768px",
    desktop: "1200px",
  },
  containers: {
    maxWidth: "1200px",
  },
} as const;

export type Theme = typeof theme;

declare module "styled-components" {}
