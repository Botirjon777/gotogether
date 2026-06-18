import { Icon, type IconName } from "./Icons";

type Links = {
  github?: string;
  linkedin?: string;
  telegram?: string;
  instagram?: string;
};

const order: { key: keyof Links; icon: IconName; label: string }[] = [
  { key: "github", icon: "github", label: "GitHub" },
  { key: "linkedin", icon: "linkedin", label: "LinkedIn" },
  { key: "telegram", icon: "telegram", label: "Telegram" },
  { key: "instagram", icon: "instagram", label: "Instagram" },
];

export function SocialLinks({
  links,
  size = 18,
  className = "",
}: {
  links: Links;
  size?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {order.map(({ key, icon, label }) =>
        links[key] ? (
          <a
            key={key}
            href={links[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="grid size-9 place-items-center rounded-lg border border-white/10 text-ash transition-colors hover:border-electric/60 hover:text-electric"
          >
            <Icon name={icon} size={size} />
          </a>
        ) : null,
      )}
    </div>
  );
}
