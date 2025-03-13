import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  EffectComposer,
  SSAO,
  BrightnessContrast,
} from "@react-three/postprocessing";
import { ReactNode, useEffect, useRef } from "react";
import { Color } from "three";
import { gsap } from "gsap";

interface GameCanvasProps {
  children: ReactNode;
  playerPosition?: [number, number, number];
}

const GameCanvas = ({
  children,
  playerPosition = [0, -2, 0],
}: GameCanvasProps) => {
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (controlsRef.current) {
      gsap.to(controlsRef.current.target, {
        x: playerPosition[0],
        y: playerPosition[1],
        z: playerPosition[2],
        duration: 1,
        ease: "power2.out",
        overwrite: true,
      });
    }
  }, [playerPosition]);
  return (
    <Canvas
      shadows
      camera={{
        position: [0, 15, 15],
        fov: 50,
        near: 0.1,
        far: 1000,
      }}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
      }}
    >
      {/* Scene background */}
      <color attach="background" args={["#1a1a1a"]} />

      {/* Base lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-5, 10, -5]} intensity={0.5} />
      <hemisphereLight color="#ffffff" groundColor="#444444" intensity={0.5} />

      {/* Post-processing effects */}
      <EffectComposer>
        <SSAO
          radius={0.05}
          intensity={30}
          luminanceInfluence={0.5}
          color={new Color(0x000000)}
        />
        <BrightnessContrast brightness={0.1} contrast={0.2} />
      </EffectComposer>

      {/* Controls */}
      <OrbitControls
        ref={controlsRef}
        maxPolarAngle={Math.PI / 2.5}
        minPolarAngle={Math.PI / 4}
        minDistance={12}
        maxDistance={20}
        enablePan={false}
        target={[0, -2, 0]}
        enableDamping
        zoomSpeed={2}
        dampingFactor={0.1}
      />

      {children}
    </Canvas>
  );
};

export default GameCanvas;
