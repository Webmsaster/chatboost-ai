import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/data/blog-posts";
import type { Locale } from "@/data/blog-posts";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug, locale as Locale);

  const title = post?.title ?? "Blog";
  const category = post?.category ?? "";
  const date = post?.date ?? "";
  const readTime = post?.readTime ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 40%, #2d1b69 70%, #1e1145 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top section: Category badge */}
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          {category && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(99, 102, 241, 0.25)",
                border: "1px solid rgba(99, 102, 241, 0.5)",
                borderRadius: "9999px",
                padding: "8px 20px",
                fontSize: "18px",
                fontWeight: 600,
                color: "#a5b4fc",
                letterSpacing: "0.05em",
              }}
            >
              {category}
            </div>
          )}
        </div>

        {/* Middle section: Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: title.length > 60 ? 40 : title.length > 40 ? 48 : 56,
              fontWeight: 700,
              lineHeight: 1.2,
              color: "white",
              maxWidth: "1000px",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>

          {/* Date and read time */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              fontSize: "20px",
              color: "#94a3b8",
            }}
          >
            {date && <span>{date}</span>}
            {date && readTime && (
              <span style={{ color: "#4f46e5" }}>|</span>
            )}
            {readTime && <span>{readTime}</span>}
          </div>
        </div>

        {/* Bottom section: Branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* Logo icon */}
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: 700,
                color: "white",
              }}
            >
              CB
            </div>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "white",
                letterSpacing: "-0.01em",
              }}
            >
              ChatBoost AI
            </span>
          </div>

          <div
            style={{
              fontSize: "16px",
              color: "#64748b",
            }}
          >
            chatboost-ai.de
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
