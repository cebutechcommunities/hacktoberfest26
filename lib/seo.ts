import type { Metadata } from "next";
import { gatherings } from "./content";

export const siteOrigin = "https://hf26.cebutechcommunities.org";
export const homeTitle = "Hacktoberfest Cebu 2026 — Learn, build, find your people";
export const homeDescription =
  "Four gatherings in Cebu this October: open-source AI learning, mentoring and checkpoints for the project competition, and people to build with. Venues, times and registration TBA.";

export function metadataOrigin(host: string | null) {
  // Local assets stay local; preview and production hosts share one search identity.
  return host && /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(host)
    ? `http://${host}`
    : siteOrigin;
}

export function socialMetadata(
  title: string,
  description: string,
  path: string,
  image = "/og.png",
  alt = "Hacktoberfest Cebu 2026 — four October gatherings to learn, build, and meet people in Cebu",
): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "website",
      locale: "en_PH",
      siteName: "Hacktoberfest Cebu",
      title,
      description,
      url: `${siteOrigin}${path}`,
      images: [{ url: image, alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image, alt }],
    },
  };
}

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteOrigin}/#organization`,
      name: "Cebu Tech Communities",
      url: "https://www.facebook.com/cebutechcommunities",
    },
    {
      "@type": "WebSite",
      "@id": `${siteOrigin}/#website`,
      name: "Hacktoberfest Cebu",
      url: `${siteOrigin}/`,
      description: homeDescription,
      publisher: { "@id": `${siteOrigin}/#organization` },
    },
    {
      "@type": "EventSeries",
      "@id": `${siteOrigin}/#october`,
      name: "Hacktoberfest Cebu 2026",
      url: `${siteOrigin}/#october`,
      description: homeDescription,
      subEvent: gatherings.map((event) => ({
        "@id": `${siteOrigin}/#oct-${event.day}`,
      })),
    },
    ...gatherings.map((event) => ({
      "@type": "Event",
      "@id": `${siteOrigin}/#oct-${event.day}`,
      name: event.title,
      description: event.summary,
      startDate: event.date,
      // The calendar's exclusive endDate is not an actual event end date.
      eventStatus: "https://schema.org/EventScheduled",
      url: `${siteOrigin}/#oct-${event.day}`,
      superEvent: { "@id": `${siteOrigin}/#october` },
    })),
  ],
};

export function serializeStructuredData(value: unknown) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}
