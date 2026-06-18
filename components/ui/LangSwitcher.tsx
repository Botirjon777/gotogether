"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { locales, localeShort, type Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/provider";
import { Icon } from "./Icons";

function persistLocale(next: Locale) {
  document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; samesite=lax`;
}

export function LangSwitcher({ compact = false }: { compact?: boolean }) {
  const active = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function switchTo(next: Locale) {
    persistLocale(next);
    const segments = pathname.split("/");
    segments[1] = next; // first segment after the leading slash is the locale
    router.push(segments.join("/") || `/${next}`);
    setOpen(false);
  }

  if (compact) {
    // inline row of buttons (used in the footer)
    return (
      <div className="flex gap-2">
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => switchTo(loc)}
            aria-current={loc === active}
            className={`rounded-md px-2.5 py-1 font-mono text-xs transition-colors ${
              loc === active
                ? "bg-cobalt text-snow"
                : "text-ash hover:text-snow"
            }`}
          >
            {localeShort[loc]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 font-mono text-xs text-snow transition-colors hover:border-cobalt/60"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {localeShort[active]}
        <Icon name="chevron" size={14} className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <ul
            role="listbox"
            className="glass absolute right-0 z-20 mt-2 w-32 overflow-hidden rounded-lg border border-line py-1 shadow-xl"
          >
            {locales.map((loc) => (
              <li key={loc}>
                <button
                  role="option"
                  aria-selected={loc === active}
                  onClick={() => switchTo(loc)}
                  className={`flex w-full items-center justify-between px-3 py-2 text-sm transition-colors hover:bg-snow/5 ${
                    loc === active ? "text-electric" : "text-snow"
                  }`}
                >
                  {localeShort[loc]}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
