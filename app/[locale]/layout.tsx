import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

import { IntlProvider } from "@/i18n/provider";
import { getMessages } from "@/i18n/messages";
import { isLocale, locales, ogLocale, type Locale } from "@/i18n/config";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0F1E",
  colorScheme: "dark",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** hreflang map pointing each locale at its path (+ x-default → default locale). */
function languageAlternates() {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}`;
  languages["x-default"] = "/en";
  return languages;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const messages = await getMessages(locale);
  const m = messages.meta;
  const title = m.title;
  const description = m.description;

  return {
    metadataBase: new URL(site.url),
    title: {
      default: title,
      template: m.title_template,
    },
    description,
    keywords: m.keywords.split(",").map((k) => k.trim()),
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    alternates: {
      canonical: `/${locale}`,
      languages: languageAlternates(),
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url: `/${locale}`,
      locale: ogLocale[locale as Locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => ogLocale[l]),
      images: [
        {
          url: `/og-${locale}.png`,
          width: 1200,
          height: 630,
          alt: m.og_alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/og-${locale}.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const messages = await getMessages(locale);

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <IntlProvider locale={locale} messages={messages}>
          {children}
        </IntlProvider>
        <JsonLd locale={locale} description={messages.meta.description} />
      </body>
    </html>
  );
}
