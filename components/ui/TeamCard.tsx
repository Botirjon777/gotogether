"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { TeamMember } from "@/lib/team";
import { SocialLinks } from "./SocialLinks";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export function TeamCard({
  member,
  role,
  bio,
}: {
  member: TeamMember;
  role: string;
  bio: string;
}) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group flex flex-col items-center rounded-2xl border border-line bg-slate/40 p-7 text-center transition-colors hover:border-cobalt/50"
    >
      <div className="relative mb-5 size-24 rounded-full p-[3px] ring-2 ring-transparent transition-all duration-300 group-hover:ring-electric">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            // Rendered at 96px but the source is requested at 2× (192px) and
            // higher quality so the avatar stays crisp on retina screens.
            width={192}
            height={192}
            quality={90}
            sizes="96px"
            className="size-full rounded-full object-cover"
          />
        ) : (
          <div className="grid size-full place-items-center rounded-full bg-cobalt/20 font-display text-2xl font-bold text-electric">
            {initials(member.name)}
          </div>
        )}
      </div>

      <h3 className="font-display text-lg font-semibold">{member.name}</h3>
      <p className="mb-3 font-mono text-xs text-cobalt">{role}</p>
      <p className="mb-5 text-sm leading-relaxed text-ash">{bio}</p>

      <SocialLinks links={member.links} className="mt-auto" />
    </motion.article>
  );
}
