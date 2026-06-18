"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useTranslations } from "@/i18n/provider";
import { projects } from "@/lib/projects";

export function Showcases() {
  const t = useTranslations("showcases");

  return (
    <section
      id="work"
      className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <ScrollReveal
        direction="scale"
        stagger={0.1}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.name}
            project={project}
            liveLabel={t("live")}
            codeLabel={t("code")}
          />
        ))}
      </ScrollReveal>
    </section>
  );
}
