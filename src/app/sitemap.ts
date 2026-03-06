import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllSlugs } from "@/data/blog-posts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chatboost-ai.de";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogSlugs = await getAllSlugs();
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
