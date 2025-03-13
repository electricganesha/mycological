import { useRef, useEffect } from "react";
import { Mesh, Group, Object3D } from "three";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";

interface MushroomProps {
  position: [number, number, number];
  color?: string;
  scale?: number;
}

const Mushroom = ({
  position,
  color = "#ff6b6b",
  scale = 1,
}: MushroomProps) => {
  const mushroomRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);
  const startY = position[1] - 1;

  // Animated appearance
  useEffect(() => {
    if (groupRef.current) {
      const timeline = gsap.timeline();

      // Animate position and opacity
      timeline.fromTo(
        groupRef.current.position,
        { y: startY },
        {
          y: position[1],
          duration: 1,
          ease: "back.out(1.2)",
        }
      );

      // Animate materials opacity
      groupRef.current.children.forEach((child: Object3D) => {
        if (!(child instanceof Mesh)) return;
        if (child.material && "opacity" in child.material) {
          timeline.fromTo(
            child.material,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.8,
              ease: "power2.inOut",
            },
            "<"
          );
        }
      });

      return () => {
        timeline.kill();
      };
    }
  }, [startY, position]);

  // Gentle swaying animation
  useFrame((state) => {
    if (mushroomRef.current) {
      const time = state.clock.getElapsedTime();
      mushroomRef.current.rotation.y = Math.sin(time) * 0.1;
      mushroomRef.current.position.y = Math.sin(time * 2) * 0.05;
    }
  });

  return (
    <group
      ref={groupRef}
      scale={scale}
      position={[position[0], startY, position[2]]}
    >
      {/* Stem */}
      <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 0.8]} />
        <meshStandardMaterial color="#f8f8f8" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Cap */}
      <mesh ref={mushroomRef} castShadow receiveShadow position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.4}
          metalness={0.3}
          opacity={1}
          transparent
        />
      </mesh>

      {/* Gills */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.05, 32, 1, true]} />
        <meshStandardMaterial color="#d4d4d4" side={2} roughness={0.8} />
      </mesh>

      {/* Spots (if it's a spotted mushroom) */}
      {Math.random() > 0.5 && (
        <>
          {Array.from({ length: 5 }).map((_, i) => {
            const theta = (i / 5) * Math.PI * 2;
            const x = Math.cos(theta) * 0.15;
            const z = Math.sin(theta) * 0.15;
            return (
              <mesh
                key={i}
                position={[x, 0.9, z]}
                rotation={[0, theta, 0]}
                castShadow
              >
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial
                  color="#ffffff"
                  roughness={0.3}
                  metalness={0.1}
                />
              </mesh>
            );
          })}
        </>
      )}
    </group>
  );
};

export default Mushroom;
