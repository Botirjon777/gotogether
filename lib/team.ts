export type TeamMember = {
  name: string;
  /** key into the `team` namespace: role is `role_${slug}`, bio is `bio_${slug}` */
  slug: string;
  /** image in /public/team, or null to render initials avatar */
  photo: string | null;
  links: {
    github?: string;
    linkedin?: string;
    telegram?: string;
    instagram?: string;
  };
};

// Names stay as-is (proper names); roles and bios are translated per locale
// under `team.role_<slug>` and `team.bio_<slug>`.
export const team: TeamMember[] = [
  {
    name: "Ramziddin Rustamov",
    slug: "ramziddin",
    photo: "/team/ramziddin-rustamov.jpg",
    links: {
      linkedin: "https://www.linkedin.com/in/ramziddin-rustamov/",
      telegram: "https://t.me/ramziddin_rustam",
    },
  },
  {
    name: "Botirjon Shokirov",
    slug: "botirjon",
    photo: "/team/botirjon-shokirov.jpg",
    links: {
      github: "https://github.com/Botirjon777",
      linkedin: "https://www.linkedin.com/in/botirjon-shokirov/",
      telegram: "https://t.me/botirjon_sh",
      instagram: "https://www.instagram.com/_botirjonshokirov_/",
    },
  },
];
