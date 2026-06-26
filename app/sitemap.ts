import type { MetadataRoute } from "next";

import { defaultLocale, locales } from "@/i18n/config";
import { site } from "@/lib/site";

// Bump when the site's content meaningfully changes. A fixed date is more
// honest to crawlers than `new Date()`, which would claim "just modified" on
// every request.
const lastModified = "2026-06-26";

export default function sitemap(): MetadataRoute.Sitemap {
  // Per-locale hreflang alternates so search engines link the translations.
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `${site.url}/${l}`;

  return locales.map((locale) => ({
    url: `${site.url}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    // Default locale (uz) is the primary market, so it carries top priority.
    priority: locale === defaultLocale ? 1 : 0.8,
    alternates: { languages },
  }));
}
