"use client";

import Image from "next/image";

import { useTranslations } from "@/i18n/provider";
import { navLinks, site } from "@/lib/site";
import { LangSwitcher } from "./LangSwitcher";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="border-t border-white/10 bg-midnight">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <a
              href="#top"
              className="flex items-center gap-2.5 font-display text-lg font-bold"
              aria-label="GoTogether — home"
            >
              <Image
                src="/logo-mark.png"
                alt="GoTogether"
                width={76}
                height={28}
                className="h-7 w-auto"
              />
              Go<span className="text-electric">Together</span>
            </a>
            <p className="mt-4 max-w-xs text-sm text-ash">{t("tagline")}</p>
            <div className="mt-5">
              <SocialLinks links={site.social} />
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-ash">
              {t("nav_title")}
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-sm text-snow/80 transition-colors hover:text-electric"
                  >
                    {tNav(link.id)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-ash">
              {t("lang_title")}
            </h3>
            <LangSwitcher compact />
            <a
              href={`mailto:${site.email}`}
              className="mt-5 block text-sm text-snow/80 transition-colors hover:text-electric"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-ash sm:flex-row">
          <p>
            © {site.name} 2026. {t("rights")}
          </p>
          <p className="font-mono">Built with Next.js · GSAP · Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
