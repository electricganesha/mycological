import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

const PlayerMarker = () => {
  const markerRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (markerRef.current) {
      const t = state.clock.getElapsedTime();
      // Animate the position indicator ring
      markerRef.current.rotation.y += 0.02;
      // Slight bobbing motion for the entire group
      markerRef.current.parent!.position.y = 0.6 + Math.sin(t * 2) * 0.05;
      // Subtle swaying motion
      markerRef.current.parent!.rotation.z = Math.sin(t * 1.5) * 0.05;
    }
  });

  return (
    <group position={[0, 0.6, 0]}>
      {/* Body */}
      <mesh position={[0, 0.3, 0]}>
        <capsuleGeometry args={[0.2, 0.4, 8, 16]} />
        <meshStandardMaterial color="#4527A0" metalness={0.2} roughness={0.8} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#5E35B1" metalness={0.2} roughness={0.8} />
      </mesh>
      {/* Hat */}
      <mesh position={[0, 0.85, 0]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#795548" metalness={0.1} roughness={0.9} />
      </mesh>
      {/* Hat brim */}
      <mesh position={[0, 0.81, 0.02]}>
        <cylinderGeometry args={[0.22, 0.22, 0.02, 16]} />
        <meshStandardMaterial color="#795548" metalness={0.1} roughness={0.9} />
      </mesh>
      {/* Backpack */}
      <mesh position={[0, 0.3, 0.2]}>
        <boxGeometry args={[0.25, 0.3, 0.15]} />
        <meshStandardMaterial color="#3949AB" metalness={0.2} roughness={0.8} />
      </mesh>
      {/* Backpack pocket */}
      <mesh position={[0, 0.2, 0.28]}>
        <boxGeometry args={[0.15, 0.1, 0.05]} />
        <meshStandardMaterial color="#283593" metalness={0.2} roughness={0.8} />
      </mesh>
    </group>
  );
};

export default PlayerMarker;
