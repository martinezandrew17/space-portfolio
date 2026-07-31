// ---------------------------------------------------------------------------
// useNavigation.ts — shared state for "which section is focused / hovered."
//
// The 3D scene (Planet.tsx, CameraRig.tsx) and the 2D UI (Nav.tsx,
// ContentPanel.tsx, Tooltip.tsx) all need to read/write this without prop-
// drilling through every layer. A small Zustand store keeps everything in
// sync from one place.
// ---------------------------------------------------------------------------

import { create } from "zustand";
import type { SectionKey } from "../data/sections";

interface NavigationState {
  focusedSection: SectionKey | null;
  hoveredSection: SectionKey | null;
  isFlying: boolean;

  flyTo: (Key: SectionKey) => void;
  flyHome: () => void;
  setFlying: (value: boolean) => void;
  setHovered: (Key: SectionKey | null) => void;
}

export const useNavigation = create<NavigationState>((set, get) => ({
  focusedSection: null,
  hoveredSection: null,
  isFlying: false,

  flyTo: (key) => {
    if (get().isFlying || get().focusedSection === key) return;
    set({ focusedSection: key });
  },

  flyHome: () => {
    if (get().isFlying) return;
    set({ focusedSection: null });
  },

  setFlying: (value) => set({ isFlying: value }),
  setHovered: (key) => set({ hoveredSection: key }),
}));