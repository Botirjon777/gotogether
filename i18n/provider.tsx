"use client";

import { createContext, useContext, useMemo } from "react";

import type { Locale } from "./config";
import type { Messages } from "./messages";

type IntlContextValue = {
  locale: Locale;
  messages: Messages;
};

const IntlContext = createContext<IntlContextValue | null>(null);

export function IntlProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ locale, messages }), [locale, messages]);
  return <IntlContext.Provider value={value}>{children}</IntlContext.Provider>;
}

function useIntl(): IntlContextValue {
  const ctx = useContext(IntlContext);
  if (!ctx) {
    throw new Error("useTranslations must be used within an IntlProvider");
  }
  return ctx;
}

export function useLocale(): Locale {
  return useIntl().locale;
}

/**
 * Returns a translator scoped to a namespace, e.g.
 *   const t = useTranslations("hero");
 *   t("tagline");
 * Falls back to the raw key if a translation is missing.
 */
export function useTranslations(namespace: string) {
  const { messages } = useIntl();
  const section = messages[namespace] ?? {};
  return (key: string): string => section[key] ?? `${namespace}.${key}`;
}
