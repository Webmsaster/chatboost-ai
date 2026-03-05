import { setRequestLocale } from "next-intl/server";
import { getBlogPosts } from "@/data/blog-posts";
import BlogPageContent from "./BlogPageContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = await getBlogPosts(locale as "de" | "en");

  return <BlogPageContent posts={posts} />;
}
