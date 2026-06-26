// Canonical production origin (no trailing slash). Override per environment
// with NEXT_PUBLIC_SITE_URL (e.g. a preview/staging domain).
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://gotogether.uz"
).replace(/\/$/, "");

export const site = {
  name: "GoTogether",
  tagline: "We build digital products — together.",
  url: siteUrl,
  email: "hello@gotogether.uz",
  social: {
    github: "https://github.com/gotogether",
    linkedin: "https://www.linkedin.com/company/gotogether",
    telegram: "https://t.me/gotogether",
    instagram: "https://instagram.com/gotogether",
  },
} as const;

export const navLinks = [
  { id: "services", href: "#services" },
  { id: "work", href: "#work" },
  { id: "team", href: "#team" },
  { id: "stats", href: "#stats" },
  { id: "contact", href: "#contact" },
] as const;
