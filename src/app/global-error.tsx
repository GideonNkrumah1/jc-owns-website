"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ background: "#faf4ec", color: "#211c19", fontFamily: "sans-serif" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div>
            <h1 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
              JC-OWNS is temporarily unavailable
            </h1>
            <p style={{ marginBottom: "1.5rem", color: "#555" }}>
              Please try again in a moment, or reach us directly on WhatsApp.
            </p>
            <button
              onClick={() => reset()}
              style={{
                background: "#173D27",
                color: "#faf4ec",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "2px",
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
