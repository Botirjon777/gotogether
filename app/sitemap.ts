import type { MetadataRoute } from "next";

import { locales } from "@/i18n/config";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Per-locale hreflang alternates so search engines link the translations.
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `${site.url}/${l}`;

  return locales.map((locale) => ({
    url: `${site.url}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === "en" ? 1 : 0.8,
    alternates: { languages },
  }));
}
