import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getBlogPosts } from "@/data/blog-posts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chatboost-ai.de";

// German month abbreviations to month index
const DE_MONTHS: Record<string, number> = {
  Jan: 0, Feb: 1, Mär: 2, Apr: 3, Mai: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Okt: 9, Nov: 10, Dez: 11,
};

// Parse German date string like "1. Mär 2026" to Date
function parseDeDate(dateStr: string): Date {
  const match = dateStr.match(/(\d+)\.\s*(\w+)\s+(\d{4})/);
  if (!match) return new Date();
  const [, day, month, year] = match;
  return new Date(Number(year), DE_MONTHS[month] ?? 0, Number(day));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPosts("de");
  const locales = routing.locales;

  // Static pages with their change frequency and priority
  const staticRoutes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "", changeFrequency: "weekly", priority: 1.0 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
    { path: "/impressum", changeFrequency: "yearly", priority: 0.3 },
    { path: "/datenschutz", changeFrequency: "yearly", priority: 0.3 },
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Add static routes for each locale
  for (const route of staticRoutes) {
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}${route.path}`,
        lastModified: new Date("2026-03-21"),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${siteUrl}/${l}${route.path}`])
          ),
        },
      });
    }
  }

  // Add blog posts for each locale
  for (const post of blogPosts) {
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}/blog/${post.slug}`,
        lastModified: parseDeDate(post.date),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${siteUrl}/${l}/blog/${post.slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
