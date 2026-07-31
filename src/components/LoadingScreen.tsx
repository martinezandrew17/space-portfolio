// ---------------------------------------------------------------------------
// LoadingScreen.tsx — splash screen shown while the scene initializes.
//
// Fades out shortly after mount. Kept as a fixed short delay rather than
// tied to actual asset-loading state, since this scene doesn't load external
// textures/models yet (planets are procedural geometry) — nothing to
// meaningfully wait on. If real textures/GLTF models are added later, this
// can be upgraded to track @react-three/drei's useProgress instead.
// ---------------------------------------------------------------------------

import { useEffect, useState } from "react";
import { colors, fonts } from "../styles/theme";

export default function LoadingScreen() {
    const [visible, setVisible] = useState(true);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        const fadeTimer = setTimeout(() => setFading(true), 600);
        const removeTimer = setTimeout(() => setVisible(false), 1100);
        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, []);
    
    if (!visible) return null;

    return (
     <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500"
      style={{
        background: colors.void,
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <div
        className="w-11 h-11 rounded-full mb-4"
        style={{
          border: "2px solid rgba(139,124,246,0.2)",
          borderTopColor: colors.accent,
          animation: "spin 1s linear infinite",
        }}
      />
      <p
        style={{ color: colors.textDim, fontFamily: fonts.body }}
        className="text-xs uppercase tracking-widest"
      >
        Entering orbit…
      </p>

      {/* Local keyframes — scoped here since this is the only place spin is used */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}