"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useTranslations } from "@/i18n/provider";
import { navLinks } from "@/lib/site";
import { Icon } from "./Icons";
import { LangSwitcher } from "./LangSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function NavBar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "glass border-b border-line" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight"
          aria-label="GoTogether — home"
        >
          <Image
            src="/logo-mark.png"
            alt="GoTogether"
            width={76}
            height={28}
            priority
            className="h-7 w-auto"
          />
          <span>
            Go<span className="text-electric">Together</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="text-sm text-ash transition-colors hover:text-snow"
            >
              {t(link.id)}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LangSwitcher />
          <ThemeToggle />
          <a
            href="#contact"
            className="rounded-lg bg-cobalt px-4 py-2 text-sm font-medium text-on-accent transition-transform hover:scale-[1.03]"
          >
            {t("cta")}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LangSwitcher />
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid size-9 place-items-center"
          >
            <Icon name={open ? "close" : "menu"} size={24} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass border-t border-line px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base text-snow"
              >
                {t(link.id)}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-cobalt px-4 py-2 text-center text-sm font-medium text-on-accent"
            >
              {t("cta")}
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}
