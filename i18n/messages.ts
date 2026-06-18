import "server-only";

import type { Locale } from "./config";

export type Messages = Record<string, Record<string, string>>;

const loaders: Record<Locale, () => Promise<{ default: Messages }>> = {
  en: () => import("@/messages/en.json"),
  uz: () => import("@/messages/uz.json"),
  ru: () => import("@/messages/ru.json"),
};

export async function getMessages(locale: Locale): Promise<Messages> {
  const mod = await loaders[locale]();
  return mod.default;
}
