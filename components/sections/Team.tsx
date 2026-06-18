"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { TeamCard } from "@/components/ui/TeamCard";
import { useTranslations } from "@/i18n/provider";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { team } from "@/lib/team";

export function Team() {
  const t = useTranslations("team");
  const grid = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = grid.current;
      if (!el) return;
      const cards = Array.from(el.children);

      if (prefersReducedMotion()) {
        gsap.set(cards, { opacity: 1, x: 0 });
        return;
      }

      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          x: i % 2 === 0 ? -70 : 70,
          duration: 0.8,
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });
    },
    { scope: grid },
  );

  return (
    <section id="team" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        center
      />

      <div
        ref={grid}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {team.map((member) => (
          <TeamCard key={member.name} member={member} />
        ))}
      </div>
    </section>
  );
}
