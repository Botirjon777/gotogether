export type Testimonial = {
  name: string;
  company: string;
  quote: string;
  /** avatar in /public, or null for an initials avatar */
  avatar: string | null;
};

// Placeholder data — replace with real testimonials (see Brief §8.3).
export const testimonials: Testimonial[] = [
  {
    name: "Sardor Komilov",
    company: "Nexa Retail",
    quote:
      "GoTogether shipped our storefront in six weeks. Conversions are up 40% and the codebase is a joy to maintain.",
    avatar: null,
  },
  {
    name: "Elena Petrova",
    company: "Pulse Health",
    quote:
      "They treated our product like their own. Thoughtful design, rock-solid engineering, and zero drama.",
    avatar: null,
  },
  {
    name: "Jamshid Tursunov",
    company: "Atlas Group",
    quote:
      "The dashboard they built finally made our data usable. Fast, beautiful, and exactly on time.",
    avatar: null,
  },
  {
    name: "Marina Lee",
    company: "Lumen Edu",
    quote:
      "From AI features to DevOps, they handled everything. A genuine partner, not just a vendor.",
    avatar: null,
  },
];
