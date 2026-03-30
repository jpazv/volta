"use client";

import { useState } from "react";

const LINKS: { label: string; idx: number }[] = [
  { label: "Sound",   idx: 1 },
  { label: "Tech",    idx: 2 },
  { label: "Studio",  idx: 3 },
  { label: "Reserve", idx: 4 },
];

function scrollTo(idx: number) {
  window.dispatchEvent(new CustomEvent("volta-scroll", { detail: { idx } }));
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="volta-nav"
        style={{
          position: "fixed",
          top: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          height: "44px",
          background: "rgba(8,0,15,0.72)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: "999px",
          gap: "8px",
          minWidth: "min(640px, 90vw)",
          boxShadow: "0 2px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo(0)}
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: "22px",
            letterSpacing: "3px",
            color: "#ffffff",
            flexShrink: 0,
            paddingRight: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0 8px 0 0",
          }}
        >
          VØ<span style={{ color: "var(--red-core)" }}>LT</span>A
        </button>

        {/* Divider — hidden on mobile */}
        <div className="volta-nav-divider" style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />

        {/* Desktop links — hidden on mobile */}
        <div className="volta-nav-links" style={{ display: "flex", alignItems: "center", gap: "4px", flex: 1, justifyContent: "center" }}>
          {LINKS.map(({ label, idx }) => (
            <button
              key={label}
              onClick={() => scrollTo(idx)}
              style={{
                fontFamily: "var(--font-dm), 'DM Sans', sans-serif",
                fontSize: "12px",
                letterSpacing: "0.5px",
                color: label === "Reserve" ? "#ffffff" : "rgba(255,255,255,0.5)",
                background: label === "Reserve" ? "rgba(90,0,10,0.55)" : "transparent",
                backdropFilter: label === "Reserve" ? "blur(8px)" : undefined,
                WebkitBackdropFilter: label === "Reserve" ? "blur(8px)" : undefined,
                border: label === "Reserve" ? "1px solid rgba(180,15,28,0.3)" : "none",
                padding: label === "Reserve" ? "5px 14px" : "5px 12px",
                borderRadius: "999px",
                cursor: "pointer",
                transition: "color 0.2s, background 0.2s",
                whiteSpace: "nowrap",
                minHeight: "32px",
                minWidth: "44px",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                if (label !== "Reserve") el.style.color = "rgba(255,255,255,0.9)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                if (label !== "Reserve") el.style.color = "rgba(255,255,255,0.5)";
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Mobile: Reserve + Hamburger */}
        <div className="volta-nav-mobile" style={{ display: "none", alignItems: "center", gap: "8px", marginLeft: "auto" }}>
          <button
            onClick={() => scrollTo(4)}
            style={{
              fontFamily: "var(--font-dm), 'DM Sans', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.5px",
              color: "#ffffff",
              background: "rgba(90,0,10,0.55)",
              border: "1px solid rgba(180,15,28,0.3)",
              padding: "6px 14px",
              borderRadius: "999px",
              cursor: "pointer",
              minHeight: "44px",
              minWidth: "44px",
            }}
          >
            Reserve
          </button>

          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              minHeight: "44px",
              minWidth: "44px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {menuOpen ? (
              // X icon
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <line x1="2" y1="2" x2="16" y2="16" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="16" y1="2" x2="2" y2="16" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              // Hamburger
              <>
                <span style={{ display: "block", width: "18px", height: "1.5px", background: "rgba(255,255,255,0.7)", borderRadius: "2px" }} />
                <span style={{ display: "block", width: "12px", height: "1.5px", background: "rgba(255,255,255,0.7)", borderRadius: "2px" }} />
                <span style={{ display: "block", width: "18px", height: "1.5px", background: "rgba(255,255,255,0.7)", borderRadius: "2px" }} />
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "72px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 99,
            background: "rgba(8,0,15,0.95)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "20px",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            minWidth: "min(280px, 80vw)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
          }}
        >
          {LINKS.slice(0, 3).map(({ label, idx }) => (
            <button
              key={label}
              onClick={() => { scrollTo(idx); setMenuOpen(false); }}
              style={{
                fontFamily: "var(--font-dm), 'DM Sans', sans-serif",
                fontSize: "14px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
                background: "transparent",
                border: "none",
                padding: "14px 20px",
                borderRadius: "12px",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.15s, color 0.15s",
                minHeight: "44px",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "rgba(255,255,255,0.06)";
                el.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "transparent";
                el.style.color = "rgba(255,255,255,0.7)";
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 639px) {
          .volta-nav { min-width: calc(100vw - 32px) !important; padding: 0 16px !important; }
          .volta-nav-divider { display: none !important; }
          .volta-nav-links { display: none !important; }
          .volta-nav-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
