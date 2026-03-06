import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs, getBlogPosts } from "@/data/blog-posts";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import BlogArticleContent from "./BlogArticleContent";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug, locale as "de" | "en");

  if (!post) {
    return { title: locale === "de" ? "Artikel nicht gefunden" : "Article not found" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chatboost-ai.de";

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${siteUrl}/${locale}/blog/${post.slug}`,
      languages: {
        de: `${siteUrl}/de/blog/${post.slug}`,
        en: `${siteUrl}/en/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${siteUrl}/${locale}/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const post = await getPostBySlug(slug, locale as "de" | "en");

  if (!post) {
    notFound();
  }

  // Get related posts (same category, exclude current)
  const allPosts = await getBlogPosts(locale as "de" | "en");
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  // If not enough same-category posts, fill with others
  if (relatedPosts.length < 3) {
    const remaining = allPosts
      .filter((p) => p.slug !== post.slug && !relatedPosts.find((r) => r.slug === p.slug))
      .slice(0, 3 - relatedPosts.length);
    relatedPosts.push(...remaining);
  }

  return <BlogArticleContent post={post} relatedPosts={relatedPosts} />;
}
