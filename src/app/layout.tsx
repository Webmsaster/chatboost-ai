import type { Metadata } from "next";

function getSiteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || "https://chatboost-ai.de").trim();
  return raw.startsWith("http") ? raw : `https://${raw}`;
}

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
