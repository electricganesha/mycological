import { FC } from "react";
import { useGame } from "../../context/GameContext";
import "./Inventory.css";

// filepath: /home/cmarques/projects/personal/mycological/src/components/ui/Inventory.tsx

export const Inventory: FC = () => {
  const { state } = useGame();

  return (
    <div className="inventory">
      <h1>Inventory</h1>
      <div className="inventory-items">
        {state.inventory.length > 0 ? (
          state.inventory.map((item) => (
            <div key={item.id} className="inventory-item">
              <span>
                <b>{item.mushroom.name}</b>
              </span>
              <span>Quantity: {item.quantity}</span>
              <span>Quality: {item.quality}</span>
            </div>
          ))
        ) : (
          <span>No items in inventory</span>
        )}
      </div>
    </div>
  );
};
