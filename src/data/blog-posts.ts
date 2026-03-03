export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  content: string[];
};

export type Locale = "de" | "en";

export async function getBlogPosts(locale: Locale): Promise<BlogPost[]> {
  if (locale === "en") {
    return (await import("./blog-posts.en")).blogPostsEn;
  }
  return (await import("./blog-posts.de")).blogPostsDe;
}

export async function getPostBySlug(
  slug: string,
  locale: Locale
): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts(locale);
  return posts.find((post) => post.slug === slug);
}

export async function getAllSlugs(): Promise<string[]> {
  const { blogPostsDe } = await import("./blog-posts.de");
  return blogPostsDe.map((post) => post.slug);
}
