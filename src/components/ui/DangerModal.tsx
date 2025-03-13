import { FC } from "react";
import {
  DangerHeader,
  DangerIcon,
  DamageDisplay,
  DamageText,
  DamageIcon,
  ButtonRow,
  DangerButton,
} from "./DangerModal.styles";
import { MapTile } from "../../types";
import { GameAction } from "../../context/GameContext";

interface DangerModalProps {
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

export const DangerModal: FC<DangerModalProps> = ({
  pendingEvent,
  setPendingEvent,
  dispatch,
}) => {
  if (!pendingEvent) return null;

  const dangerTypes = [
    {
      name: "Wild Animal",
      description: "A fierce creature attacks from the shadows!",
      damage: Math.floor(Math.random() * 10) + 15, // 15-25 damage
      image: "🐺",
    },
    {
      name: "Hidden Trap",
      description: "You stumble into a concealed hunting trap!",
      damage: Math.floor(Math.random() * 15) + 10, // 10-25 damage
      image: "⚔️",
    },
    {
      name: "Poisonous Plants",
      description: "You brush against some toxic vegetation!",
      damage: Math.floor(Math.random() * 10) + 10, // 10-20 damage
      image: "🌿",
    },
    {
      name: "Treacherous Ground",
      description: "The ground gives way beneath your feet!",
      damage: Math.floor(Math.random() * 15) + 5, // 5-20 damage
      image: "⚡",
    },
  ];

  const danger = dangerTypes[Math.floor(Math.random() * dangerTypes.length)];

  const handleContinue = () => {
    dispatch({ type: "UPDATE_HEALTH", payload: -danger.damage });
    dispatch({
      type: "TRIGGER_EVENT",
      payload: { x: pendingEvent.tile.x, y: pendingEvent.tile.y },
    });
    setPendingEvent(null);
  };

  return (
    <>
      <DangerHeader>
        <DangerIcon>{danger.image}</DangerIcon>
        <h3>{danger.name}!</h3>
      </DangerHeader>
      <p>{danger.description}</p>
      <DamageDisplay>
        <DamageText>-{danger.damage}</DamageText>
        <DamageIcon>❤️</DamageIcon>
      </DamageDisplay>
      <ButtonRow>
        <DangerButton onClick={handleContinue}>Continue</DangerButton>
      </ButtonRow>
    </>
  );
};
