// ---------------------------------------------------------------------------
// CameraRig.tsx — the "fly to a planet" camera animation.
//
// Watches `focusedSection` from useNavigation. Whenever it changes, this
// smoothly moves the camera from wherever it currently is to a position
// near the target planet (or back to the overview position when
// focusedSection becomes null), over FLIGHT_DURATION seconds.
//
// Renders nothing — it's a behavior-only component, dropped inside <Scene>
// alongside the planets.
// ---------------------------------------------------------------------------

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useNavigation } from "../hooks/useNavigation";
import { sceneConfig } from "../styles/theme";

const FLIGHT_DURATION = 1.4; // seconds — deliberate, not sluggish

interface Flight {
  elapsed: number;
  startPos: THREE.Vector3;
  endPos: THREE.Vector3;
  startTarget: THREE.Vector3;
  endTarget: THREE.Vector3;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function CameraRig() {
  // `controls` is populated because Scene.tsx marked OrbitControls as makeDefault
  const { camera, scene, controls } = useThree() as any;
  const focusedSection = useNavigation((s) => s.focusedSection);
  const setFlying = useNavigation((s) => s.setFlying);
  const flightRef = useRef<Flight | null>(null);

  // Start a new flight whenever the focused section changes
  useEffect(() => {
    if (!controls) return;

    const startPos = camera.position.clone();
    const startTarget = controls.target.clone();
    let endPos: THREE.Vector3;
    let endTarget: THREE.Vector3;

    if (focusedSection) {
      // Locate the actual mesh in the scene graph by the name Planet.tsx gave it
      const planetMesh = scene.getObjectByName(focusedSection) as THREE.Mesh | undefined;
      if (!planetMesh) return;

      const worldPos = new THREE.Vector3();
      planetMesh.getWorldPosition(worldPos);

      const radius = (planetMesh.geometry as THREE.SphereGeometry)?.parameters?.radius ?? 1.5;
      const directionFromCenter = worldPos.clone().normalize();

      // Park the camera just outside the planet, offset upward, looking at it
      endPos = worldPos
        .clone()
        .add(directionFromCenter.multiplyScalar(radius * 4 + 3))
        .add(new THREE.Vector3(0, radius * 1.2 + 1, 0));
      endTarget = worldPos.clone();
    } else {
      endPos = new THREE.Vector3(...sceneConfig.overviewPosition);
      endTarget = new THREE.Vector3(0, 0, 0);
    }

    flightRef.current = { elapsed: 0, startPos, endPos, startTarget, endTarget };
    setFlying(true);
    controls.enabled = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedSection]);

  useFrame((_, delta) => {
    const flight = flightRef.current;
    if (!flight || !controls) return;

    flight.elapsed += delta;
    const t = Math.min(flight.elapsed / FLIGHT_DURATION, 1);
    const eased = easeInOutCubic(t);

    camera.position.lerpVectors(flight.startPos, flight.endPos, eased);
    controls.target.lerpVectors(flight.startTarget, flight.endTarget, eased);
    camera.lookAt(controls.target);

    if (t >= 1) {
      flightRef.current = null;
      controls.enabled = true;
      setFlying(false);
    }
  });

  return null;
}