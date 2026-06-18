export type Project = {
  name: string;
  /** key into the `showcases` namespace: description is `desc_${slug}` */
  slug: string;
  stack: string[];
  live?: string;
  code?: string;
};

// Real GoTogether projects. Names and tech stack stay as-is (proper/brand
// names); descriptions are translated per locale under `showcases.desc_<slug>`.
export const projects: Project[] = [
  {
    name: "Art-Lavka",
    slug: "art_lavka",
    stack: ["Next.js", "MongoDB", "Three.js", "Tailwind"],
    live: "https://artlavka.uz",
    code: "https://github.com/Botirjon777/art-lavka-uz",
  },
  {
    name: "Ketamiz — Web",
    slug: "ketamiz_web",
    stack: ["Next.js", "Zustand", "React Query", "Framer Motion"],
    live: "https://yashil-yol.vercel.app",
    code: "https://github.com/Botirjon777/yashil-yol",
  },
  {
    name: "Dadi.uz",
    slug: "dadi",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    live: "https://dadiuz.vercel.app",
    code: "https://github.com/Botirjon777/dadi-uz",
  },
  {
    name: "Ketamiz — Mobile",
    slug: "ketamiz_mobile",
    stack: ["Flutter", "Dart", "Dio"],
    code: "https://github.com/Botirjon777/ketamiz-mobile",
  },
  {
    name: "Fajka Bar",
    slug: "fajka",
    stack: ["Next.js", "MongoDB", "Framer Motion"],
    code: "https://github.com/Botirjon777/fajka-bar-next",
  },
  {
    name: "Fergana Hotel",
    slug: "fergana_hotel",
    stack: ["Next.js", "Tailwind"],
    // Repo is private and there is no public live URL yet.
  },
];
