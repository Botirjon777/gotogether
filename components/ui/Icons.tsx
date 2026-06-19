import type { IconBaseProps, IconType } from "react-icons";
import {
  FiArrowRight,
  FiCheck,
  FiChevronDown,
  FiCloud,
  FiCode,
  FiExternalLink,
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiMenu,
  FiMoon,
  FiPenTool,
  FiServer,
  FiSmartphone,
  FiSun,
  FiX,
  FiZap,
} from "react-icons/fi";
import { FaQuoteLeft, FaTelegramPlane } from "react-icons/fa";

export type IconName =
  | "code"
  | "mobile"
  | "server"
  | "design"
  | "spark"
  | "cloud"
  | "github"
  | "linkedin"
  | "telegram"
  | "instagram"
  | "external"
  | "arrow"
  | "quote"
  | "chevron"
  | "menu"
  | "close"
  | "check"
  | "sun"
  | "moon";

const icons: Record<IconName, IconType> = {
  code: FiCode,
  mobile: FiSmartphone,
  server: FiServer,
  design: FiPenTool,
  spark: FiZap,
  cloud: FiCloud,
  github: FiGithub,
  linkedin: FiLinkedin,
  telegram: FaTelegramPlane,
  instagram: FiInstagram,
  external: FiExternalLink,
  arrow: FiArrowRight,
  quote: FaQuoteLeft,
  check: FiCheck,
  chevron: FiChevronDown,
  menu: FiMenu,
  close: FiX,
  sun: FiSun,
  moon: FiMoon,
};

export function Icon({
  name,
  size = 20,
  ...props
}: { name: IconName; size?: number } & IconBaseProps) {
  const Glyph = icons[name];
  return <Glyph size={size} aria-hidden {...props} />;
}
