import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getBlogPosts } from "@/data/blog-posts";
import BlogPageContent from "./BlogPageContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPage" });

  return {
    title: t("title") + " " + t("titleHighlight"),
    description: t("description"),
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = await getBlogPosts(locale as "de" | "en");

  return <BlogPageContent posts={posts} />;
}
