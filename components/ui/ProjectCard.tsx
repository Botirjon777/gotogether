"use client";

import { motion } from "framer-motion";

import type { Project } from "@/lib/projects";
import { Icon } from "./Icons";

export function ProjectCard({
  project,
  liveLabel,
  codeLabel,
}: {
  project: Project;
  liveLabel: string;
  codeLabel: string;
}) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate/40 transition-colors hover:border-cobalt hover:shadow-[0_0_40px_-12px] hover:shadow-cobalt/60"
    >
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-1.5 font-display text-xl font-semibold">{project.name}</h3>
        <p className="mb-4 text-sm leading-relaxed text-ash">{project.description}</p>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-xs text-ash"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-4 text-sm">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-snow transition-colors hover:text-electric"
            >
              <Icon name="external" size={16} />
              {liveLabel}
            </a>
          )}
          {project.code && (
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-ash transition-colors hover:text-snow"
            >
              <Icon name="github" size={16} />
              {codeLabel}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
