import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import CookieBanner from "@/components/CookieBanner";
import BackToTop from "@/components/BackToTop";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteUrl = "https://chatboost-ai.de";
const siteName = "ChatBoost AI";
const siteTitle = "ChatBoost AI – KI-Chatbot Service für lokale Unternehmen";
const siteDescription =
  "Done-for-You AI-Chatbot-Service für Immobilienmakler, Salons & Restaurants. Installation, Konfiguration & Wartung – alles aus einer Hand.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "KI Chatbot",
    "AI Chatbot Service",
    "Chatbot für Unternehmen",
    "Chatbot Immobilienmakler",
    "Chatbot Restaurant",
    "Chatbot Salon",
    "KI für lokale Unternehmen",
    "Chatbot erstellen lassen",
    "AI Kundenservice",
    "Chatbot Handwerk",
    "Automatisierung Kundenservice",
    "ChatBoost AI",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ChatBoost AI – KI-Chatbots für lokale Unternehmen",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/opengraph-image"],
    creator: "@chatboost_ai",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon",
  },
  other: {
    "theme-color": "#030014",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <head>
        <meta name="theme-color" content="#030014" />
        <StructuredData />
      </head>
      <body className={`${inter.variable} antialiased noise-overlay`}>
        {children}
        <Analytics />
        <CookieBanner />
        <BackToTop />
      </body>
    </html>
  );
}
