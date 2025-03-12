export type BiomeType = "forest" | "mountain" | "swamp" | "cave" | "meadow";

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

export type GamePhase = "exploration" | "identification" | "shop" | "crafting";

export interface Companion {
  id: string;
  name: string;
  type: string;
  skills: string[];
  imageUrl: string;
}

export interface Player {
  name: string;
  health: number;
  maxHealth: number;
  stamina: number;
  maxStamina: number;
  skills: string[];
  companions: Companion[];
}

export interface Shop {
  id: string;
  name: string;
  level: number;
  reputation: number;
  upgrades: string[];
  inventory: any[];
  cash: number;
}

export interface ExplorationArea {
  id: string;
  name: string;
  description: string;
  biome: BiomeType;
}

export interface InventoryItem {
  id: string;
  mushroom: Mushroom;
  quantity: number;
  quality: number;
  price?: number;
}

export interface GameState {
  shop: Shop;
  knownMushrooms: Mushroom[];
  discoveredAreas: ExplorationArea[];
  currentArea?: ExplorationArea;
  currentDay: number;
  gamePhase: GamePhase;
  player: Player;
  explorationMap: GameMap;
  inventory: InventoryItem[];
}
