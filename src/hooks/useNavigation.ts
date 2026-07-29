import { create } from "zustand";
import type { SectionKey } from "../data/sections";

interface NavigationState {
  focusedSection: SectionKey | null;
  isFlying: boolean;
  flyTo: (key: SectionKey) => void;
  flyHome: () => void;
  setFlying: (value: boolean) => void;
}

export const useNavigation = create<NavigationState>((set, get) => ({
  focusedSection: null,
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
}));