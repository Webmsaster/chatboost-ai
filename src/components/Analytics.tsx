"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const CONSENT_KEY = "chatboost-cookie-consent";

export default function Analytics() {
  const [consent, setConsent] = useState(false);
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  useEffect(() => {
    const check = () => setConsent(localStorage.getItem(CONSENT_KEY) === "accepted");
    check();
    window.addEventListener("cookie-consent-change", check);
    return () => window.removeEventListener("cookie-consent-change", check);
  }, []);

  if (!consent || !domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
