import React, { useState } from "react";
import { useGame } from "../../context/GameContext";
import { Mushroom, InventoryItem } from "../../types";
import { mushrooms } from "../../data/mushrooms";

const IdentificationPhase: React.FC = () => {
  const { state, dispatch } = useGame();
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [identifying, setIdentifying] = useState(false);

  // Get unidentified mushrooms from inventory
  const unidentifiedItems = state.inventory.filter((item) => {
    const mushroom = mushrooms.find((m) => m.id === item.mushroomId);
    return (
      mushroom && !state.knownMushrooms.some((km) => km.id === mushroom.id)
    );
  });

  const getMushroom = (mushroomId: string): Mushroom | undefined => {
    return mushrooms.find((m) => m.id === mushroomId);
  };

  const handleSelectItem = (item: InventoryItem) => {
    setSelectedItem(item);
  };

  const handleIdentification = () => {
    if (!selectedItem) return;

    const mushroom = getMushroom(selectedItem.mushroomId);
    if (!mushroom) return;

    setIdentifying(true);

    // Simulate identification time
    setTimeout(() => {
      // Identify the mushroom
      dispatch({
        type: "IDENTIFY_MUSHROOM",
        payload: mushroom,
      });

      // Reset states
      setIdentifying(false);
      setSelectedItem(null);
    }, 2000);
  };

  return (
    <div className="identification-phase">
      <h2>Identification</h2>

      {/* Unidentified Items List */}
      <div className="unidentified-items">
        <h3>Unidentified Specimens</h3>
        {unidentifiedItems.length === 0 ? (
          <p>No unidentified mushrooms in inventory.</p>
        ) : (
          <div className="items-grid">
            {unidentifiedItems.map((item) => {
              const mushroom = getMushroom(item.mushroomId);
              if (!mushroom) return null;

              return (
                <div
                  key={item.id}
                  className={`item-card ${selectedItem?.id === item.id ? "selected" : ""}`}
                  onClick={() => handleSelectItem(item)}
                >
                  <h4>Unknown Specimen</h4>
                  <div className="item-details">
                    <span>Quantity: {item.quantity}</span>
                    <span>Quality: {item.quality}%</span>
                  </div>
                  <div className="item-observations">
                    <p>Notes:</p>
                    <ul>
                      <li>
                        Found in{" "}
                        {state.discoveredAreas.find((area) =>
                          mushroom.biomes.includes(area.biome),
                        )?.name || "unknown location"}
                      </li>
                      {mushroom.properties
                        .slice(0, 2)
                        .map((property, index) => (
                          <li key={index}>{property}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Selected Item Details */}
      {selectedItem && (
        <div className="selected-item-details">
          <h3>Selected Specimen</h3>
          <div className="identification-actions">
            <button onClick={handleIdentification} disabled={identifying}>
              {identifying ? "Identifying..." : "Identify Specimen"}
            </button>
          </div>
        </div>
      )}

      {/* Known Mushrooms */}
      <div className="known-mushrooms">
        <h3>Identified Mushrooms</h3>
        {state.knownMushrooms.length === 0 ? (
          <p>No identified mushrooms yet.</p>
        ) : (
          <div className="mushrooms-grid">
            {state.knownMushrooms.map((mushroom) => (
              <div key={mushroom.id} className="mushroom-card">
                <h4>{mushroom.name}</h4>
                <p className="scientific-name">{mushroom.scientificName}</p>
                <div className="mushroom-details">
                  <span>Type: {mushroom.type}</span>
                  <span>Rarity: {mushroom.rarity}</span>
                  <span>Value: {mushroom.baseValue} coins</span>
                </div>
                <p className="mushroom-description">{mushroom.description}</p>
                <div className="mushroom-properties">
                  <p>Properties:</p>
                  <ul>
                    {mushroom.properties.map((property, index) => (
                      <li key={index}>{property}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IdentificationPhase;
