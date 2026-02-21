import { ImageResponse } from "next/og";
import { getPostBySlug, blogPosts } from "@/data/blog-posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#030014",
            color: "white",
            fontSize: 48,
          }}
        >
          ChatBoost AI
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #030014, #1a0a3e, #030014)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: Category badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              padding: "6px 16px",
              borderRadius: "20px",
              background: "rgba(124, 58, 237, 0.2)",
              border: "1px solid rgba(124, 58, 237, 0.3)",
              color: "#a78bfa",
              fontSize: 18,
            }}
          >
            {post.category}
          </div>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 18 }}>
            {post.readTime}
          </div>
        </div>

        {/* Center: Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "white",
              lineHeight: 1.2,
              maxWidth: "900px",
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.4)",
              maxWidth: "800px",
              lineHeight: 1.4,
            }}
          >
            {post.description}
          </div>
        </div>

        {/* Bottom: Branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              CB
            </div>
            <div style={{ fontSize: 22, color: "white", fontWeight: 600 }}>
              ChatBoost AI
            </div>
          </div>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 18 }}>
            chatboost-ai.de/blog
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
