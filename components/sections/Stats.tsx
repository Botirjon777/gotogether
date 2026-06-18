"use client";

import { CountUp } from "@/components/animations/CountUp";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { useTranslations } from "@/i18n/provider";

const stats = [
  { n: 1, end: 50, suffix: "+" },
  { n: 2, end: 12, suffix: "+" },
  { n: 3, end: 3, suffix: "" },
  { n: 4, end: 4, suffix: "" },
];

export function Stats() {
  const t = useTranslations("stats");

  return (
    <section id="stats" className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,86,255,0.12),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <ScrollReveal
          stagger={0.12}
          className="grid grid-cols-2 gap-8 rounded-3xl border border-line bg-slate/30 px-6 py-12 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.n} className="text-center">
              <CountUp
                end={s.end}
                suffix={s.suffix}
                className="font-display text-4xl font-bold text-electric sm:text-5xl md:text-6xl"
              />
              <p className="mt-2 text-sm text-ash sm:text-base">
                {t(`stat${s.n}_label`)}
              </p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
