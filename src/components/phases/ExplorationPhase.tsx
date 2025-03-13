import { useState, useEffect, Suspense } from "react";
import {
  ExplorationContainer,
  ExplorationScene,
  StatsPanel,
  GameOverOverlay,
  EventDialog,
  WarningMessage,
} from "./ExplorationPhase.styles";
import { useGame } from "../../context/GameContext";
import { MapTile } from "../../types";
import { getAdjacentTiles } from "../../utils/mapGenerator";
import {
  canMoveToTile,
  getTerrainProperties,
  getTilePosition,
  moveDangerEvents,
} from "../../utils/terrainUtils";
import GameCanvas from "../3d/GameCanvas";
import HexTile from "../3d/HexTile";
import { PlayerStats } from "../ui/PlayerStats";
import { Inventory } from "../ui/Inventory";
import { MushroomModal } from "../ui/MushroomModal";
import { DangerModal } from "../ui/DangerModal";
import { RestModal } from "../ui/RestModal";

const ExplorationPhase: React.FC = () => {
  const { state, dispatch } = useGame();
  const [pendingEvent, setPendingEvent] = useState<{
    tile: MapTile;
    type: "mushroom" | "rest" | "danger";
  } | null>(null);

  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  useEffect(() => {
    // Clear warning message after 3 seconds
    if (warningMessage) {
      const timer = setTimeout(() => {
        setWarningMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [warningMessage]);

  const handleTileClick = (tile: MapTile) => {
    const { canMove, reason } = canMoveToTile(
      tile,
      state.explorationMap.playerPosition,
      state.explorationMap.width,
      state.explorationMap.height,
      state.player.stamina,
      state.player.health
    );

    if (!canMove) {
      if (reason) {
        setWarningMessage(reason);
      }
      return;
    }

    const terrainProps = getTerrainProperties(tile.type);
    const costs = terrainProps.costs;

    // Move player and advance time based on terrain
    dispatch({ type: "MOVE_PLAYER", payload: { x: tile.x, y: tile.y } });
    dispatch({ type: "UPDATE_STAMINA", payload: -costs.stamina });
    if (costs.health > 0) {
      dispatch({ type: "UPDATE_HEALTH", payload: -costs.health });
    }

    // Advance time based on terrain difficulty
    const timeToMove = {
      forest: 20,
      mountain: 45,
      swamp: 30,
      cave: 25,
      meadow: 15,
      empty: 5,
    };
    dispatch({
      type: "ADVANCE_TIME",
      payload: { minutes: timeToMove[tile.type] },
    });

    // Handle any events on the tile
    if (tile.hasEvent) {
      handleEvent(tile);
    }

    // Move danger events after player moves
    moveDangerEvents({
      tiles: state.explorationMap.tiles,
      width: state.explorationMap.width,
      height: state.explorationMap.height,
      playerPosition: state.explorationMap.playerPosition,
      dispatch,
    });
  };

  const handleEvent = (tile: MapTile) => {
    switch (tile.eventType) {
      case "mushroom":
        setPendingEvent({ tile, type: "mushroom" });
        break;
      case "danger":
        setPendingEvent({ tile, type: "danger" });
        break;
      case "rest":
        setPendingEvent({ tile, type: "rest" });
        break;
    }
  };

  const isGameOver = state.player.health <= 0;

  const handleNewGame = () => {
    dispatch({ type: "UPDATE_HEALTH", payload: state.player.maxHealth });
    dispatch({ type: "UPDATE_STAMINA", payload: state.player.maxStamina });
    dispatch({
      type: "GENERATE_NEW_MAP",
      payload: { width: 10, height: 10 },
    });
  };

  return (
    <ExplorationContainer>
      {isGameOver && (
        <GameOverOverlay>
          <h2>Game Over!</h2>
          <p>You have succumbed to the dangers of the wilderness.</p>
          <p>Days survived: {state.currentDay}</p>
          <p>
            Mushrooms collected:{" "}
            {state.inventory.reduce((sum, item) => sum + item.quantity, 0)}
          </p>
          <button onClick={handleNewGame}>Start New Expedition</button>
        </GameOverOverlay>
      )}

      {!isGameOver && (
        <>
          <ExplorationScene>
            <GameCanvas
              playerPosition={getTilePosition(
                state.explorationMap.playerPosition.x,
                state.explorationMap.playerPosition.y,
                state.explorationMap.width,
                state.explorationMap.height
              )}
            >
              <Suspense fallback={null}>
                {state.explorationMap.tiles.map((row, y) =>
                  row.map((tile, x) => (
                    <HexTile
                      key={`${x}-${y}`}
                      position={getTilePosition(
                        x,
                        y,
                        state.explorationMap.width,
                        state.explorationMap.height
                      )}
                      type={tile.type}
                      isDiscovered={tile.discovered}
                      isAdjacent={getAdjacentTiles(
                        state.explorationMap.playerPosition.x,
                        state.explorationMap.playerPosition.y,
                        state.explorationMap.width,
                        state.explorationMap.height
                      ).some((pos) => pos.x === x && pos.y === y)}
                      isPlayerPosition={
                        x === state.explorationMap.playerPosition.x &&
                        y === state.explorationMap.playerPosition.y
                      }
                      hasEvent={tile.hasEvent}
                      eventType={tile.eventType}
                      onClick={() => handleTileClick(tile)}
                    />
                  ))
                )}
              </Suspense>
            </GameCanvas>
            <StatsPanel position="top">
              <PlayerStats />
            </StatsPanel>
            <StatsPanel position="bottom">
              <Inventory />
            </StatsPanel>
          </ExplorationScene>

          {(warningMessage || state.player.stamina < 10) && (
            <WarningMessage>
              {warningMessage || "Not enough stamina to move! Rest to recover."}
            </WarningMessage>
          )}

          {pendingEvent?.type === "mushroom" && (
            <EventDialog>
              <MushroomModal
                pendingEvent={pendingEvent}
                setPendingEvent={setPendingEvent}
                dispatch={dispatch}
              />
            </EventDialog>
          )}

          {pendingEvent?.type === "danger" && (
            <EventDialog>
              <DangerModal
                pendingEvent={pendingEvent}
                setPendingEvent={setPendingEvent}
                dispatch={dispatch}
              />
            </EventDialog>
          )}

          {pendingEvent?.type === "rest" && (
            <EventDialog>
              <RestModal
                pendingEvent={pendingEvent}
                setPendingEvent={setPendingEvent}
                maxStamina={state.player.maxStamina}
                stamina={state.player.stamina}
                dispatch={dispatch}
              />
            </EventDialog>
          )}
        </>
      )}
    </ExplorationContainer>
  );
};

export default ExplorationPhase;
