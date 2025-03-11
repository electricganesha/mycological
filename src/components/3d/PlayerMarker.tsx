import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial } from "three";
import { Trail } from "@react-three/drei";

const PlayerMarker = () => {
  const playerRef = useRef<Mesh>(null);
  const trailRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!playerRef.current) return;

    // Bob up and down slightly
    const t = state.clock.getElapsedTime();
    playerRef.current.position.y = 0.3 + Math.sin(t * 3) * 0.05;

    // Rotate subtly
    playerRef.current.rotation.y += 0.01;
  });

  return (
    <group>
      <Trail
        width={0.4}
        length={8}
        color={"#ff2200"}
        attenuation={(t) => t * t}
      >
        <mesh ref={playerRef} position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#ff0000"
            emissive="#ff0000"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Trail>

      {/* Shadow */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.4]} />
        <meshBasicMaterial color="#000000" opacity={0.3} transparent />
      </mesh>

      {/* Glow effect */}
      <pointLight
        color="#ff3333"
        intensity={0.5}
        distance={2}
        position={[0, 0.3, 0]}
      />
    </group>
  );
};

export default PlayerMarker;
