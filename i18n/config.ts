export const locales = ["uz", "en", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "uz";

export const localeNames: Record<Locale, string> = {
  en: "English",
  uz: "O‘zbekcha",
  ru: "Русский",
};

export const localeShort: Record<Locale, string> = {
  en: "EN",
  uz: "UZ",
  ru: "RU",
};

/** BCP-47 codes used for `<html lang>` alternates and Open Graph `og:locale`. */
export const ogLocale: Record<Locale, string> = {
  en: "en_US",
  uz: "uz_UZ",
  ru: "ru_RU",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
