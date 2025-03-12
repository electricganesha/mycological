import { createContext, useContext, useReducer, ReactNode } from "react";
import {
  GameState,
  Mushroom,
  ExplorationArea,
  InventoryItem,
  GameMap,
  MapTile,
} from "../types";
import { mushrooms } from "../data/mushrooms";
import { explorationAreas } from "../data/areas";
import {
  generateMap,
  getAdjacentTiles,
  isInBounds,
} from "../utils/mapGenerator";

// Initial game state
const initialGameState: GameState = {
  player: {
    name: "Finn Fungus",
    stamina: 100,
    maxStamina: 100,
    health: 100,
    maxHealth: 100,
    skills: ["Identification", "Foraging"],
    companions: [
      {
        id: "truffle",
        name: "Truffle",
        type: "companion",
        skills: ["Tracking", "Digging"],
        imageUrl: "/assets/characters/truffle.png",
      },
    ],
  },
  shop: {
    id: "spore-sanctuary",
    name: "Spore Sanctuary",
    level: 1,
    reputation: 0,
    upgrades: [],
    inventory: [],
    cash: 100,
  },
  inventory: [],
  knownMushrooms: [],
  discoveredAreas: [explorationAreas[0]], // Start with Mosswood Forest discovered
  currentDay: 1,
  gamePhase: "exploration",
  explorationMap: generateMap(10, 10), // Initialize with a 10x10 map
};

// Action types
type GameAction =
  | { type: "SET_PLAYER_NAME"; payload: string }
  | { type: "SET_SHOP_NAME"; payload: string }
  | { type: "CHANGE_GAME_PHASE"; payload: GameState["gamePhase"] }
  | { type: "DISCOVER_AREA"; payload: ExplorationArea }
  | { type: "SET_CURRENT_AREA"; payload: ExplorationArea | undefined }
  | {
      type: "COLLECT_MUSHROOM";
      payload: { mushroom: Mushroom; quantity: number; quality: number };
    }
  | { type: "IDENTIFY_MUSHROOM"; payload: Mushroom }
  | {
      type: "SELL_MUSHROOM";
      payload: { itemId: string; price: number; quantity: number };
    }
  | {
      type: "CRAFT_PRODUCT";
      payload: { ingredients: InventoryItem[]; result: InventoryItem };
    }
  | { type: "ADVANCE_DAY" }
  | { type: "UPDATE_STAMINA"; payload: number }
  | { type: "UPDATE_HEALTH"; payload: number }
  | { type: "UPDATE_CASH"; payload: number }
  | { type: "UPDATE_REPUTATION"; payload: number }
  | { type: "MOVE_PLAYER"; payload: { x: number; y: number } }
  | { type: "GENERATE_NEW_MAP"; payload: { width: number; height: number } }
  | { type: "TRIGGER_EVENT"; payload: { x: number; y: number } }
  | { type: "UPDATE_MAP_TILES"; payload: MapTile[][] };

