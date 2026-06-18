"use client";

import { motion } from "framer-motion";

import { Icon, type IconName } from "./Icons";

export function ServiceCard({
  icon,
  title,
  description,
  index,
}: {
  icon: IconName;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate/40 p-6 transition-colors hover:border-cobalt/50"
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-cobalt/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div className="mb-5 flex items-center justify-between">
        <span className="grid size-12 place-items-center rounded-xl bg-cobalt/15 text-electric">
          <Icon name={icon} size={24} />
        </span>
        <span className="font-mono text-xs text-ash">
          0{index + 1}
        </span>
      </div>
      <h3 className="mb-2 font-display text-xl font-semibold">{title}</h3>
      <p className="text-sm leading-relaxed text-ash">{description}</p>
    </motion.article>
  );
}
