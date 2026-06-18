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

export const team: TeamMember[] = [
  {
    name: "Ramziddin Rustamov",
    role: "Founder & Full-stack Engineer",
    photo: "/team/ramziddin-rustamov.jpg",
    bio: "Turns ambitious ideas into shipped products across web and AI.",
    links: {
      linkedin: "https://www.linkedin.com/in/ramziddin-rustamov/",
      telegram: "https://t.me/ramziddin_rustam",
    },
  },
  {
    name: "Botirjon Shokirov",
    role: "Software Engineer",
    photo: "/team/botirjon-shokirov.jpg",
    bio: "Software engineer building reliable, well-crafted web and mobile products.",
    links: {
      github: "https://github.com/Botirjon777",
      linkedin: "https://www.linkedin.com/in/botirjon-shokirov/",
      telegram: "https://t.me/botirjon_sh",
      instagram: "https://www.instagram.com/_botirjonshokirov_/",
    },
  },
];
