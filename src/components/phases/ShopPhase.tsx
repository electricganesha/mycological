import React, { useState } from "react";
import { useGame } from "../../context/GameContext";
import { InventoryItem, Mushroom } from "../../types";
import { mushrooms } from "../../data/mushrooms";

const ShopPhase: React.FC = () => {
  const { state, dispatch } = useGame();
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [sellQuantity, setSellQuantity] = useState(1);
  const [sellingPrice, setSellingPrice] = useState(0);

  // Get only identified mushrooms from inventory
  const sellableItems = state.inventory.filter((item) => {
    const mushroom = mushrooms.find((m) => m.id === item.mushroomId);
    return mushroom && state.knownMushrooms.some((km) => km.id === mushroom.id);
  });

  const getMushroom = (mushroomId: string): Mushroom | undefined => {
    return mushrooms.find((m) => m.id === mushroomId);
  };

  const calculateSuggestedPrice = (item: InventoryItem): number => {
    const mushroom = getMushroom(item.mushroomId);
    if (!mushroom) return 0;

    // Base calculation using mushroom value and quality
    const basePrice = mushroom.baseValue * (item.quality / 100);

    // Rarity multiplier
    const rarityMultipliers = {
      common: 1,
      uncommon: 1.5,
      rare: 2.5,
      legendary: 5,
    };

    return Math.round(basePrice * rarityMultipliers[mushroom.rarity]);
  };

  const handleSelectItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setSellQuantity(1);
    setSellingPrice(calculateSuggestedPrice(item));
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (selectedItem && value > 0 && value <= selectedItem.quantity) {
      setSellQuantity(value);
    }
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value >= 0) {
      setSellingPrice(value);
    }
  };

  const handleSell = () => {
    if (!selectedItem) return;

    dispatch({
      type: "SELL_MUSHROOM",
      payload: {
        itemId: selectedItem.id,
        price: sellingPrice,
        quantity: sellQuantity,
      },
    });

    // Reset selection if all items were sold
    if (sellQuantity >= selectedItem.quantity) {
      setSelectedItem(null);
      setSellQuantity(1);
      setSellingPrice(0);
    } else {
      setSellQuantity(1);
    }
  };

  return (
    <div className="shop-phase">
      <h2>{state.shop.name}</h2>

      {/* Shop Status */}
      <div className="shop-status">
        <div className="status-item">
          <span>Cash:</span>
          <span>{state.shop.cash} coins</span>
        </div>
        <div className="status-item">
          <span>Reputation:</span>
          <span>{state.shop.reputation} points</span>
        </div>
        <div className="status-item">
          <span>Level:</span>
          <span>{state.shop.level}</span>
        </div>
      </div>

      {/* Inventory for Sale */}
      <div className="sellable-inventory">
        <h3>Available Items</h3>
        {sellableItems.length === 0 ? (
          <p>No items available for sale.</p>
        ) : (
          <div className="items-grid">
            {sellableItems.map((item) => {
              const mushroom = getMushroom(item.mushroomId);
              if (!mushroom) return null;

              return (
                <div
                  key={item.id}
                  className={`item-card ${selectedItem?.id === item.id ? "selected" : ""}`}
                  onClick={() => handleSelectItem(item)}
                >
                  <h4>{mushroom.name}</h4>
                  <div className="item-details">
                    <span>Quantity: {item.quantity}</span>
                    <span>Quality: {item.quality}%</span>
                  </div>
                  <div className="item-value">
                    <span>Base Value: {mushroom.baseValue} coins</span>
                    <span>Rarity: {mushroom.rarity}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Selling Interface */}
      {selectedItem && (
        <div className="selling-interface">
          <h3>Sell Items</h3>
          <div className="selling-controls">
            <div className="control-group">
              <label>Quantity:</label>
              <input
                type="number"
                min={1}
                max={selectedItem.quantity}
                value={sellQuantity}
                onChange={handleQuantityChange}
              />
              <span>/ {selectedItem.quantity}</span>
            </div>
            <div className="control-group">
              <label>Price per item:</label>
              <input
                type="number"
                min={0}
                value={sellingPrice}
                onChange={handlePriceChange}
              />
              <span>coins</span>
            </div>
            <div className="total-calculation">
              <span>Total: {sellingPrice * sellQuantity} coins</span>
            </div>
            <button
              onClick={handleSell}
              disabled={sellQuantity <= 0 || sellingPrice <= 0}
            >
              Sell Items
            </button>
          </div>
        </div>
      )}

      {/* Shop Upgrades */}
      <div className="shop-upgrades">
        <h3>Available Upgrades</h3>
        {state.shop.upgrades.length === 0 ? (
          <p>No upgrades available.</p>
        ) : (
          <div className="upgrades-grid">
            {state.shop.upgrades
              .filter((upgrade) => !upgrade.applied)
              .map((upgrade) => (
                <div key={upgrade.id} className="upgrade-card">
                  <h4>{upgrade.name}</h4>
                  <p>{upgrade.description}</p>
                  <div className="upgrade-requirements">
                    {upgrade.requirements.level && (
                      <span>Required Level: {upgrade.requirements.level}</span>
                    )}
                    {upgrade.requirements.reputation && (
                      <span>
                        Required Reputation: {upgrade.requirements.reputation}
                      </span>
                    )}
                    {upgrade.requirements.cash && (
                      <span>Cost: {upgrade.requirements.cash} coins</span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPhase;
