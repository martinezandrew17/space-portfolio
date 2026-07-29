export const colors = {
  void: "#05060d",
  voidDeep: "#000103",
  panelBg: "rgba(12, 14, 28, 0.72)",
  panelBorder: "rgba(255, 255, 255, 0.08)",
  accent: "#8b7cf6",
  accentSoft: "rgba(139, 124, 246, 0.15)",
  accent2: "#4fd1ff",
  text: "#eef0ff",
  textDim: "#9aa0c3",
  textFaint: "#5c6288",
  sun: "#ffb865",
  mars: "#d9603b",
  saturn: "#e0c9a6",
  moon: "#cfd2da",
  galaxy: "#7c6cf0",
} as const;

export const fonts = {
  display: "'Space Grotesk', sans-serif",
  body: "'Inter', sans-serif",
} as const;

export const glass = {
  background: colors.panelBg,
  border: `1px solid ${colors.panelBorder}`,
  backdropBlur: "18px",
} as const;

export const sceneConfig = {
  overviewPosition: [0, 14, 34] as [number, number, number],
  fogColor: colors.voidDeep,
  fogNear: 20,
  fogFar: 140,
  starCount: 3500,
  starSpread: 400,
} as const;