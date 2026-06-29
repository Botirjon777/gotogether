"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { prefersReducedMotion } from "@/lib/gsap";

// WebGL + three.js is heavy, browser-only, and desktop-only — keep it out of
// the server render and out of the initial bundle entirely.
const Planets = dynamic(() => import("./Planets").then((m) => m.Planets), {
  ssr: false,
});

/**
 * Decorative Earth/Mars backdrop. Renders nothing on touch/small screens, when
 * reduced motion is requested, or under data-saver — matching ParticleMesh's
 * restraint. Sits behind all content and never intercepts pointer events.
 */
export function PlanetsBackground() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (conn?.saveData) return;

    // Desktop only — the lg breakpoint (1024px) matches the CSS gate below.
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 hidden opacity-60 lg:block"
    >
      <Planets />
    </div>
  );
}
