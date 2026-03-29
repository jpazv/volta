"use client";

export default function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
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
      <div
        style={{
          fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
          fontSize: "22px",
          letterSpacing: "3px",
          color: "#ffffff",
          flexShrink: 0,
          paddingRight: "8px",
        }}
      >
        VØ<span style={{ color: "var(--red-core)" }}>LT</span>A
      </div>

      {/* Divider */}
      <div style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px", flex: 1, justifyContent: "center" }}>
        {["Sound", "Tech", "Studio", "Reserve"].map((label) => (
          <a
            key={label}
            href="#"
            style={{
              fontFamily: "var(--font-dm), 'DM Sans', sans-serif",
              fontSize: "12px",
              letterSpacing: "0.5px",
              color: label === "Reserve" ? "#ffffff" : "rgba(255,255,255,0.5)",
              textDecoration: "none",
              padding: label === "Reserve" ? "5px 14px" : "5px 12px",
              borderRadius: "999px",
              background: label === "Reserve" ? "rgba(90,0,10,0.55)" : "transparent",
              backdropFilter: label === "Reserve" ? "blur(8px)" : undefined,
              WebkitBackdropFilter: label === "Reserve" ? "blur(8px)" : undefined,
              border: label === "Reserve" ? "1px solid rgba(180,15,28,0.3)" : "none",
              transition: "color 0.2s, background 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              if (label !== "Reserve") el.style.color = "rgba(255,255,255,0.9)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              if (label !== "Reserve") el.style.color = "rgba(255,255,255,0.5)";
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
