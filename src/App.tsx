// ---------------------------------------------------------------------------
// App.tsx — top-level composition.
//
// Assembles the 3D scene (Scene + Starfield + Planet/OrbitPath per section +
// CameraRig) alongside the 2D UI overlay (Nav, ContentPanel, Tooltip), plus
// the LoadingScreen splash on top of everything while it all initializes.
// ---------------------------------------------------------------------------

import Scene from "./scene/Scene";
import Starfield from "./scene/Starfield";
import Planet from "./scene/Planet";
import OrbitPath from "./scene/OrbitPath";
import CameraRig from "./scene/CameraRig";
import Nav from "./components/Nav";
import ContentPanel from "./components/ContentPanel";
import Tooltip from "./components/Tooltip";
import LoadingScreen from "./components/LoadingScreen";
import { sections } from "./data/sections";

export default function App() {
  return (
    <div className="h-screen w-screen relative overflow-hidden">
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

      <Nav />
      <ContentPanel />
      <Tooltip />
      <LoadingScreen />
    </div>
  );
}