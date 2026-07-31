// ---------------------------------------------------------------------------
// Planet.tsx — one reusable orbiting body.
//
// Renders the sphere, the optional ring (Saturn) or glow (the sun), a
// floating text label, and handles its own orbit rotation + click/hover
// interaction. Every planet in the scene is just <Planet config={...} />
// with a different SectionConfig from data/sections.ts — no per-planet
// custom components needed.
// ---------------------------------------------------------------------------

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import type { SectionConfig } from "../data/sections";
import { useNavigation } from "../hooks/useNavigation";
import { colors } from "../styles/theme";

interface PlanetProps {
  config: SectionConfig;
}

export default function Planet({ config }: PlanetProps) {
  const pivotRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const flyTo = useNavigation((s) => s.flyTo);
  const isFlying = useNavigation((s) => s.isFlying);
  const focusedSection = useNavigation((s) => s.focusedSection);
  const hoveredSection = useNavigation((s) => s.hoveredSection);
  const setHovered = useNavigation((s) => s.setHovered);
  const isFocused = focusedSection === config.key;
  const hovered = hoveredSection === config.key;

  // Orbit revolution (pivot spins around the sun) + planet self-rotation.
  // Orbits pause whenever any planet is focused, so CameraRig has a stable
  // world position to fly to and the content panel isn't describing a
  // planet that's still drifting across the screen.
  useFrame((_, delta) => {
    if (pivotRef.current && config.orbitSpeed && !focusedSection) {
      pivotRef.current.rotation.y += config.orbitSpeed * delta;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.15 * delta;
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (!isFlying) flyTo(config.key);
  };

  return (
    <group ref={pivotRef}>
      <group position={[config.orbitRadius, 0, 0]}>
        <mesh
          ref={meshRef}
          name={config.key}
          scale={hovered ? 1.12 : 1}
          onClick={handleClick}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(config.key);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(null);
            document.body.style.cursor = "default";
          }}
        >
          <sphereGeometry args={[config.size, 48, 48]} />
          {config.isSun ? (
            <meshBasicMaterial color={config.color} />
          ) : (
            <meshStandardMaterial
              color={config.color}
              roughness={0.8}
              metalness={0.05}
              emissive={isFocused ? config.color : "#000000"}
              emissiveIntensity={isFocused ? 0.25 : 0}
            />
          )}
        </mesh>

        {/* Soft glow shell for the sun — additive-feeling transparency, no extra light needed */}
        {config.isSun && (
          <mesh>
            <sphereGeometry args={[config.size * 1.35, 32, 32]} />
            <meshBasicMaterial color={config.color} transparent opacity={0.18} />
          </mesh>
        )}

        {/* Saturn's ring */}
        {config.hasRing && (
          <mesh rotation={[Math.PI / 2.3, 0, 0]}>
            <ringGeometry args={[config.size * 1.5, config.size * 2.3, 64]} />
            <meshBasicMaterial color="#d8c9a0" side={THREE.DoubleSide} transparent opacity={0.65} />
          </mesh>
        )}

        {/* Floating label above the planet */}
        <Text
          position={[0, config.size + 1, 0]}
          fontSize={0.55}
          color={hovered ? colors.accent2 : colors.text}
          anchorX="center"
          anchorY="middle"
        >
          {config.planetLabel}
        </Text>
      </group>
    </group>
  );
}