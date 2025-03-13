import { GameAction } from "../context/GameContext";
import { BiomeType, MapTile, MushroomType, Position } from "../types";
import { getAdjacentTiles } from "./mapGenerator";

interface TerrainCosts {
  stamina: number;
  health: number;
}

interface TerrainProperties {
  costs: TerrainCosts;
  description: string;
  mushroomChance: number;
  dangerChance: number;
  restChance: number;
  mushrooms: {
    common: MushroomType[];
    rare: MushroomType[];
    uncommon: MushroomType[];
    legendary: MushroomType[];
  };
}

export const getTerrainProperties = (type: BiomeType): TerrainProperties => {
  switch (type) {
    case "empty":
      return {
        costs: { stamina: 5, health: 0 },
        description: "A clear, safe area with no hazards.",
        mushroomChance: 0, // No mushrooms in empty tiles
        dangerChance: 0, // No dangers in empty tiles
        restChance: 0, // No rest spots in empty tiles
        mushrooms: {
          common: [],
          rare: [],
          uncommon: [],
          legendary: [],
        },
      };
    case "mountain":
      return {
        costs: { stamina: 15, health: 0 },
        description: "Steep terrain requires more stamina to traverse.",
        mushroomChance: 0.1, // 10% chance
        dangerChance: 0.15, // 15% chance
        restChance: 0.05, // 15% chance
        mushrooms: {
          common: ["bolete", "russula"],
          rare: ["chanterelle"],
          uncommon: ["morel"],
          legendary: ["morel"],
        },
      };
    case "swamp":
      return {
        costs: { stamina: 12, health: 5 },
        description: "Hazardous terrain damages health and drains stamina.",
        mushroomChance: 0.2, // 20% chance
        dangerChance: 0.15, // 15% chance
        restChance: 0.05, // 15% chance
        mushrooms: {
          common: ["russula"],
          rare: ["morel"],
          uncommon: ["bolete"],
          legendary: ["chanterelle"],
        },
      };
    case "cave":
      return {
        costs: { stamina: 8, health: 10 },
        description: "Dark and dangerous, but easier to move through.",
        mushroomChance: 0.25, // 25% chance
        dangerChance: 0.2, // 20% chance
        restChance: 0.15, // 15% chance
        mushrooms: {
          common: ["morel"],
          rare: ["bolete"],
          uncommon: ["chanterelle"],
          legendary: ["russula"],
        },
      };
    case "meadow":
      return {
        costs: { stamina: 8, health: 0 },
        description: "Open fields with easy terrain and abundant mushrooms.",
        mushroomChance: 0.25, // 25% chance - good for mushrooms
        dangerChance: 0.05, // 5% chance - very safe
        restChance: 0.05, // 15% chance
        mushrooms: {
          common: ["bolete", "chanterelle"],
          rare: ["russula"],
          uncommon: ["russula"],
          legendary: ["morel"],
        },
      };
    case "forest":
    default:
      return {
        costs: { stamina: 10, health: 0 },
        description: "Standard terrain with balanced stamina cost.",
        mushroomChance: 0.15, // 15% chance
        dangerChance: 0.1, // 10% chance
        restChance: 0.05, // 15% chance
        mushrooms: {
          common: ["bolete", "russula"],
          rare: ["morel"],
          uncommon: ["russula"],
          legendary: ["chanterelle"],
        },
      };
  }
};

export const getTerrainCosts = (type: BiomeType): TerrainCosts => {
  return getTerrainProperties(type).costs;
};

export const getTerrainDescription = (type: BiomeType): string => {
  return getTerrainProperties(type).description;
};

export const moveDangerEvents = ({
  tiles,
  width,
  height,
  playerPosition,
  dispatch,
}: {
  tiles: MapTile[][];
  width: number;
  height: number;
  playerPosition: Position;
  dispatch: (value: GameAction) => void;
}) => {
  const newTiles = [...tiles];
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
      const newX = Math.floor(Math.random() * width);
      const newY = Math.floor(Math.random() * height);
      const targetTile = newTiles[newY][newX];

      // Don't place on player, player-adjacent tiles, or tiles with events
      const isPlayerAdjacent = getAdjacentTiles(
        playerPosition.x,
        playerPosition.y,
        width,
        height
      ).some((pos) => pos.x === newX && pos.y === newY);

      if (
        !targetTile.hasEvent &&
        !(newX === playerPosition.x && newY === playerPosition.y) &&
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

export const canMoveToTile = (
  tile: MapTile,
  playerPosition: Position,
  width: number,
  height: number,
  stamina: number,
  health: number
): { canMove: boolean; reason?: string } => {
  const { x, y } = tile;

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
  if (stamina < costs.stamina) {
    return {
      canMove: false,
      reason: `Not enough stamina! Need ${costs.stamina} stamina to move here.`,
    };
  }

  // Check if health cost would kill the player
  if (costs.health > 0 && health <= costs.health) {
    return {
      canMove: false,
      reason: `Too dangerous! Moving here would be fatal.`,
    };
  }

  return { canMove: true };
};

export const getTilePosition = (
  x: number,
  y: number,
  width: number,
  height: number
): [number, number, number] => {
  const size = 1.2;
  const xPos = x * size * Math.sqrt(3) + (y % 2) * ((size * Math.sqrt(3)) / 2);
  const zPos = y * size * 1.5;
  const visualWidth = width * size * Math.sqrt(3);
  const visualHeight = height * size * 1.5;
  return [xPos - visualWidth / 2, 0, zPos - visualHeight / 2];
};
