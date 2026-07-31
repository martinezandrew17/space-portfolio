// ---------------------------------------------------------------------------
// Nav.tsx — top navigation bar with section pills.
//
// A 2D DOM overlay (not a 3D object) sitting on top of the canvas. Clicking
// a pill calls the same flyTo() used by clicking a planet directly, so both
// paths stay in sync through one shared store.
//
// Doubles as an accessible/keyboard-usable way to navigate the site without
// relying on clicking objects inside the 3D scene.
// ---------------------------------------------------------------------------

import { sections } from "../data/sections";
import { useNavigation } from "../hooks/useNavigation";
import { colors, fonts } from "../styles/theme";

export default function Nav() {
  const focusedSection = useNavigation((s) => s.focusedSection);
  const flyTo = useNavigation((s) => s.flyTo);
  const flyHome = useNavigation((s) => s.flyHome);
  const isFlying = useNavigation((s) => s.isFlying);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-5"
      style={{ fontFamily: fonts.body }}
    >
      <button
        onClick={flyHome}
        className="flex items-center gap-2 text-sm font-medium"
        style={{ color: colors.text, fontFamily: fonts.display }}
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: colors.accent, boxShadow: `0 0 10px ${colors.accent}` }}
        />
        Your Name
      </button>

      <div className="flex gap-2">
        {Object.values(sections).map((cfg) => {
          const isActive = focusedSection === cfg.key;
          return (
            <button
              key={cfg.key}
              disabled={isFlying}
              onClick={() => flyTo(cfg.key)}
              className="text-xs px-4 py-2 rounded-full border transition-all disabled:opacity-40"
              style={{
                color: isActive ? colors.text : colors.textDim,
                borderColor: isActive ? colors.accent : "rgba(255,255,255,0.08)",
                background: isActive ? "rgba(139,124,246,0.12)" : "rgba(255,255,255,0.04)",
              }}
            >
              {cfg.eyebrow}
            </button>
          );
        })}
      </div>
    </div>
  );
}