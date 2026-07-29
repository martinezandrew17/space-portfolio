import Scene from "./scene/Scene";
import Starfield from "./scene/Starfield";
import Planet from "./scene/Planet";
import OrbitPath from "./scene/OrbitPath";
import CameraRig from "./scene/CameraRig";
import { sections } from "./data/sections";
import { useNavigation } from "./hooks/useNavigation";

export default function App() {
  const focusedSection = useNavigation((s) => s.focusedSection);
  const flyHome = useNavigation((s) => s.flyHome);

  return (
    <div className="h-screen w-screen relative">
      <Scene>
        <Starfield />
        <CameraRig />
        {Object.values(sections).map((cfg) => (
          <group key={cfg.key}>
            <OrbitPath radius={cfg.orbitRadius} />
            <Planet config={cfg} />
          </group>
        ))}
      </Scene>

      {/* Temporary test overlay — real Nav.tsx / ContentPanel.tsx replace this soon */}
      <div className="absolute top-6 left-6 text-white text-sm bg-black/40 px-4 py-2 rounded-lg">
        <p>Focused: {focusedSection ?? "none (overview)"}</p>
        {focusedSection && (
          <button onClick={flyHome} className="mt-2 underline text-cyan-300">
            ← Back to overview
          </button>
        )}
      </div>
    </div>
  );
}