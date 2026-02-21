"use client";

import Script from "next/script";

export default function Analytics() {
  return (
    <Script
      defer
      data-domain="chatboost-ai.de"
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
