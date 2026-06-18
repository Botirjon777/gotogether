"use client";

import Image from "next/image";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icons";
import { useTranslations } from "@/i18n/provider";
import { testimonials, type Testimonial } from "@/lib/testimonials";

function Card({ item }: { item: Testimonial }) {
  const initials = item.name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  return (
    <figure className="flex w-[330px] shrink-0 flex-col rounded-2xl border border-white/10 bg-slate/40 p-6 sm:w-[400px]">
      <Icon name="quote" size={28} className="mb-4 text-cobalt" />
      <blockquote className="flex-1 text-sm leading-relaxed text-snow/90">
        “{item.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {item.avatar ? (
          <Image
            src={item.avatar}
            alt={item.name}
            width={44}
            height={44}
            className="size-11 rounded-full object-cover"
          />
        ) : (
          <span className="grid size-11 place-items-center rounded-full bg-cobalt/20 font-display text-sm font-bold text-electric">
            {initials}
          </span>
        )}
        <span>
          <span className="block text-sm font-semibold">{item.name}</span>
          <span className="block font-mono text-xs text-ash">{item.company}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const t = useTranslations("testimonials");
  const track = [...testimonials, ...testimonials];

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} center />
      </div>

      {/* Desktop: seamless marquee. Reduced motion / small screens: swipeable row. */}
      <div className="group relative overflow-x-auto md:overflow-hidden hide-scrollbar">
        <div className="flex w-max gap-6 px-5 motion-safe:md:animate-marquee motion-safe:md:[animation-play-state:running] group-hover:md:[animation-play-state:paused] sm:px-8">
          {track.map((item, i) => (
            <Card key={i} item={item} />
          ))}
        </div>
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-midnight to-transparent md:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-midnight to-transparent md:block" />
      </div>
    </section>
  );
}
