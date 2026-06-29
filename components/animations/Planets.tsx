"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";

/** Shared scroll progress (0 at top of page, 1 at the very bottom). */
type ProgressRef = { current: number };

type PlanetProps = {
  textureUrl: string;
  radius: number;
  /** Axial spin in radians per second. */
  spinSpeed: number;
  /** Axial tilt in radians (gives the globe a believable lean). */
  tilt: number;
  /**
   * Where this planet sits on the shared orbit at the top of the page. The two
   * planets are placed half a turn apart (π) so they always sit on opposite
   * sides, then scrolling rotates the whole orbit half a turn — swapping their
   * sides as they pass each other.
   */
  startAngle: number;
  progressRef: ProgressRef;
};

/**
 * A single textured sphere that (a) spins on its tilted axis every frame and
 * (b) travels a circular path anchored to its side of the screen, driven by
 * how far down the page the visitor has scrolled.
 */
function Planet({
  textureUrl,
  radius,
  spinSpeed,
  tilt,
  startAngle,
  progressRef,
}: PlanetProps) {
  const loaded = useLoader(THREE.TextureLoader, textureUrl);

  // useLoader caches and shares the texture, so configure a clone rather than
  // mutating the shared instance: correct colour space + a little anisotropy
  // for crisp texels at grazing angles.
  const map = useMemo(() => {
    const texture = loaded.clone();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    texture.needsUpdate = true;
    return texture;
  }, [loaded]);

  const orbit = useRef<THREE.Group>(null);
  const globe = useRef<THREE.Mesh>(null);
  const viewport = useThree((s) => s.viewport);
  // Eased copy of the scroll progress so direction changes feel weighty.
  const smooth = useRef(0);

  useFrame((_, delta) => {
    smooth.current += (progressRef.current - smooth.current) * Math.min(1, delta * 3);

    // Both planets ride one shared ellipse. Scrolling top→bottom rotates the
    // orbit half a turn, so each travels from its edge, arcs across, and ends
    // on the opposite side — Earth left→right along the bottom, Mars the top.
    const angle = startAngle + smooth.current * Math.PI;
    const radiusX = viewport.width * 0.45;
    const radiusY = viewport.height * 0.32;

    if (orbit.current) {
      orbit.current.position.x = Math.cos(angle) * radiusX;
      orbit.current.position.y = Math.sin(angle) * radiusY;
    }
    if (globe.current) {
      globe.current.rotation.y += delta * spinSpeed;
    }
  });

  return (
    <group ref={orbit}>
      {/* Tilt wrapper keeps the spin axis leaning like a real planet. */}
      <group rotation={[0, 0, tilt]}>
        <mesh ref={globe}>
          <sphereGeometry args={[radius, 64, 64]} />
          <meshStandardMaterial map={map} roughness={1} metalness={0} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Full-viewport WebGL backdrop: Earth peeking in from the left, Mars from the
 * right. Mounted only on desktop by the wrapper, never on the server.
 */
export function Planets() {
  const progressRef = useRef(0);

  return (
    <Canvas
      className="size-full"
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 45 }}
      onCreated={({ gl }) => {
        gl.setClearAlpha(0);
      }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 2, 6]} intensity={2} />

      <Suspense fallback={null}>
        <Planet
          textureUrl="/textures/earth.jpg"
          radius={1.5}
          spinSpeed={0.12}
          tilt={0.41}
          startAngle={Math.PI}
          progressRef={progressRef}
        />
        <Planet
          textureUrl="/textures/mars.jpg"
          radius={1.15}
          spinSpeed={0.1}
          tilt={0.44}
          startAngle={0}
          progressRef={progressRef}
        />
      </Suspense>

      <ScrollTracker progressRef={progressRef} />
    </Canvas>
  );
}

/**
 * Samples page scroll progress into the shared ref once per frame. Reading it
 * here (rather than via a scroll listener) keeps it in lockstep with the render
 * loop and avoids extra listener bookkeeping.
 */
function ScrollTracker({ progressRef }: { progressRef: ProgressRef }) {
  useFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressRef.current = max > 0 ? window.scrollY / max : 0;
  });
  return null;
}
