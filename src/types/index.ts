export type BiomeType = "forest" | "mountain" | "swamp" | "cave";

export type MushroomType = "bolete" | "morel" | "chanterelle" | "russula";
export type MushroomRarity = "common" | "rare" | "legendary";

export type EventType = "mushroom" | "danger" | "rest";

export interface MapTile {
  x: number;
  y: number;
  type: BiomeType;
  discovered: boolean;
  hasEvent: boolean;
  eventType?: EventType;
}

export interface Position {
  x: number;
  y: number;
}

export interface GameMap {
  tiles: MapTile[][];
  playerPosition: Position;
  width: number;
  height: number;
}

export interface Mushroom {
  id: string;
  name: string;
  type: MushroomType;
  rarity: MushroomRarity;
  biomes: BiomeType[];
  properties: string[];
  baseValue: number;
  scientificName: string;
  description: string;
  imageUrl: string;
  identified: boolean;
  color: string;
}

export interface Player {
  health: number;
  maxHealth: number;
  stamina: number;
  maxStamina: number;
}

export interface GameState {
  currentDay: number;
  player: Player;
  explorationMap: GameMap;
  inventory: {
    mushroom: Mushroom;
    quantity: number;
    quality: number;
  }[];
}
