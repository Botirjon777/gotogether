import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <ScrollReveal className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-electric">
        {eyebrow}
      </p>
      <h2 className="text-fluid-title font-display font-bold tracking-tight">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base text-ash sm:text-lg">{subtitle}</p>}
    </ScrollReveal>
  );
}
