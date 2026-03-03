import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const siteUrl = "https://chatboost-ai.de";

const blogSlugs = [
  "ki-chatbot-dsgvo-konform",
  "ki-chatbot-kosten-roi",
  "immobilienmakler-ki-chatbot",
  "chatbot-vs-kontaktformular",
  "restaurants-ki-chatbots-zeit-sparen",
  "google-bewertungen-chatbot",
  "chatbot-einrichten-7-schritte",
  "arztpraxis-chatbot-patientenkommunikation",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;

  const staticRoutes = ["", "/blog", "/impressum", "/datenschutz"];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of staticRoutes) {
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : route === "/blog" ? "weekly" : "yearly",
        priority: route === "" ? 1.0 : route === "/blog" ? 0.8 : 0.3,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${siteUrl}/${l}${route}`])
          ),
        },
      });
    }
  }

  for (const slug of blogSlugs) {
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${siteUrl}/${l}/blog/${slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
