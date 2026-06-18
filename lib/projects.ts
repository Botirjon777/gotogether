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

// Placeholder data — replace with real projects (see Brief §8.2).
export const projects: Project[] = [
  {
    name: "Nexa Commerce",
    description: "Headless storefront with real-time inventory and AI search.",
    stack: ["Next.js", "PostgreSQL", "Stripe", "OpenAI"],
    live: "https://example.com",
    code: "https://github.com",
    cover: null,
    accent: "cobalt",
  },
  {
    name: "Pulse Health",
    description: "Telemedicine app connecting patients with doctors instantly.",
    stack: ["Flutter", "Node.js", "WebRTC"],
    live: "https://example.com",
    code: "https://github.com",
    cover: null,
    accent: "electric",
  },
  {
    name: "Atlas Analytics",
    description: "Self-serve BI dashboard turning raw events into decisions.",
    stack: ["React", "ClickHouse", "Go"],
    live: "https://example.com",
    code: "https://github.com",
    cover: null,
    accent: "violet",
  },
  {
    name: "Lumen LMS",
    description: "Adaptive learning platform with AI-graded assignments.",
    stack: ["Next.js", "Prisma", "LangChain"],
    live: "https://example.com",
    code: "https://github.com",
    cover: null,
    accent: "cobalt",
  },
  {
    name: "Drift Logistics",
    description: "Fleet routing engine that cuts delivery times by 30%.",
    stack: ["TypeScript", "Mapbox", "Redis"],
    live: "https://example.com",
    code: "https://github.com",
    cover: null,
    accent: "electric",
  },
  {
    name: "Orbit CRM",
    description: "Pipeline tool with automations and rich integrations.",
    stack: ["React", "NestJS", "PostgreSQL"],
    live: "https://example.com",
    code: "https://github.com",
    cover: null,
    accent: "violet",
  },
];
