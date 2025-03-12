import { useRef, useState, useEffect, useMemo } from "react";
import { Mesh, Vector3 } from "three";
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

const TerrainDecoration = ({
  type,
  position,
  scale,
  rotation,
}: {
  type: "tree" | "peak" | "puddle" | "stalagmite";
  position: [number, number, number];
  scale: number;
  rotation: number;
}) => {
  switch (type) {
    case "tree":
      return (
        <group position={position} rotation={[0, rotation, 0]} scale={scale}>
          {/* Tree trunk */}
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.15, 0.2, 1.2, 6]} />
            <meshStandardMaterial
              color="#3E2723"
              metalness={0.2}
              roughness={0.8}
            />
          </mesh>
          {/* Tree top layers */}
          <mesh position={[0, 1.5, 0]}>
            <coneGeometry args={[0.6, 1.2, 6]} />
            <meshStandardMaterial
              color="#1B5E20"
              metalness={0.1}
              roughness={0.9}
            />
          </mesh>
          <mesh position={[0, 1.2, 0]}>
            <coneGeometry args={[0.7, 1.0, 6]} />
            <meshStandardMaterial
              color="#2E7D32"
              metalness={0.1}
              roughness={0.9}
            />
          </mesh>
        </group>
      );
    case "peak":
      return (
        <group position={position} rotation={[0, rotation, 0]} scale={scale}>
          <mesh position={[0, 0.8, 0]}>
            <coneGeometry args={[0.7, 1.6, 6]} />
            <meshStandardMaterial
              color="#546E7A"
              metalness={0.4}
              roughness={0.7}
            />
          </mesh>
          {/* Snow cap */}
          <mesh position={[0, 1.6, 0]}>
            <coneGeometry args={[0.3, 0.4, 6]} />
            <meshStandardMaterial
              color="#ECEFF1"
              metalness={0.2}
              roughness={0.5}
            />
          </mesh>
        </group>
      );
    case "puddle":
      return (
        <group position={position} rotation={[0, rotation, 0]} scale={scale}>
          {/* Murky bottom */}
          <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.45]} />
            <meshStandardMaterial color="#33691E" opacity={0.9} transparent />
          </mesh>
          {/* Water surface */}
          <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.4]} />
            <meshStandardMaterial
              color="#0D47A1"
              transparent
              opacity={0.7}
              metalness={0.9}
              roughness={0.2}
              emissive="#1565C0"
              emissiveIntensity={0.2}
            />
          </mesh>
          {/* Reeds */}
          <mesh position={[0.2, 0.3, 0]}>
            <cylinderGeometry args={[0.02, 0.01, 0.6, 4]} />
            <meshStandardMaterial color="#558B2F" />
          </mesh>
          <mesh position={[-0.15, 0.25, 0.1]}>
            <cylinderGeometry args={[0.02, 0.01, 0.5, 4]} />
            <meshStandardMaterial color="#558B2F" />
          </mesh>
        </group>
      );
    case "stalagmite":
      return (
        <group position={position} rotation={[0, rotation, 0]} scale={scale}>
          {/* Main stalagmite */}
          <mesh position={[0, 0.5, 0]}>
            <coneGeometry args={[0.25, 1.0, 6]} />
            <meshStandardMaterial
              color="#3E2723"
              metalness={0.3}
              roughness={0.9}
            />
          </mesh>
          {/* Crystal formations */}
          <mesh position={[0.1, 0.4, 0.1]} rotation={[0.3, 0.5, 0.2]}>
            <octahedronGeometry args={[0.15]} />
            <meshStandardMaterial
              color="#8D6E63"
              metalness={0.7}
              roughness={0.3}
              emissive="#A1887F"
              emissiveIntensity={0.3}
            />
          </mesh>
          <mesh position={[-0.1, 0.6, -0.1]} rotation={[-0.2, 0.3, -0.1]}>
            <octahedronGeometry args={[0.12]} />
            <meshStandardMaterial
              color="#8D6E63"
              metalness={0.7}
              roughness={0.3}
              emissive="#A1887F"
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      );
  }
};

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

  // Generate random decorative elements based on tile type
  const decorativeElements = useMemo(() => {
    if (!isDiscovered) return [];

    const elements: Array<{
      type: "tree" | "peak" | "puddle" | "stalagmite";
      position: [number, number, number];
      scale: number;
      rotation: number;
    }> = [];
    const random = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    switch (type) {
      case "forest":
        // Add 4-7 trees
        const numTrees = Math.floor(random(4, 8));
        for (let i = 0; i < numTrees; i++) {
          const angle = random(0, Math.PI * 2);
          const radius = random(0.2, 0.7);
          const x = Math.cos(angle) * radius * size;
          const z = Math.sin(angle) * radius * size;
          const scale = random(0.3, 0.6);
          elements.push({
            type: "tree",
            position: [x, 0, z],
            scale,
            rotation: random(0, Math.PI * 2),
          });
        }
        break;

      case "mountain":
        // Add 3-4 peaks
        const numPeaks = Math.floor(random(3, 5));
        for (let i = 0; i < numPeaks; i++) {
          const angle = random(0, Math.PI * 2);
          const radius = random(0.2, 0.6);
          const x = Math.cos(angle) * radius * size;
          const z = Math.sin(angle) * radius * size;
          const scale = random(0.4, 0.7);
          elements.push({
            type: "peak",
            position: [x, 0, z],
            scale,
            rotation: random(0, Math.PI * 2),
          });
        }
        break;

      case "swamp":
        // Add 5-7 puddles
        const numPuddles = Math.floor(random(5, 8));
        for (let i = 0; i < numPuddles; i++) {
          const angle = random(0, Math.PI * 2);
          const radius = random(0.2, 0.7);
          const x = Math.cos(angle) * radius * size;
          const z = Math.sin(angle) * radius * size;
          const scale = random(0.5, 0.8);
          elements.push({
            type: "puddle",
            position: [x, 0, z] as [number, number, number],
            scale,
            rotation: random(0, Math.PI * 2),
          });
        }
        break;

      case "cave":
        // Add 4-6 stalagmites
        const numStalagmites = Math.floor(random(4, 7));
        for (let i = 0; i < numStalagmites; i++) {
          const angle = random(0, Math.PI * 2);
          const radius = random(0.2, 0.6);
          const x = Math.cos(angle) * radius * size;
          const z = Math.sin(angle) * radius * size;
          const scale = random(0.3, 0.5);
          elements.push({
            type: "stalagmite",
            position: [x, 0, z],
            scale,
            rotation: random(0, Math.PI * 2),
          });
        }
        break;
    }

    return elements;
  }, [type, size, isDiscovered]);

  // Colors for different tile types
  const getTileColor = () => {
    if (!isDiscovered) return "#2a2a2a";
    switch (type) {
      case "forest":
        return "#2E7D32"; // Darker green base
      case "mountain":
        return "#78909C"; // Slightly darker grey
      case "swamp":
        return "#33691E"; // Darker swamp green
      case "cave":
        return "#3E2723"; // Darker brown
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

      {/* Decorative elements */}
      {isDiscovered &&
        decorativeElements.map((element, index) => (
          <TerrainDecoration
            key={index}
            type={element.type}
            position={element.position}
            scale={element.scale}
            rotation={element.rotation}
          />
        ))}

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
