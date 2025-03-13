import { ThemeProvider } from "styled-components";
import { GameProvider } from "./context/GameContext";
import GameContainer from "./components/GameContainer";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <GameProvider>
        <GameContainer />
      </GameProvider>
    </ThemeProvider>
  );
}

export default App;
