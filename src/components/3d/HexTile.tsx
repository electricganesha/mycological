import { useRef, useState, useEffect } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import EventMarker from "./EventMarker";
import PlayerMarker from "./PlayerMarker";
import TileRevealEffect from "./TileRevealEffect";
import {
  getTerrainCosts,
  getTerrainDescription,
} from "../../utils/terrainUtils";

interface HexTileProps {
  position: [number, number, number];
  type: "forest" | "mountain" | "swamp" | "cave";
  size?: number;
  isAdjacent?: boolean;
  isDiscovered?: boolean;
  isPlayerPosition?: boolean;
  hasEvent?: boolean;
  eventType?: "mushroom" | "danger" | "rest";
  onClick?: () => void;
}

const HexTile = ({
  position,
  type,
  size = 1,
  isAdjacent = false,
  isDiscovered = false,
  isPlayerPosition = false,
  hasEvent = false,
  eventType,
  onClick,
}: HexTileProps) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [showRevealEffect, setShowRevealEffect] = useState(false);
  const wasDiscovered = useRef(isDiscovered);

  useEffect(() => {
    if (!wasDiscovered.current && isDiscovered) {
      setShowRevealEffect(true);
    }
    wasDiscovered.current = isDiscovered;
  }, [isDiscovered]);

  // Colors for different tile types
  const getTileColor = () => {
    if (!isDiscovered) return "#2a2a2a";
    switch (type) {
      case "forest":
        return "#4CAF50";
      case "mountain":
        return "#90A4AE";
      case "swamp":
        return "#8BC34A";
      case "cave":
        return "#5D4037";
      default:
        return "#81C784";
    }
  };

  return (
    <group position={position}>
      {/* Base tile */}
      <mesh
        ref={meshRef}
        onClick={isAdjacent ? onClick : undefined}
        onPointerEnter={() => isAdjacent && setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <cylinderGeometry args={[size, size, 0.1, 6]} />
        <meshStandardMaterial
          color={getTileColor()}
          opacity={isDiscovered ? 1 : 0.3}
          transparent
          emissive={hovered ? "#ffffff" : getTileColor()}
          emissiveIntensity={0.2}
          metalness={0.3}
          roughness={0.8}
        />
      </mesh>

      {/* Outline for tiles */}
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[size * 1.02, size * 1.02, 0.05, 6]} />
        <meshBasicMaterial color="#000000" opacity={0.2} transparent />
      </mesh>

      {/* Player marker */}
      {isPlayerPosition && <PlayerMarker />}

      {/* Movement cost indicator */}
      {isAdjacent && hovered && (
        <Html center position={[0, 4, 0]}>
          <div
            style={{
              background: "rgba(0, 0, 0, 0.8)",
              padding: "8px 12px",
              borderRadius: "4px",
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
              textAlign: "center",
              minWidth: "100px",
              userSelect: "none",
            }}
          >
            <div>
              {type.charAt(0).toUpperCase() + type.slice(1)}
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "normal",
                  opacity: 0.8,
                  marginTop: "2px",
                }}
              >
                {getTerrainDescription(type)}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                marginTop: "4px",
              }}
            >
              {getTerrainCosts(type).stamina > 0 && (
                <span style={{ color: "#44ff44" }}>
                  -{getTerrainCosts(type).stamina} ⚡
                </span>
              )}
              {getTerrainCosts(type).health > 0 && (
                <span style={{ color: "#ff4444" }}>
                  -{getTerrainCosts(type).health} ❤️
                </span>
              )}
            </div>
          </div>
        </Html>
      )}
      {showRevealEffect && (
        <TileRevealEffect onComplete={() => setShowRevealEffect(false)} />
      )}

      {/* Event indicator */}
      {isDiscovered && hasEvent && eventType && (
        <EventMarker type={eventType} position={[0, 0, 0]} />
      )}

      {/* Adjacent tile indicator */}
      {isAdjacent && hovered && (
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[size * 1.05, size * 1.05, 0.05, 6]} />
          <meshBasicMaterial color="#ffffff" opacity={0.2} transparent />
        </mesh>
      )}
    </group>
  );
};

export default HexTile;
