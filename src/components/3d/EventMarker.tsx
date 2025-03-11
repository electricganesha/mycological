import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

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

  // Event-specific properties
  const getEventProperties = () => {
    switch (type) {
      case "mushroom":
        return {
          color: "#FFD700",
          emissive: "#FFD700",
          geometry: <octahedronGeometry args={[0.2]} />,
        };
      case "danger":
        return {
          color: "#FF4444",
          emissive: "#FF4444",
          geometry: <tetrahedronGeometry args={[0.2]} />,
        };
      case "rest":
        return {
          color: "#4CAF50",
          emissive: "#4CAF50",
          geometry: <boxGeometry args={[0.2, 0.2, 0.2]} />,
        };
    }
  };

  const { color, emissive, geometry } = getEventProperties();

  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.8}
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
  );
};

export default EventMarker;
