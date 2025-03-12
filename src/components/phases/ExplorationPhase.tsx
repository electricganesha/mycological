import React, { useState, useEffect, Suspense } from "react";
import { useGame } from "../../context/GameContext";
import { MapTile, BiomeType, MushroomRarity, Mushroom } from "../../types";
import { getAdjacentTiles } from "../../utils/mapGenerator";
import {
  getTerrainProperties,
  getRandomMushroomForBiome,
} from "../../utils/terrainUtils";
import GameCanvas from "../3d/GameCanvas";
import HexTile from "../3d/HexTile";
import { Html } from "@react-three/drei";
import { PlayerStats } from "../ui/PlayerStats";
import { Inventory } from "../ui/Inventory";

const ExplorationPhase: React.FC = () => {
  const { state, dispatch } = useGame();
  const [pendingEvent, setPendingEvent] = useState<{
    tile: MapTile;
    type: "mushroom" | "rest" | "danger";
  } | null>(null);

  const generateMushroom = (biome: BiomeType): Mushroom => {
    // Get terrain properties for the biome
    const biomeProps = getTerrainProperties(biome);

    // Determine rarity based on biome properties
    const rarityRoll = Math.random();
    const rarity: MushroomRarity =
      rarityRoll < 0.05
        ? "legendary"
        : rarityRoll < biomeProps.mushroomChance
          ? "rare"
          : "common";

    // Get a random mushroom type appropriate for this biome and rarity
    const mushroomType = getRandomMushroomForBiome(biome, rarity);

    // Calculate value based on rarity and whether it's in a preferred biome
    const isPreferredBiome =
      biomeProps.mushrooms[rarity].includes(mushroomType);
    const baseValue =
      (rarity === "legendary" ? 100 : rarity === "rare" ? 50 : 10) *
      (isPreferredBiome ? 1.5 : 1);

    return {
      id: "mushroom-" + Date.now(),
      name: `Wild ${mushroomType.charAt(0).toUpperCase() + mushroomType.slice(1)}`,
      type: mushroomType,
      rarity,
      biomes: [biome],
      properties: [],
      baseValue,
      scientificName: "Unknown",
      description: `A ${rarity} ${mushroomType} found in ${biome} terrain${isPreferredBiome ? " (native habitat)" : ""}.`,
      imageUrl: "",
      identified: false,
      color:
        rarity === "legendary"
          ? "#FF00FF"
          : rarity === "rare"
            ? "#FFD700"
            : "#8B4513",
    };
  };

  const moveDangerEvents = () => {
    const newTiles = [...state.explorationMap.tiles];
    const dangerTiles: MapTile[] = [];

    // Find all danger tiles
    newTiles.forEach((row) => {
      row.forEach((tile) => {
        if (tile.hasEvent && tile.eventType === "danger") {
          dangerTiles.push(tile);
        }
      });
    });

    // Remove old danger events
    dangerTiles.forEach((tile) => {
      newTiles[tile.y][tile.x] = {
        ...tile,
        hasEvent: false,
        eventType: undefined,
      };
    });

    // Place danger events in new random locations
    dangerTiles.forEach(() => {
      let placed = false;
      while (!placed) {
        const newX = Math.floor(Math.random() * state.explorationMap.width);
        const newY = Math.floor(Math.random() * state.explorationMap.height);
        const targetTile = newTiles[newY][newX];

        // Don't place on player, player-adjacent tiles, or tiles with events
        const isPlayerAdjacent = getAdjacentTiles(
          state.explorationMap.playerPosition.x,
          state.explorationMap.playerPosition.y,
          state.explorationMap.width,
          state.explorationMap.height
        ).some((pos) => pos.x === newX && pos.y === newY);

        if (
          !targetTile.hasEvent &&
          !(
            newX === state.explorationMap.playerPosition.x &&
            newY === state.explorationMap.playerPosition.y
          ) &&
          !isPlayerAdjacent
        ) {
          newTiles[newY][newX] = {
            ...targetTile,
            hasEvent: true,
            eventType: "danger",
          };
          placed = true;
        }
      }
    });

    dispatch({
      type: "UPDATE_MAP_TILES",
      payload: newTiles,
    });
  };

  const canMoveToTile = (
    tile: MapTile
  ): { canMove: boolean; reason?: string } => {
    const { x, y } = tile;
    const { playerPosition, width, height } = state.explorationMap;

    // Check if tile is adjacent
    const adjacentTiles = getAdjacentTiles(
      playerPosition.x,
      playerPosition.y,
      width,
      height
    );
    if (!adjacentTiles.some((pos) => pos.x === x && pos.y === y)) {
      return { canMove: false, reason: "You can only move to adjacent tiles." };
    }

    // Check stamina cost
    const terrainProps = getTerrainProperties(tile.type);
    const costs = terrainProps.costs;
    if (state.player.stamina < costs.stamina) {
      return {
        canMove: false,
        reason: `Not enough stamina! Need ${costs.stamina} stamina to move here.`,
      };
    }

    // Check if health cost would kill the player
    if (costs.health > 0 && state.player.health <= costs.health) {
      return {
        canMove: false,
        reason: `Too dangerous! Moving here would be fatal.`,
      };
    }

    return { canMove: true };
  };

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
    const { canMove, reason } = canMoveToTile(tile);

    if (!canMove) {
      if (reason) {
        setWarningMessage(reason);
      }
      return;
    }

    const terrainProps = getTerrainProperties(tile.type);
    const costs = terrainProps.costs;

    // Move player
    dispatch({ type: "MOVE_PLAYER", payload: { x: tile.x, y: tile.y } });
    dispatch({ type: "UPDATE_STAMINA", payload: -costs.stamina });
    if (costs.health > 0) {
      dispatch({ type: "UPDATE_HEALTH", payload: -costs.health });
    }

    // Handle any events on the tile
    if (tile.hasEvent) {
      handleEvent(tile);
    }

    // Move danger events after player moves
    moveDangerEvents();
  };

  const handleRest = () => {
    if (!pendingEvent) return;

    const { tile } = pendingEvent;
    dispatch({
      type: "UPDATE_STAMINA",
      payload: Math.min(50, state.player.maxStamina - state.player.stamina),
    });
    dispatch({ type: "UPDATE_HEALTH", payload: 10 });
    dispatch({ type: "TRIGGER_EVENT", payload: { x: tile.x, y: tile.y } });
    dispatch({ type: "ADVANCE_DAY" });
    setPendingEvent(null);
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

  const getTilePosition = (x: number, y: number): [number, number, number] => {
    const size = 1.2;
    const xPos =
      x * size * Math.sqrt(3) + (y % 2) * ((size * Math.sqrt(3)) / 2);
    const zPos = y * size * 1.5;
    const visualWidth = state.explorationMap.width * size * Math.sqrt(3);
    const visualHeight = state.explorationMap.height * size * 1.5;
    return [xPos - visualWidth / 2, 0, zPos - visualHeight / 2];
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
    <div className="exploration-phase">
      {isGameOver && (
        <div className="game-over overlay">
          <h2>Game Over!</h2>
          <p>You have succumbed to the dangers of the wilderness.</p>
          <p>Days survived: {state.currentDay}</p>
          <p>
            Mushrooms collected:{" "}
            {state.inventory.reduce((sum, item) => sum + item.quantity, 0)}
          </p>
          <button onClick={handleNewGame}>Start New Expedition</button>
        </div>
      )}

      {!isGameOver && (
        <>
          <div className="exploration-scene">
            <GameCanvas>
              <Suspense fallback={null}>
                {state.explorationMap.tiles.map((row, y) =>
                  row.map((tile, x) => (
                    <HexTile
                      key={`${x}-${y}`}
                      position={getTilePosition(x, y)}
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
            <div
              style={{
                width: "200px",
                height: "200px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                position: "absolute",
                top: "16px",
                right: "16px",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                padding: "16px",
              }}
            >
              <PlayerStats />
            </div>
            <div
              style={{
                width: "200px",
                height: "200px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                position: "absolute",
                bottom: "16px",
                right: "16px",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                padding: "16px",
              }}
            >
              <Inventory />
            </div>
          </div>

          {(warningMessage || state.player.stamina < 10) && (
            <div className="warning-message overlay">
              {warningMessage || "Not enough stamina to move! Rest to recover."}
            </div>
          )}

          {pendingEvent?.type === "mushroom" && (
            <div className="event-dialog overlay">
              {(() => {
                const mushroom = generateMushroom(pendingEvent.tile.type);
                const biomeProps = getTerrainProperties(pendingEvent.tile.type);
                const isPreferredBiome = biomeProps.mushrooms[
                  mushroom.rarity
                ].includes(mushroom.type);

                // Calculate quantity and quality with biome bonuses
                const baseQuantity = Math.floor(Math.random() * 3) + 1;
                const finalQuantity = isPreferredBiome
                  ? baseQuantity + 1
                  : baseQuantity;
                const baseQuality = Math.floor(Math.random() * 100) + 1;
                const finalQuality = isPreferredBiome
                  ? Math.min(100, baseQuality + 20)
                  : baseQuality;

                const handleCollect = () => {
                  dispatch({
                    type: "COLLECT_MUSHROOM",
                    payload: {
                      mushroom,
                      quantity: finalQuantity,
                      quality: finalQuality,
                    },
                  });

                  dispatch({
                    type: "TRIGGER_EVENT",
                    payload: { x: pendingEvent.tile.x, y: pendingEvent.tile.y },
                  });

                  setPendingEvent(null);
                };

                return (
                  <>
                    <h3>Found {mushroom.name}!</h3>
                    <p className="mushroom-info">
                      <span className={`rarity-badge ${mushroom.rarity}`}>
                        {mushroom.rarity.toUpperCase()}
                      </span>
                      {isPreferredBiome && (
                        <span className="native-badge">NATIVE</span>
                      )}
                    </p>
                    <p>{mushroom.description}</p>
                    <p>
                      Quality:{" "}
                      <span
                        className="quality-stars"
                        title={`Quality Rating: ${finalQuality}/100`}
                      >
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={`star ${finalQuality >= (i + 1) * 20 ? "filled" : ""}`}
                          >
                            ★
                          </span>
                        ))}
                        <span className="quality-value">
                          ({baseQuality}%{" "}
                          {isPreferredBiome && (
                            <span className="quality-bonus">
                              → {finalQuality}% (Native Bonus)
                            </span>
                          )}
                          )
                        </span>
                      </span>
                    </p>
                    <p>
                      Expected yield:{" "}
                      <span className="quantity-text">
                        {finalQuantity}{" "}
                        {isPreferredBiome && (
                          <span className="bonus">(+1 Native Bonus)</span>
                        )}
                      </span>
                    </p>
                    <p>
                      Value:{" "}
                      <span className="value-text">
                        {mushroom.baseValue} coins
                      </span>
                    </p>
                    <div className="button-row">
                      <button
                        className="collect-button"
                        onClick={handleCollect}
                      >
                        Collect {finalQuantity}{" "}
                        {finalQuantity > 1 ? "Mushrooms" : "Mushroom"}
                      </button>
                      <button
                        className="cancel-button"
                        onClick={() => setPendingEvent(null)}
                      >
                        Leave
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {pendingEvent?.type === "danger" && (
            <div className="event-dialog overlay">
              {(() => {
                const dangerTypes = [
                  {
                    name: "Wild Animal",
                    description: "A fierce creature attacks from the shadows!",
                    damage: Math.floor(Math.random() * 10) + 15, // 15-25 damage
                    image: "🐺",
                  },
                  {
                    name: "Hidden Trap",
                    description: "You stumble into a concealed hunting trap!",
                    damage: Math.floor(Math.random() * 15) + 10, // 10-25 damage
                    image: "⚔️",
                  },
                  {
                    name: "Poisonous Plants",
                    description: "You brush against some toxic vegetation!",
                    damage: Math.floor(Math.random() * 10) + 10, // 10-20 damage
                    image: "🌿",
                  },
                  {
                    name: "Treacherous Ground",
                    description: "The ground gives way beneath your feet!",
                    damage: Math.floor(Math.random() * 15) + 5, // 5-20 damage
                    image: "⚡",
                  },
                ];

                const danger =
                  dangerTypes[Math.floor(Math.random() * dangerTypes.length)];

                const handleContinue = () => {
                  dispatch({ type: "UPDATE_HEALTH", payload: -danger.damage });
                  dispatch({
                    type: "TRIGGER_EVENT",
                    payload: { x: pendingEvent.tile.x, y: pendingEvent.tile.y },
                  });
                  setPendingEvent(null);
                };

                return (
                  <>
                    <div className="danger-header">
                      <span className="danger-icon">{danger.image}</span>
                      <h3>{danger.name}!</h3>
                    </div>
                    <p>{danger.description}</p>
                    <div className="damage-display">
                      <span className="damage-text">-{danger.damage}</span>
                      <span className="damage-icon">❤️</span>
                    </div>
                    <div className="button-row">
                      <button
                        className="danger-button"
                        onClick={handleContinue}
                      >
                        Continue
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {pendingEvent?.type === "rest" && (
            <div className="event-dialog overlay">
              <h3>Rest Area Found!</h3>
              <p>Would you like to rest here? This will:</p>
              <ul style={{ textAlign: "left", margin: "1rem 0" }}>
                <li>
                  Restore{" "}
                  {Math.min(50, state.player.maxStamina - state.player.stamina)}{" "}
                  stamina
                </li>
                <li>Heal 10 health points</li>
                <li>Advance to the next day</li>
              </ul>
              <div className="button-row">
                <button className="collect-button" onClick={handleRest}>
                  Rest
                </button>
                <button
                  className="cancel-button"
                  onClick={() => setPendingEvent(null)}
                >
                  Continue Exploring
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <style>{`
        .game-over {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.9) !important;
          padding: 2rem !important;
          text-align: center;
          border: 2px solid #ff0000;
          z-index: 10;
        }

        .game-over h2 {
          color: #ff0000;
          margin-bottom: 1rem;
        }

        .game-over p {
          margin: 0.5rem 0;
        }

        .game-over button {
          margin-top: 1.5rem;
          background: #ff0000;
        }

        .exploration-scene {
          width: 100%;
          height: 60vh;
          position: relative;
          background: #1a1a1a;
          margin-bottom: 20px;
        }
        
        .overlay {
          position: relative;
          z-index: 1;
          background: rgba(0, 0, 0, 0.7);
          padding: 15px;
          border-radius: 8px;
          color: white;
          margin: 10px;
        }

        .event-dialog {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          max-width: 400px;
          text-align: center;
        }

        .warning-message {
          color: #ff4444;
          text-align: center;
          margin-top: 10px;
          animation: pulse 2s infinite;
        }

        button {
          background: #4a6741;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 10px;
        }

        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }

        button:disabled {
          background: #2a2a2a;
          cursor: not-allowed;
        }
        .mushroom-info {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin: 10px 0;
        }

        .rarity-badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
        }

        .rarity-badge.legendary {
          background: #FF00FF;
          color: white;
        }

        .rarity-badge.rare {
          background: #FFD700;
          color: black;
        }

        .rarity-badge.common {
          background: #8B4513;
          color: white;
        }

        .native-badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
          background: #4CAF50;
          color: white;
          animation: glowPulse 2s infinite;
          box-shadow: 0 0 10px #4CAF50;
        }

        @keyframes glowPulse {
          0% { box-shadow: 0 0 5px #4CAF50; }
          50% { box-shadow: 0 0 20px #4CAF50; }
          100% { box-shadow: 0 0 5px #4CAF50; }
        }

        .button-row {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .collect-button {
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
        }

        .collect-button::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%);
          transform: scale(0);
          opacity: 0;
          transition: transform 0.3s ease-out, opacity 0.3s ease-out;
        }

        .collect-button:hover {
          background: linear-gradient(45deg, #66bb6a, #81c784);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .collect-button:hover::after {
          transform: scale(1);
          opacity: 1;
        }

        .collect-button:active {
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .cancel-button {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.2s ease;
        }

        .cancel-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
          color: white;
        }

        .event-dialog {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          max-width: 400px;
          text-align: center;
          background: rgba(0, 0, 0, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
          animation: dialogFadeIn 0.3s ease-out forwards;
        }

        @keyframes dialogFadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -40%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        .rarity-badge.legendary {
          background: linear-gradient(45deg, #FF00FF, #FF69B4);
          box-shadow: 0 0 10px #FF00FF;
        }

        .rarity-badge.rare {
          background: linear-gradient(45deg, #FFD700, #FFA500);
          box-shadow: 0 0 10px #FFD700;
        }

        .quality-stars {
          color: #888;
          letter-spacing: 2px;
          cursor: help;
          padding: 2px 5px;
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }

        .quality-stars:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .quality-stars .star {
          transition: all 0.3s ease;
          display: inline-block;
        }

        .quality-stars .star.filled {
          color: #FFD700;
          text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
          transform: scale(1.1);
        }

        .quality-value {
          margin-left: 8px;
          font-size: 0.9em;
          opacity: 0.8;
          color: #aaa;
          white-space: nowrap;
        }

        .quality-bonus {
          color: #4CAF50;
          animation: qualityImprovement 0.5s ease-out;
          position: relative;
          display: inline-block;
        }

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

        .quality-stars .star.filled {
          color: #FFD700;
          text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
          transform: scale(1.1);
          animation: starPop 0.3s ease-out;
        }

        @keyframes starPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1.1); }
        }

        .event-dialog h3,
        .event-dialog p,
        .event-dialog .button-row {
          opacity: 0;
          transform: translateY(10px);
          animation: contentFadeIn 0.5s ease-out forwards;
        }

        .event-dialog h3 { animation-delay: 0.1s; }
        .event-dialog .mushroom-info { animation-delay: 0.2s; }
        .event-dialog p:nth-of-type(2) { animation-delay: 0.3s; }
        .event-dialog p:nth-of-type(3) { animation-delay: 0.4s; }
        .event-dialog p:nth-of-type(4) { animation-delay: 0.5s; }
        .event-dialog .button-row { animation-delay: 0.6s; }

        @keyframes contentFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .quantity-text {
          color: #4CAF50;
          font-weight: bold;
        }

        .quantity-text .bonus {
          color: #8BC34A;
          font-size: 0.9em;
          margin-left: 5px;
        }

        .value-text {
          color: #FFD700;
          font-weight: bold;
          text-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
        }
        .danger-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 1rem;
        }

        .danger-icon {
          font-size: 2rem;
          animation: dangerPulse 2s infinite;
        }

        .damage-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin: 1.5rem 0;
          font-size: 1.5rem;
        }

        .damage-text {
          color: #ff4444;
          font-weight: bold;
          font-size: 2rem;
        }

        .danger-button {
          background: linear-gradient(45deg, #d32f2f, #f44336);
          color: white;
          animation: dangerPulse 2s infinite;
        }

        .danger-button:hover {
          background: linear-gradient(45deg, #f44336, #e57373);
        }

        @keyframes dangerPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ExplorationPhase;
