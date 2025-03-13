import { BiomeType, MapTile, GameMap } from "../types";
import { getTerrainProperties } from "./terrainUtils";

const getRandomBiome = (): BiomeType => {
  const biomes: BiomeType[] = ["forest", "mountain", "swamp", "cave", "meadow"];
  const weights = [0.3, 0.15, 0.15, 0.15, 0.25]; // Forest and meadow are more common
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
  height: number
): { x: number; y: number }[] => {
  // For a pointy-top hex grid, odd rows are offset
  const isOddRow = y % 2 === 1;
  // For pointy-top hexagonal grid in odd-row offset coordinates
  // Each hex has 6 neighbors: two horizontal and four diagonal
  const neighbors: Array<[number, number]> = [
    [-1, 0], // West
    [1, 0], // East
    [isOddRow ? 0 : -1, -1], // Northwest
    [isOddRow ? 1 : 0, -1], // Northeast
    [isOddRow ? 0 : -1, 1], // Southwest
    [isOddRow ? 1 : 0, 1], // Southeast
  ];

  const adjacentPositions = neighbors.map(([dx, dy]) => ({
    x: x + dx,
    y: y + dy,
  }));

  return adjacentPositions.filter((pos) =>
    isInBounds(pos.x, pos.y, width, height)
  );
};

// Check if a tile is within map bounds
export const isInBounds = (
  x: number,
  y: number,
  width: number,
  height: number
): boolean => {
  return x >= 0 && x < width && y >= 0 && y < height;
};

// Generate random events for tiles based on terrain properties
const generateEvent = (
  biome: BiomeType
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

  // Override the starting tile to be empty and discovered
  tiles[startY][startX] = {
    x: startX,
    y: startY,
    type: "empty",
    discovered: true,
    hasEvent: false,
  };

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
