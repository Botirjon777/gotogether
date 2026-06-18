export type Project = {
  name: string;
  description: string;
  stack: string[];
  live?: string;
  code?: string;
  /** image in /public/projects, or null to render a generated gradient cover */
  cover: string | null;
  /** accent used for the generated cover */
  accent: "cobalt" | "electric" | "violet";
};

// Real GoTogether projects. Drop screenshots in /public/projects and set
// `cover` to use them; otherwise a branded gradient cover is generated.
export const projects: Project[] = [
  {
    name: "Art-Lavka",
    description:
      "E-commerce platform for exclusive designer t-shirts in Uzbekistan, with real-time Telegram order integration.",
    stack: ["Next.js", "MongoDB", "Three.js", "Tailwind"],
    live: "https://artlavka.uz",
    code: "https://github.com/Botirjon777/art-lavka-uz",
    cover: null,
    accent: "cobalt",
  },
  {
    name: "Ketamiz — Web",
    description:
      "Intercity ride-sharing platform connecting travellers across Uzbekistan with affordable trips.",
    stack: ["Next.js", "Zustand", "React Query", "Framer Motion"],
    live: "https://yashil-yol.vercel.app",
    code: "https://github.com/Botirjon777/yashil-yol",
    cover: null,
    accent: "electric",
  },
  {
    name: "Dadi.uz",
    description:
      "Site for a marketing agency & video studio — bold ideas and professional video production.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    live: "https://dadiuz.vercel.app",
    code: "https://github.com/Botirjon777/dadi-uz",
    cover: null,
    accent: "violet",
  },
  {
    name: "Ketamiz — Mobile",
    description:
      "Cross-platform mobile app for intercity ride-sharing, available for iOS and Android.",
    stack: ["Flutter", "Dart", "Dio"],
    code: "https://github.com/Botirjon777/ketamiz-mobile",
    cover: null,
    accent: "cobalt",
  },
  {
    name: "Fajka Bar",
    description:
      "Website and digital menu for a modern bar & lounge, built for a fast, immersive experience.",
    stack: ["Next.js", "MongoDB", "Framer Motion"],
    code: "https://github.com/Botirjon777/fajka-bar-next",
    cover: null,
    accent: "electric",
  },
  {
    name: "Fergana Hotel",
    description:
      "Booking and presentation website for a hotel in Fergana, Uzbekistan.",
    stack: ["Next.js", "Tailwind"],
    // Repo is private and there is no public live URL yet.
    cover: null,
    accent: "violet",
  },
];
