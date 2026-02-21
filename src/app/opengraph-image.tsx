import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "ChatBoost AI – KI-Chatbots für lokale Unternehmen";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#030014",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient orbs background */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.4) 0%, rgba(124,58,237,0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-60px",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,211,238,0.3) 0%, rgba(34,211,238,0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.15) 0%, rgba(34,211,238,0.05) 50%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            padding: "40px",
          }}
        >
          {/* Logo / Icon area */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              background:
                "linear-gradient(135deg, #7c3aed 0%, #22d3ee 100%)",
              marginBottom: "32px",
              fontSize: "40px",
            }}
          >
            <span
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: "36px",
                lineHeight: 1,
              }}
            >
              CB
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              fontSize: "52px",
              fontWeight: 800,
              textAlign: "center",
              lineHeight: 1.2,
              marginBottom: "16px",
              letterSpacing: "-0.02em",
              background:
                "linear-gradient(135deg, #a78bfa 0%, #7c3aed 40%, #22d3ee 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            ChatBoost AI
          </div>

          {/* Subtitle */}
          <div
            style={{
              display: "flex",
              fontSize: "26px",
              fontWeight: 500,
              color: "#e2e8f0",
              textAlign: "center",
              lineHeight: 1.4,
              maxWidth: "700px",
              marginBottom: "24px",
            }}
          >
            KI-Chatbots für lokale Unternehmen
          </div>

          {/* Tagline */}
          <div
            style={{
              display: "flex",
              fontSize: "16px",
              fontWeight: 400,
              color: "#94a3b8",
              textAlign: "center",
              lineHeight: 1.5,
              maxWidth: "600px",
            }}
          >
            Installation, Konfiguration & Wartung – alles aus einer Hand
          </div>
        </div>

        {/* Bottom border gradient */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background:
              "linear-gradient(90deg, #7c3aed 0%, #22d3ee 50%, #7c3aed 100%)",
            display: "flex",
          }}
        />

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            right: "40px",
            fontSize: "14px",
            fontWeight: 500,
            color: "#64748b",
            display: "flex",
          }}
        >
          chatboost-ai.de
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
