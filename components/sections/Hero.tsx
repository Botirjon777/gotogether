"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

import { ParticleMesh } from "@/components/animations/ParticleMesh";
import { Icon } from "@/components/ui/Icons";
import { useTranslations } from "@/i18n/provider";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export function Hero() {
  const t = useTranslations("hero");
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { y: 30, opacity: 0, duration: 0.6 })
        .from(
          ".hero-word",
          { y: 60, opacity: 0, stagger: 0.08, duration: 0.8 },
          "-=0.2",
        )
        .from(".hero-sub", { y: 30, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(".hero-cta", { y: 20, opacity: 0, stagger: 0.12, duration: 0.5 }, "-=0.3")
        .from(".hero-scroll", { opacity: 0, duration: 0.6 }, "-=0.1");
    },
    { scope: root },
  );

  const words = t("tagline").split(" ");

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* particle mesh + gradient fallback */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(26,86,255,0.18),transparent_60%)]" />
        <ParticleMesh className="absolute inset-0 size-full" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-midnight" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 py-28 sm:px-8 sm:py-32">
        <div className="max-w-4xl">
          <p className="hero-eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-electric sm:text-xs sm:tracking-[0.2em]">
            <span className="size-1.5 rounded-full bg-electric" />
            {t("eyebrow")}
          </p>

          <h1 className="text-fluid-hero font-display font-bold tracking-tight">
            {words.map((word, i) => (
              <span key={i} className="hero-word mr-[0.25em] inline-block">
                {i === words.length - 1 ? (
                  <span className="text-gradient">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h1>

          <p className="hero-sub mt-6 max-w-xl text-base leading-relaxed text-ash sm:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="#work"
              className="hero-cta inline-flex items-center justify-center gap-2 rounded-xl bg-cobalt px-6 py-3.5 font-medium text-on-accent shadow-lg shadow-cobalt/30"
            >
              {t("cta_primary")}
              <Icon name="arrow" size={18} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="hero-cta inline-flex items-center justify-center gap-2 rounded-xl border border-line px-6 py-3.5 font-medium text-snow transition-colors hover:border-electric/60 hover:text-electric"
            >
              {t("cta_secondary")}
            </motion.a>
          </div>
        </div>
      </div>

      <a
        href="#services"
        className="hero-scroll absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-ash transition-colors hover:text-snow"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
          {t("scroll")}
        </span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-line pt-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="size-1.5 rounded-full bg-electric"
          />
        </span>
      </a>
    </section>
  );
}
