import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { ReactNode } from "react";
import { colors, sceneConfig } from "../styles/theme";

interface SceneProps {
  children: ReactNode;
}

export default function Scene({ children }: SceneProps) {
  return (
    <Canvas
      camera={{ position: sceneConfig.overviewPosition, fov: 55, near: 0.1, far: 2000 }}
      style={{ background: colors.void }}
    >
      <fog attach="fog" args={[sceneConfig.fogColor, sceneConfig.fogNear, sceneConfig.fogFar]} />
      <ambientLight color={0x404060} intensity={0.6} />
      <pointLight color={0xffe3b0} intensity={3.2} distance={200} position={[0, 0, 0]} />
      <OrbitControls enableDamping dampingFactor={0.06} minDistance={4} maxDistance={70} />
      {children}
    </Canvas>
  );
}