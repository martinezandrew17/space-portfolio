# Space Portfolio

Interactive 3D solar-system portfolio built with React, React Three Fiber, and Tailwind.

## Structure
- `src/data/sections.ts` — all real content (bio, jobs, projects, resume, contact). Edit this file.
- `src/scene/` — 3D world: camera, lights, planets, orbit paths, camera fly-to logic.
- `src/components/` — 2D UI overlay: nav, content panel, tooltip, loading screen.
- `src/hooks/useNavigation.ts` — shared state for which section is currently focused.
- `src/styles/theme.ts` — design tokens (colors, fonts) used across scene + UI.

## Getting started
```bash
npm install
npm run dev
```

## Status
Scaffold stage — config and folder structure are in place. Scene and UI components
are stubs pending implementation.
