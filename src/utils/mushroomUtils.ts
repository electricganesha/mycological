import { BiomeType, Mushroom, MushroomRarity, MushroomType } from "../types";
import { getTerrainProperties } from "./terrainUtils";

export const generateMushroom = (biome: BiomeType): Mushroom => {
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
  const isPreferredBiome = biomeProps.mushrooms[rarity].includes(mushroomType);
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

// Helper function to get a random mushroom type based on rarity and biome
const getRandomMushroomForBiome = (
  biome: BiomeType,
  rarity: "common" | "rare" | "legendary"
): MushroomType => {
  const biomeProps = getTerrainProperties(biome);
  const possibleMushrooms = biomeProps.mushrooms[rarity];
  return possibleMushrooms[
    Math.floor(Math.random() * possibleMushrooms.length)
  ];
};
