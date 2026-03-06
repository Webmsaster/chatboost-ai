import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
        {
          key: "Content-Security-Policy",
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://plausible.io https://assets.calendly.com https://js.stripe.com; style-src 'self' 'unsafe-inline' https://assets.calendly.com; img-src 'self' data: blob:; font-src 'self'; connect-src 'self' https://plausible.io https://api.openai.com https://formspree.io https://calendly.com https://api.stripe.com; frame-src https://calendly.com https://js.stripe.com;",
        },
      ],
    },
    {
      source: "/:all*(svg|jpg|png|webp|avif|ico|woff2)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
};

export default withNextIntl(nextConfig);
