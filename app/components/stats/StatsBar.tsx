"use client";

const STATS = [
  { value: "40Hz", label: "Base Frequency" },
  { value: "120dB", label: "Max Pressure" },
  { value: "32h", label: "Battery Life" },
  { value: "V1 PRO", label: "Current Series" },
];

export default function StatsBar() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9,
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",

        width: "100%",
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRadius: "24px",

        padding: "8px 0",
        boxShadow: "0 -6px 24px rgba(0,0,0,0.4)",
      }}



    >
      {STATS.map((stat, i) => (
        <div
          key={stat.label}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",

            padding: "12px 32px",


            borderRight:
              i < STATS.length - 1 ? "1px solid var(--border-subtle)" : "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",

              fontSize: "20px",


              color: "#ffffff",
              lineHeight: 1,
            }}
          >
            {stat.value}
          </span>
          <span
            style={{
              fontFamily: "var(--font-dm), 'DM Sans', sans-serif",
              fontSize: "9px",
              letterSpacing: "2px",
              color: "var(--text-muted)",
              textTransform: "uppercase",
            }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
