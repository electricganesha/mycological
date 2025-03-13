import { FC } from "react";
import {
  ButtonRow,
  RestButton,
  ContinueButton,
  BenefitsList,
} from "./RestModal.styles";
import { MapTile } from "../../types";
import { GameAction } from "../../context/GameContext";

interface RestModalProps {
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
  maxStamina: number;
  stamina: number;
  dispatch: React.Dispatch<GameAction>;
}

export const RestModal: FC<RestModalProps> = ({
  pendingEvent,
  setPendingEvent,
  maxStamina,
  stamina,
  dispatch,
}) => {
  if (!pendingEvent) return null;

  const handleRest = () => {
    if (!pendingEvent) return;

    const { tile } = pendingEvent;
    dispatch({
      type: "UPDATE_STAMINA",
      payload: Math.min(50, maxStamina - stamina),
    });
    dispatch({ type: "UPDATE_HEALTH", payload: 10 });
    dispatch({ type: "TRIGGER_EVENT", payload: { x: tile.x, y: tile.y } });
    dispatch({ type: "ADVANCE_DAY" });
    // Reset time to 6 AM when resting
    dispatch({
      type: "ADVANCE_TIME",
      payload: { hours: 6, minutes: 0, reset: true },
    });
    setPendingEvent(null);
  };

  return (
    <>
      <h3>Rest Area Found!</h3>
      <p>Would you like to rest here? This will:</p>
      <BenefitsList>
        <li>Restore {Math.min(50, maxStamina - stamina)} stamina</li>
        <li>Heal 10 health points</li>
        <li>Advance to the next day</li>
      </BenefitsList>
      <ButtonRow>
        <RestButton onClick={handleRest}>Rest</RestButton>
        <ContinueButton onClick={() => setPendingEvent(null)}>
          Continue Exploring
        </ContinueButton>
      </ButtonRow>
    </>
  );
};
