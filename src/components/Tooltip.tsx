// ---------------------------------------------------------------------------
// Tooltip.tsx — small label that follows the cursor while hovering a planet.
//
// Reads `hoveredSection` from useNavigation (set by Planet.tsx's
// onPointerOver/onPointerOut) and tracks raw mouse position via a window
// listener, since React Three Fiber's pointer events don't hand us
// screen-space coordinates directly in a form easy to reuse here.
// ---------------------------------------------------------------------------

import { useEffect, useState } from "react";
import { useNavigation } from "../hooks/useNavigation";
import { sections } from "../data/sections";
import { colors, fonts } from "../styles/theme";

export default function Tooltip() {
    const hoveredSection = useNavigation((s) => s.hoveredSection);
    const [pos, setPos] = useState ({ x: 0, y: 0 });

    useEffect(() => {
        const handleMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    if (!hoveredSection) return null;

    const cfg = sections[hoveredSection];

    return (
    <div
      className="fixed z-40 pointer-events-none px-3 py-1.5 rounded-md text-xs whitespace-nowrap"
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -140%)",
        background: "rgba(10,10,20,0.85)",
        border: `1px solid ${colors.accent}66`,
        color: colors.text,
        fontFamily: fonts.body,
      }}
    >
      {cfg.planetLabel} — {cfg.eyebrow}
    </div>
  );
}