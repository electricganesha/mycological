import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Color } from "three";

interface TileRevealEffectProps {
  onComplete?: () => void;
}

const TileRevealEffect = ({ onComplete }: TileRevealEffectProps) => {
  const ringRef = useRef<Mesh>(null);
  const startTime = useRef(Date.now());
  const duration = 1000; // Duration in milliseconds

  useFrame(() => {
    if (!ringRef.current) return;

    const elapsed = Date.now() - startTime.current;
    const progress = Math.min(elapsed / duration, 1);

    // Scale up and fade out
    const scale = 1 + progress * 2;
    ringRef.current.scale.set(scale, 1, scale);

    if (ringRef.current.material) {
      (ringRef.current.material as any).opacity = 1 - progress;
    }

    if (progress === 1 && onComplete) {
      onComplete();
    }
  });

  return (
    <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
      <ringGeometry args={[0.8, 1, 32]} />
      <meshBasicMaterial color={new Color("#ffffff")} transparent opacity={1} />
    </mesh>
  );
};

export default TileRevealEffect;
