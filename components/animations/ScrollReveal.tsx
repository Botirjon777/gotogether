"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Direction = "up" | "down" | "left" | "right" | "scale";

const offsets: Record<Direction, gsap.TweenVars> = {
  up: { y: 60 },
  down: { y: -60 },
  left: { x: 60 },
  right: { x: -60 },
  scale: { scale: 0.9 },
};

/**
 * Wraps children and reveals direct child elements on scroll with a stagger.
 * Falls back to an instant, fully-visible state when reduced motion is on.
 */
export function ScrollReveal({
  children,
  direction = "up",
  stagger = 0.12,
  start = "top 85%",
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  direction?: Direction;
  stagger?: number;
  start?: string;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const targets = el.children.length ? Array.from(el.children) : [el];

      if (prefersReducedMotion()) {
        gsap.set(targets, { opacity: 1, x: 0, y: 0, scale: 1 });
        return;
      }

      gsap.from(targets, {
        opacity: 0,
        ...offsets[direction],
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref },
  );

  // `as` is polymorphic, so narrow it to a component that accepts the props we
  // actually pass — otherwise TS (with @types/react 19) infers `never` props.
  const Element = Tag as React.FC<{
    ref?: React.Ref<HTMLDivElement>;
    className?: string;
    children?: React.ReactNode;
  }>;

  return (
    <Element ref={ref} className={className}>
      {children}
    </Element>
  );
}
