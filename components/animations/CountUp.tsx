"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";

import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Counts from 0 to `end` when scrolled into view.
 */
export function CountUp({
  end,
  suffix = "",
  duration = 2,
  className,
}: {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        setValue(end);
        return;
      }

      const counter = { v: 0 };
      gsap.to(counter, {
        v: end,
        duration,
        ease: "power2.out",
        onUpdate: () => setValue(Math.round(counter.v)),
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref, dependencies: [end] },
  );

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
