import "./App.css";
import { GameProvider } from "./context/GameContext";
import GameContainer from "./components/GameContainer";

function App() {
  return (
    <GameProvider>
      <GameContainer />
    </GameProvider>
  );
}

export default App;
