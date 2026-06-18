"use client";

import { useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/lib/gsap";

type Particle = { x: number; y: number; vx: number; vy: number };

const COBALT = "26, 86, 255";
const ELECTRIC = "77, 255, 180";

/**
 * Animated mesh of connected dots that reacts to the mouse.
 * Pure Canvas API + requestAnimationFrame. Renders nothing when reduced motion
 * is requested (a static gradient in the parent provides the fallback).
 */
export function ParticleMesh({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    // Honour data-saver mode — skip the animation entirely.
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (conn?.saveData) return;

    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    // Non-null, explicitly-typed captures so closures below keep the narrowing.
    const cv: HTMLCanvasElement = canvas;
    const ctx: CanvasRenderingContext2D = context;

    const isMobile = window.matchMedia("(max-width: 640px)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let visible = true;

    const LINK_DIST = isMobile ? 100 : 130;
    const MOUSE_DIST = 170;

    function build() {
      const rect = cv.getBoundingClientRect();
      // Cap DPR lower on phones to cut fill cost; 2 is plenty on desktop.
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
      width = rect.width;
      height = rect.height;
      cv.width = Math.floor(width * dpr);
      cv.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Fewer particles on small screens (O(n²) link cost dominates).
      const divisor = isMobile ? 22000 : 11000;
      const cap = isMobile ? 45 : 120;
      const density = Math.min(cap, Math.floor((width * height) / divisor));
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    }

    function step() {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // gentle attraction to the mouse
        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const md = Math.hypot(mdx, mdy);
        if (md < MOUSE_DIST && md > 0) {
          const f = (1 - md / MOUSE_DIST) * 0.6;
          p.x += (mdx / md) * f;
          p.y += (mdy / md) * f;
        }
      }

      // links
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.5;
            ctx.strokeStyle = `rgba(${COBALT}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // dots
      for (const p of particles) {
        const near = Math.hypot(mouse.x - p.x, mouse.y - p.y) < MOUSE_DIST;
        ctx.fillStyle = near
          ? `rgba(${ELECTRIC}, 0.9)`
          : `rgba(${COBALT}, 0.8)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, near ? 2.4 : 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    }

    function onMove(e: MouseEvent) {
      const rect = cv.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    build();
    step();

    const resizeObserver = new ResizeObserver(build);
    resizeObserver.observe(cv);

    // Pause the loop when the hero scrolls out of view (saves CPU/battery).
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          visible = true;
          raf = requestAnimationFrame(step);
        } else if (!entry.isIntersecting && visible) {
          visible = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(cv);

    // Touch devices have no hover; only wire mouse listeners on pointers.
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (hasFinePointer) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseout", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
    />
  );
}
