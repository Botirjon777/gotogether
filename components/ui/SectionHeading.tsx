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
      <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base text-ash sm:text-lg">{subtitle}</p>}
    </ScrollReveal>
  );
}
