import React, { useState } from "react";
import { useGame } from "../../context/GameContext";
import { InventoryItem, CraftedProduct, Mushroom } from "../../types";
import { mushrooms } from "../../data/mushrooms";

interface Recipe {
  id: string;
  name: string;
  type: "food" | "medicine" | "material" | "decoration";
  ingredients: {
    mushroomId: string;
    quantity: number;
  }[];
  result: {
    id: string;
    name: string;
    type: "food" | "medicine" | "material" | "decoration";
    baseValue: number;
    effects: string[];
  };
}

// Example recipes - in a real game, these would come from a data file
const recipes: Recipe[] = [
  {
    id: "healing-potion",
    name: "Healing Potion",
    type: "medicine",
    ingredients: [
      { mushroomId: "reishi-1", quantity: 2 },
      { mushroomId: "morel-1", quantity: 1 },
    ],
    result: {
      id: "healing-potion-1",
      name: "Healing Potion",
      type: "medicine",
      baseValue: 100,
      effects: ["Restores 50 health", "Provides energy boost"],
    },
  },
];

const CraftingPhase: React.FC = () => {
  const { state, dispatch } = useGame();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [crafting, setCrafting] = useState(false);

  const getMushroom = (mushroomId: string): Mushroom | undefined => {
    return mushrooms.find((m) => m.id === mushroomId);
  };

  // Check if player has required ingredients for a recipe
  const canCraftRecipe = (recipe: Recipe): boolean => {
    return recipe.ingredients.every((ingredient) => {
      const inventoryItem = state.inventory.find(
        (item) => item.mushroomId === ingredient.mushroomId,
      );
      return inventoryItem && inventoryItem.quantity >= ingredient.quantity;
    });
  };

  // Get ingredients from inventory for a recipe
  const getIngredientsForRecipe = (recipe: Recipe): InventoryItem[] => {
    return recipe.ingredients.map((ingredient) => {
      const inventoryItem = state.inventory.find(
        (item) => item.mushroomId === ingredient.mushroomId,
      );
      if (!inventoryItem) throw new Error("Missing ingredient");
      return {
        ...inventoryItem,
        quantity: ingredient.quantity, // Only use required quantity
      };
    });
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCraft = () => {
    if (!selectedRecipe) return;

    setCrafting(true);

    // Simulate crafting time
    setTimeout(() => {
      try {
        const ingredients = getIngredientsForRecipe(selectedRecipe);

        // Create crafted item
        const craftedItem: InventoryItem = {
          id: `${selectedRecipe.result.id}-${Date.now()}`,
          mushroomId: selectedRecipe.result.id,
          quantity: 1,
          quality: 100, // Base quality for crafted items
          price: selectedRecipe.result.baseValue,
        };

        // Update game state
        dispatch({
          type: "CRAFT_PRODUCT",
          payload: {
            ingredients,
            result: craftedItem,
          },
        });

        // Reset states
        setSelectedRecipe(null);
      } catch (error) {
        console.error("Crafting failed:", error);
      } finally {
        setCrafting(false);
      }
    }, 2000);
  };

  return (
    <div className="crafting-phase">
      <h2>Crafting</h2>

      {/* Available Recipes */}
      <div className="recipes">
        <h3>Available Recipes</h3>
        <div className="recipes-grid">
          {recipes.map((recipe) => {
            const canCraft = canCraftRecipe(recipe);
            return (
              <div
                key={recipe.id}
                className={`recipe-card ${selectedRecipe?.id === recipe.id ? "selected" : ""} ${
                  canCraft ? "available" : "unavailable"
                }`}
                onClick={() => canCraft && handleSelectRecipe(recipe)}
              >
                <h4>{recipe.name}</h4>
                <div className="recipe-type">{recipe.type}</div>
                <div className="ingredients-list">
                  <h5>Required Ingredients:</h5>
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => {
                      const mushroom = getMushroom(ingredient.mushroomId);
                      const inventoryItem = state.inventory.find(
                        (item) => item.mushroomId === ingredient.mushroomId,
                      );
                      return (
                        <li
                          key={index}
                          className={
                            inventoryItem &&
                            inventoryItem.quantity >= ingredient.quantity
                              ? "available"
                              : "missing"
                          }
                        >
                          {mushroom?.name} x{ingredient.quantity}
                          {inventoryItem && (
                            <span className="inventory-count">
                              (Have: {inventoryItem.quantity})
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="recipe-result">
                  <h5>Creates:</h5>
                  <p>{recipe.result.name}</p>
                  <p>Value: {recipe.result.baseValue} coins</p>
                  <div className="effects">
                    {recipe.result.effects.map((effect, index) => (
                      <span key={index} className="effect">
                        {effect}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Crafting Interface */}
      {selectedRecipe && (
        <div className="crafting-interface">
          <h3>Craft {selectedRecipe.name}</h3>
          <div className="crafting-details">
            <div className="ingredients-required">
              <h4>Required Ingredients:</h4>
              <ul>
                {selectedRecipe.ingredients.map((ingredient, index) => {
                  const mushroom = getMushroom(ingredient.mushroomId);
                  return (
                    <li key={index}>
                      {mushroom?.name} x{ingredient.quantity}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="result-preview">
              <h4>Will Create:</h4>
              <p>{selectedRecipe.result.name}</p>
              <p className="value">
                Value: {selectedRecipe.result.baseValue} coins
              </p>
              <div className="effects">
                {selectedRecipe.result.effects.map((effect, index) => (
                  <p key={index} className="effect">
                    {effect}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={handleCraft}
            disabled={crafting || !canCraftRecipe(selectedRecipe)}
          >
            {crafting ? "Crafting..." : "Craft Item"}
          </button>
        </div>
      )}

      {/* Crafted Items Inventory */}
      <div className="crafted-inventory">
        <h3>Crafted Items</h3>
        {state.inventory.filter((item) => item.mushroomId.includes("crafted"))
          .length === 0 ? (
          <p>No crafted items in inventory.</p>
        ) : (
          <div className="crafted-items-grid">
            {state.inventory
              .filter((item) => item.mushroomId.includes("crafted"))
              .map((item) => (
                <div key={item.id} className="crafted-item-card">
                  <h4>{item.mushroomId.split("-")[0]}</h4>
                  <div className="item-details">
                    <span>Quantity: {item.quantity}</span>
                    <span>Value: {item.price} coins</span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CraftingPhase;
