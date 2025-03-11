import { BiomeType, MushroomType } from "../types";

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
    legendary: MushroomType[];
  };
}

export const getTerrainProperties = (type: BiomeType): TerrainProperties => {
  switch (type) {
    case "mountain":
      return {
        costs: { stamina: 15, health: 0 },
        description: "Steep terrain requires more stamina to traverse.",
        mushroomChance: 0.1, // 10% chance
        dangerChance: 0.15, // 15% chance
        restChance: 0.05, // 5% chance
        mushrooms: {
          common: ["bolete", "russula"],
          rare: ["chanterelle"],
          legendary: ["morel"],
        },
      };
    case "swamp":
      return {
        costs: { stamina: 12, health: 5 },
        description: "Hazardous terrain damages health and drains stamina.",
        mushroomChance: 0.2, // 20% chance
        dangerChance: 0.15, // 15% chance
        restChance: 0.05, // 5% chance
        mushrooms: {
          common: ["russula"],
          rare: ["morel"],
          legendary: ["chanterelle"],
        },
      };
    case "cave":
      return {
        costs: { stamina: 8, health: 10 },
        description: "Dark and dangerous, but easier to move through.",
        mushroomChance: 0.25, // 25% chance
        dangerChance: 0.2, // 20% chance
        restChance: 0.05, // 5% chance
        mushrooms: {
          common: ["morel"],
          rare: ["bolete"],
          legendary: ["russula"],
        },
      };
    case "forest":
    default:
      return {
        costs: { stamina: 10, health: 0 },
        description: "Standard terrain with balanced stamina cost.",
        mushroomChance: 0.15, // 15% chance
        dangerChance: 0.1, // 10% chance
        restChance: 0.1, // 10% chance
        mushrooms: {
          common: ["bolete", "russula"],
          rare: ["morel"],
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

// Helper function to get a random mushroom type based on rarity and biome
export const getRandomMushroomForBiome = (
  biome: BiomeType,
  rarity: "common" | "rare" | "legendary"
): MushroomType => {
  const biomeProps = getTerrainProperties(biome);
  const possibleMushrooms = biomeProps.mushrooms[rarity];
  return possibleMushrooms[
    Math.floor(Math.random() * possibleMushrooms.length)
  ];
};
