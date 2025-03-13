import { FC } from "react";
import {
  RarityBadge,
  NativeBadge,
  QualityStars,
  ButtonRow,
  CollectButton,
  CancelButton,
  MushroomInfo,
  QualityValue,
  QualityBonus,
  QuantityText,
  ValueText,
} from "./MushroomModal.styles";
import { generateMushroom } from "../../utils/mushroomUtils";
import { getTerrainProperties } from "../../utils/terrainUtils";
import { MapTile } from "../../types";
import { GameAction } from "../../context/GameContext";

interface MushroomModalProps {
  pendingEvent: {
    tile: MapTile;
    type: "mushroom" | "rest" | "danger";
  } | null;
  setPendingEvent: React.Dispatch<
    React.SetStateAction<{
      tile: MapTile;
      type: "mushroom" | "rest" | "danger";
    } | null>
  >;
  dispatch: React.Dispatch<GameAction>;
}

export const MushroomModal: FC<MushroomModalProps> = ({
  pendingEvent,
  setPendingEvent,
  dispatch,
}) => {
  if (!pendingEvent) return null;

  const mushroom = generateMushroom(pendingEvent.tile.type);
  const biomeProps = getTerrainProperties(pendingEvent.tile.type);
  const isPreferredBiome = biomeProps.mushrooms[mushroom.rarity].includes(
    mushroom.type
  );

  // Calculate quantity and quality with biome bonuses
  const baseQuantity = Math.floor(Math.random() * 3) + 1;
  const finalQuantity = isPreferredBiome ? baseQuantity + 1 : baseQuantity;
  const baseQuality = Math.floor(Math.random() * 100) + 1;
  const finalQuality = isPreferredBiome
    ? Math.min(100, baseQuality + 20)
    : baseQuality;

  const handleCollect = () => {
    // Collecting mushrooms takes time based on quantity
    dispatch({
      type: "ADVANCE_TIME",
      payload: { minutes: 15 * finalQuantity },
    });

    dispatch({
      type: "COLLECT_MUSHROOM",
      payload: {
        mushroom,
        quantity: finalQuantity,
        quality: finalQuality,
      },
    });

    dispatch({
      type: "TRIGGER_EVENT",
      payload: { x: pendingEvent.tile.x, y: pendingEvent.tile.y },
    });

    setPendingEvent(null);
  };

  return (
    <>
      <h3>Found a mushroom!</h3>
      <MushroomInfo>
        <RarityBadge rarity={mushroom.rarity}>
          {mushroom.rarity.toUpperCase()}
        </RarityBadge>
        {isPreferredBiome && <NativeBadge>NATIVE</NativeBadge>}
      </MushroomInfo>
      <p>{mushroom.description}</p>
      <p>
        <i>
          This mushroom needs to be identified before you can learn more about
          it.
        </i>
      </p>
      <p>
        Quality:{" "}
        <QualityStars title={`Quality Rating: ${finalQuality}/100`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`star ${finalQuality >= (i + 1) * 20 ? "filled" : ""}`}
            >
              ★
            </span>
          ))}
          <QualityValue>
            ({baseQuality}%{" "}
            {isPreferredBiome && (
              <QualityBonus>→ {finalQuality}% (Native Bonus)</QualityBonus>
            )}
            )
          </QualityValue>
        </QualityStars>
      </p>
      <p>
        Expected yield:{" "}
        <QuantityText>
          {finalQuantity}{" "}
          {isPreferredBiome && <span className="bonus">(+1 Native Bonus)</span>}
        </QuantityText>
      </p>
      <p>
        Value: <ValueText>{mushroom.baseValue} coins</ValueText>
      </p>
      <ButtonRow>
        <CollectButton onClick={handleCollect}>
          Collect {finalQuantity} {finalQuantity > 1 ? "Mushrooms" : "Mushroom"}
        </CollectButton>
        <CancelButton onClick={() => setPendingEvent(null)}>Leave</CancelButton>
      </ButtonRow>
    </>
  );
};
