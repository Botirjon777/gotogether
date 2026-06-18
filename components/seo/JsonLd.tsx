import { site } from "@/lib/site";

/**
 * Organization + WebSite structured data (schema.org / JSON-LD).
 * Server component — emits a script tag crawlers can parse for rich results.
 */
export function JsonLd({
  locale,
  description,
}: {
  locale: string;
  description: string;
}) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        email: site.email,
        description,
        logo: `${site.url}/logo-icon.png`,
        sameAs: [
          site.social.github,
          site.social.linkedin,
          site.social.telegram,
          site.social.instagram,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: `${site.url}/${locale}`,
        name: site.name,
        description,
        inLanguage: locale,
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; no user input is interpolated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
