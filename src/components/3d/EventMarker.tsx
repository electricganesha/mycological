import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";

interface EventMarkerProps {
  type: "mushroom" | "danger" | "rest";
  position: [number, number, number];
}

const EventMarker = ({ type, position }: EventMarkerProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Hover animation
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * 2) * 0.1 + 0.5;

    // Rotation animation
    meshRef.current.rotation.y += 0.02;
  });

  const renderMushroom = () => (
    <group>
      {/* Mushroom stem */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 0.3, 8]} />
        <meshStandardMaterial color="#DDDDDD" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Mushroom cap */}
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#FF6B6B" metalness={0.3} roughness={0.6} />
      </mesh>
      {/* Spots on cap */}
      <group position={[0, 0.35, 0]}>
        {[...Array(5)].map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos(i * Math.PI * 0.4) * 0.08,
              0.05,
              Math.sin(i * Math.PI * 0.4) * 0.08,
            ]}
          >
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        ))}
      </group>
    </group>
  );

  const renderDanger = () => (
    <group>
      {/* Skull base */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#FF4444" metalness={0.5} roughness={0.6} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.05, 0.05, 0.1]}>
        <boxGeometry args={[0.05, 0.08, 0.05]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.05, 0.05, 0.1]}>
        <boxGeometry args={[0.05, 0.08, 0.05]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );

  const renderRest = () => (
    <group>
      {/* Tent body */}
      <mesh rotation={[0, 0, Math.PI / 4]} position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0, 0.2, 0.4, 4, 1]} />
        <meshStandardMaterial color="#4CAF50" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Tent entrance */}
      <mesh position={[0, 0.15, 0.18]}>
        <cylinderGeometry args={[0.08, 0.08, 0.05, 16, 1, true]} />
        <meshStandardMaterial
          color="#2E7D32"
          metalness={0.3}
          roughness={0.7}
          side={2}
        />
      </mesh>
    </group>
  );

  const getMarkerContent = () => {
    switch (type) {
      case "mushroom":
        return renderMushroom();
      case "danger":
        return renderDanger();
      case "rest":
        return renderRest();
      default:
        return null;
    }
  };

  return (
    <group ref={meshRef} position={position}>
      {getMarkerContent()}
    </group>
  );
};

export default EventMarker;
