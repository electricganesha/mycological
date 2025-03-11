import { BiomeType, MapTile, GameMap } from "../types";
import { getTerrainProperties } from "./terrainUtils";

const getRandomBiome = (): BiomeType => {
  const biomes: BiomeType[] = ["forest", "mountain", "swamp", "cave"];
  const weights = [0.4, 0.2, 0.2, 0.2]; // Forest is more common
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const random = Math.random() * totalWeight;

  let weightSum = 0;
  for (let i = 0; i < biomes.length; i++) {
    weightSum += weights[i];
    if (random <= weightSum) {
      return biomes[i];
    }
  }
  return "forest";
};

// Get adjacent hexagonal coordinates
export const getAdjacentTiles = (
  x: number,
  y: number,
  width: number,
  height: number,
): { x: number; y: number }[] => {
  // For a pointy-top hex grid, odd rows are offset
  const isOddRow = y % 2 === 1;
  const offsets = [
    // Even rows           // Odd rows
    [-1, 0], // Left      [-1, 0]
    [1, 0], // Right     [1, 0]
    [0, -1], // Up-Left   [-1, -1]
    [1, -1], // Up-Right  [0, -1]
    [0, 1], // Down-Left [-1, 1]
    [1, 1], // Down-Right[0, 1]
  ]
    .map(([dx, dy]) => [dx + (isOddRow ? -0.5 : 0), dy])
    .map(([dx, dy]) => ({
      x: Math.round(x + dx),
      y: y + dy,
    }));

  return offsets.filter(({ x, y }) => isInBounds(x, y, width, height));
};

// Check if a tile is within map bounds
export const isInBounds = (
  x: number,
  y: number,
  width: number,
  height: number,
): boolean => {
  return x >= 0 && x < width && y >= 0 && y < height;
};

// Generate random events for tiles based on terrain properties
const generateEvent = (
  biome: BiomeType,
): { hasEvent: boolean; eventType?: "mushroom" | "danger" | "rest" } => {
  const properties = getTerrainProperties(biome);
  const chance = Math.random();
  let cumulativeChance = 0;

  // Check chances in order: mushrooms, danger, rest
  cumulativeChance += properties.mushroomChance;
  if (chance < cumulativeChance) {
    return { hasEvent: true, eventType: "mushroom" };
  }

  cumulativeChance += properties.dangerChance;
  if (chance < cumulativeChance) {
    return { hasEvent: true, eventType: "danger" };
  }

  cumulativeChance += properties.restChance;
  if (chance < cumulativeChance) {
    return { hasEvent: true, eventType: "rest" };
  }

  return { hasEvent: false };
};

// Generate a new map with the specified dimensions
export const generateMap = (width: number, height: number): GameMap => {
  const tiles: MapTile[][] = [];

  // Create tiles
  for (let y = 0; y < height; y++) {
    tiles[y] = [];
    for (let x = 0; x < width; x++) {
      const biome = getRandomBiome();
      const { hasEvent, eventType } = generateEvent(biome);
      tiles[y][x] = {
        x,
        y,
        type: biome,
        discovered: false,
        hasEvent,
        eventType,
      };
    }
  }

  // Set starting position in the center bottom of the map
  const startX = Math.floor(width / 2);
  const startY = height - 1;
  tiles[startY][startX].discovered = true;

  // Discover adjacent tiles to starting position
  getAdjacentTiles(startX, startY, width, height).forEach(({ x, y }) => {
    if (isInBounds(x, y, width, height)) {
      tiles[y][x].discovered = true;
    }
  });

  return {
    tiles,
    playerPosition: { x: startX, y: startY },
    width,
    height,
  };
};
