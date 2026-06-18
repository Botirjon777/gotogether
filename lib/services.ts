import type { IconName } from "@/components/ui/Icons";

export type Service = {
  /** index used to look up title/desc in the `services` message namespace */
  n: number;
  icon: IconName;
};

export const services: Service[] = [
  { n: 1, icon: "code" },
  { n: 2, icon: "mobile" },
  { n: 3, icon: "server" },
  { n: 4, icon: "design" },
  { n: 5, icon: "spark" },
  { n: 6, icon: "cloud" },
];
