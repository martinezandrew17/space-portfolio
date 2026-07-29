// ---------------------------------------------------------------------------
// Starfield.tsx — background particle field.
//
// A single THREE.Points cloud of randomly-placed stars. Kept as one draw
// call (not thousands of individual meshes) so it stays cheap regardless of
// star count — this is the standard way to do "lots of tiny points" in
// Three.js.
//
// Count/spread come from theme.ts (sceneConfig) so they're tunable in one
// place alongside everything else visual.
// ---------------------------------------------------------------------------

import { useMemo } from "react";
import { sceneConfig } from "../styles/theme";

export default function Starfield() {
  // useMemo so the random positions are only generated once per mount,
  // not recalculated on every re-render.
  const positions = useMemo(() => {
    const { starCount, starSpread } = sceneConfig;
    const arr = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      arr[i * 3] = (Math.random() - 0.5) * starSpread;     // x
      arr[i * 3 + 1] = (Math.random() - 0.5) * starSpread; // y
      arr[i * 3 + 2] = (Math.random() - 0.5) * starSpread; // z
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.6} sizeAttenuation />
    </points>
  );
}