export type TeamMember = {
  name: string;
  role: string;
  /** image in /public/team, or null to render initials avatar */
  photo: string | null;
  bio: string;
  links: {
    github?: string;
    linkedin?: string;
    telegram?: string;
    instagram?: string;
  };
};

// Placeholder data — replace with real members (see Brief §8.1).
export const team: TeamMember[] = [
  {
    name: "Ramziddin Rustamov",
    role: "Founder & Full-stack Engineer",
    photo: null,
    bio: "Turns ambitious ideas into shipped products across web and AI.",
    links: { github: "https://github.com", linkedin: "https://linkedin.com", telegram: "https://t.me" },
  },
  {
    name: "Aziza Karimova",
    role: "Lead Product Designer",
    photo: null,
    bio: "Designs clean, human interfaces that make complex things feel simple.",
    links: { linkedin: "https://linkedin.com", instagram: "https://instagram.com" },
  },
  {
    name: "Bobur Aliyev",
    role: "Mobile Engineer",
    photo: null,
    bio: "Crafts buttery-smooth Flutter apps for iOS and Android.",
    links: { github: "https://github.com", telegram: "https://t.me" },
  },
  {
    name: "Dilnoza Yusupova",
    role: "Backend & DevOps",
    photo: null,
    bio: "Keeps services fast, observable, and always online.",
    links: { github: "https://github.com", linkedin: "https://linkedin.com" },
  },
];