// Reducer function
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "MOVE_PLAYER": {
      const { x, y } = action.payload;
      const newMap = { ...state.explorationMap };

      // Update player position
      newMap.playerPosition = { x, y };

      // Discover current and adjacent tiles
      newMap.tiles[y][x].discovered = true;
      const adjacentTiles = getAdjacentTiles(x, y, newMap.width, newMap.height);
      adjacentTiles.forEach(({ x: ax, y: ay }) => {
        newMap.tiles[ay][ax].discovered = true;
      });

      return {
        ...state,
        explorationMap: newMap,
      };
    }

    case "GENERATE_NEW_MAP":
      return {
        ...state,
        explorationMap: generateMap(
          action.payload.width,
          action.payload.height
        ),
      };

    case "TRIGGER_EVENT": {
      const { x, y } = action.payload;
      const tile = state.explorationMap.tiles[y][x];

      // Clear the event from the tile
      const newMap = { ...state.explorationMap };
      newMap.tiles[y][x] = { ...tile, hasEvent: false, eventType: undefined };

      return {
        ...state,
        explorationMap: newMap,
      };
    }

    case "UPDATE_HEALTH": {
      const newHealth = Math.max(
        0,
        Math.min(state.player.maxHealth, state.player.health + action.payload)
      );
      return {
        ...state,
        player: {
          ...state.player,
          health: newHealth,
        },
      };
    }

    case "SET_PLAYER_NAME":
      return {
        ...state,
        player: {
          ...state.player,
          name: action.payload,
        },
      };

    case "SET_SHOP_NAME":
      return {
        ...state,
        shop: {
          ...state.shop,
          name: action.payload,
        },
      };

    case "CHANGE_GAME_PHASE":
      return {
        ...state,
        gamePhase: action.payload,
      };

    case "DISCOVER_AREA":
      if (
        !state.discoveredAreas.some((area) => area.id === action.payload.id)
      ) {
        return {
          ...state,
          discoveredAreas: [...state.discoveredAreas, action.payload],
        };
      }
      return state;

    case "SET_CURRENT_AREA":
      return {
        ...state,
        currentArea: action.payload,
      };

    case "COLLECT_MUSHROOM": {
      const { mushroom, quantity, quality } = action.payload;

      const existingItemIndex = state.inventory.findIndex(
        (item) => item.mushroom.id === mushroom.id && item.quality === quality
      );

      let updatedInventory;
      if (existingItemIndex >= 0) {
        updatedInventory = [...state.inventory];
        updatedInventory[existingItemIndex] = {
          ...updatedInventory[existingItemIndex],
          quantity: updatedInventory[existingItemIndex].quantity + quantity,
        };
      } else {
        updatedInventory = [
          ...state.inventory,
          {
            id: `${mushroom.id}-${Date.now()}`,
            mushroom,
            quantity,
            quality,
            price: 0,
          },
        ];
      }

      return {
        ...state,
        inventory: updatedInventory,
      };
    }

    case "IDENTIFY_MUSHROOM": {
      if (!state.knownMushrooms.some((m) => m.id === action.payload.id)) {
        return {
          ...state,
          knownMushrooms: [
            ...state.knownMushrooms,
            { ...action.payload, identified: true },
          ],
        };
      }
      return state;
    }

    case "SELL_MUSHROOM": {
      const { itemId, price, quantity } = action.payload;
      const itemIndex = state.inventory.findIndex((item) => item.id === itemId);
      if (itemIndex < 0) return state;

      const item = state.inventory[itemIndex];
      const totalPrice = price * quantity;

      let updatedInventory;
      if (item.quantity <= quantity) {
        updatedInventory = state.inventory.filter(
          (_, index) => index !== itemIndex
        );
      } else {
        updatedInventory = [...state.inventory];
        updatedInventory[itemIndex] = {
          ...item,
          quantity: item.quantity - quantity,
        };
      }

      return {
        ...state,
        inventory: updatedInventory,
        shop: {
          ...state.shop,
          cash: state.shop.cash + totalPrice,
        },
      };
    }

    case "CRAFT_PRODUCT": {
      const updatedInventory = [...state.inventory];

      for (const ingredient of action.payload.ingredients) {
        const itemIndex = updatedInventory.findIndex(
          (item) => item.id === ingredient.id
        );
        if (itemIndex >= 0) {
          if (updatedInventory[itemIndex].quantity <= ingredient.quantity) {
            updatedInventory.splice(itemIndex, 1);
          } else {
            updatedInventory[itemIndex] = {
              ...updatedInventory[itemIndex],
              quantity:
                updatedInventory[itemIndex].quantity - ingredient.quantity,
            };
          }
        }
      }

      updatedInventory.push(action.payload.result);

      return {
        ...state,
        inventory: updatedInventory,
      };
    }

    case "ADVANCE_DAY":
      return {
        ...state,
        currentDay: state.currentDay + 1,
        player: {
          ...state.player,
          stamina: state.player.maxStamina,
        },
      };

    case "UPDATE_CASH":
      return {
        ...state,
        shop: {
          ...state.shop,
          cash: Math.max(0, state.shop.cash + action.payload),
        },
      };

    case "UPDATE_REPUTATION":
      return {
        ...state,
        shop: {
          ...state.shop,
          reputation: state.shop.reputation + action.payload,
        },
      };

    case "UPDATE_STAMINA": {
      const newStamina = Math.max(
        0,
        Math.min(state.player.maxStamina, state.player.stamina + action.payload)
      );
      return {
        ...state,
        player: {
          ...state.player,
          stamina: newStamina,
        },
      };
    }

    case "UPDATE_MAP_TILES": {
      return {
        ...state,
        explorationMap: {
          ...state.explorationMap,
          tiles: action.payload,
        },
      };
    }

    default:
      return state;
  }
}

// Create context
interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider component
interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

// Custom hook for using the game context
export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
