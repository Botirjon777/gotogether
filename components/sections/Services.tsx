"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { useTranslations } from "@/i18n/provider";
import { services } from "@/lib/services";

export function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <ScrollReveal
        direction="up"
        stagger={0.12}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((service, i) => (
          <ServiceCard
            key={service.n}
            index={i}
            icon={service.icon}
            title={t(`card${service.n}_title`)}
            description={t(`card${service.n}_desc`)}
          />
        ))}
      </ScrollReveal>
    </section>
  );
}
