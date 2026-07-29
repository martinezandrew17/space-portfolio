// ---------------------------------------------------------------------------
// OrbitPath.tsx — the faint ring drawn under each planet's orbit.
//
// Purely visual: a thin, mostly-transparent ring on the same plane the
// planet travels around. This is what makes the layout read as a "solar
// system diagram" at a glance, rather than planets just floating with no
// visible relationship to the center.
//
// Skips rendering entirely for the sun (orbitRadius 0 has no path to draw).
// ---------------------------------------------------------------------------

import * as THREE from "three";
import { colors } from "../styles/theme";

interface OrbitPathProps {
    radius: number;
}

export default function OrbitPath({ radius }: OrbitPathProps) {
    if (radius <= 0) return null;

    return (
        <mesh rotation = {[Math.PI / 2, 0, 0]}>
            {/* Thin ring: inner/outer radius kept close together for a hairline look */}
        <ringGeometry args = {[radius - 0.02, radius + 0.02, 128]} />
        <meshBasicMaterial
            color = {colors.accent}
            side = {THREE.DoubleSide}
            transparent
            opacity = {0.08}
        />
      </mesh>
    );
}