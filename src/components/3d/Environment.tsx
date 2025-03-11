import { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, GradientTexture } from "@react-three/drei";

interface EnvironmentProps {
  biome: string;
}

type BiomeFeatures = {
  groundColor: string;
  grassColor: string;
  treeDensity: number;
  rockDensity: number;
};

const Environment = ({ biome }: EnvironmentProps) => {
  const groundRef = useRef<Mesh>(null);

  const getBiomeFeatures = (biome: string): BiomeFeatures => {
    switch (biome.toLowerCase()) {
      case "forest":
        return {
          groundColor: "#2d5a27",
          grassColor: "#3a7a34",
          treeDensity: 20,
          rockDensity: 5,
        };
      case "mountain":
        return {
          groundColor: "#6b6b6b",
          grassColor: "#4a6741",
          treeDensity: 5,
          rockDensity: 15,
        };
      case "swamp":
        return {
          groundColor: "#4a4a2d",
          grassColor: "#5a593d",
          treeDensity: 10,
          rockDensity: 3,
        };
      case "cave":
        return {
          groundColor: "#2a2a2a",
          grassColor: "#3a3a3a",
          treeDensity: 0,
          rockDensity: 20,
        };
      default:
        return {
          groundColor: "#4a6741",
          grassColor: "#5a7751",
          treeDensity: 10,
          rockDensity: 5,
        };
    }
  };

  const features = getBiomeFeatures(biome);

  return (
    <group>
      {/* Ground with reflection */}
      <mesh
        ref={groundRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={15}
          depthScale={1}
          minDepthThreshold={0.85}
          color={features.groundColor}
          metalness={0.5}
          roughness={1}
        />
      </mesh>

      {/* Environment objects based on biome */}
      {Array.from({ length: features.treeDensity }).map((_, i) => {
        const x = Math.random() * 40 - 20;
        const z = Math.random() * 40 - 20;
        const scale = 0.5 + Math.random() * 0.5;
        return (
          <group
            key={`tree-${i}`}
            position={[x, 0, z]}
            scale={[scale, scale, scale]}
          >
            {/* Tree trunk */}
            <mesh position={[0, 2, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.2, 0.3, 4]} />
              <meshStandardMaterial color="#3d2817" />
            </mesh>
            {/* Tree top */}
            <mesh position={[0, 4, 0]} castShadow receiveShadow>
              <coneGeometry args={[1.5, 3, 8]} />
              <meshStandardMaterial color={features.grassColor} />
            </mesh>
          </group>
        );
      })}

      {/* Add rocks */}
      {Array.from({ length: features.rockDensity }).map((_, i) => {
        const x = Math.random() * 40 - 20;
        const z = Math.random() * 40 - 20;
        const scale = 0.3 + Math.random() * 0.7;
        return (
          <mesh
            key={`rock-${i}`}
            position={[x, scale / 2, z]}
            scale={[scale, scale, scale]}
            castShadow
            receiveShadow
          >
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#666666" roughness={0.8} />
          </mesh>
        );
      })}
    </group>
  );
};

export default Environment;
