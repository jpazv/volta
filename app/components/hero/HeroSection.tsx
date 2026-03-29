"use client";

import { motion, type Variants } from "framer-motion";
import BeamsCanvas from "./BeamsCanvas";

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

export default function HeroSection() {
  return (
    <section style={{
      position: "relative",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      background: "var(--bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>

      {/* Equalizer canvas — full background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <BeamsCanvas />
      </div>

      {/* Center — frosted glass card */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{
          position: "relative",
          zIndex: 4,
          backdropFilter: "blur(36px)",
          WebkitBackdropFilter: "blur(36px)",
          background: "rgba(255,255,255,0.045)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "28px",
          padding: "32px 44px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
          pointerEvents: "none",
          minWidth: "340px",
        }}
      >
        {/* Eyebrow */}
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "var(--font-dm), 'DM Sans', sans-serif",
            fontSize: "10px",
            letterSpacing: "5px",
            textTransform: "uppercase",
            color: "var(--red-core)",
            marginBottom: "20px",
          }}
        >
          V1 Pro Series · 2025
        </motion.p>

        {/* Headline */}
        <div style={{ marginBottom: "24px", lineHeight: 0.88 }}>
          {(["SIGNAL", "OVER", "NOISE"] as const).map((word, i) => (
            <motion.div key={word} custom={i + 1} variants={fadeUp} initial="hidden" animate="visible">
              <span style={{
                display: "block",
                fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                fontSize: "clamp(64px, 8vw, 106px)",
                letterSpacing: "3px",
                color: word === "OVER" ? "transparent" : "rgba(255,255,255,0.92)",
                WebkitTextStroke: word === "OVER" ? "1.5px rgba(255,255,255,0.55)" : undefined,
              }}>
                {word}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ width: "40px", height: "1px", background: "rgba(255,255,255,0.12)", marginBottom: "20px" }} />

        {/* Tagline */}
        <motion.p
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "var(--font-dm), 'DM Sans', sans-serif",
            fontSize: "11px",
            lineHeight: 1.9,
            color: "rgba(255,255,255,0.32)",
            marginBottom: "28px",
            maxWidth: "240px",
          }}
        >
          40mm neodymium drivers. 120dB output.
          <br />32 hours continuous play.
        </motion.p>

        {/* CTA row */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", alignItems: "center", gap: "28px", pointerEvents: "auto" }}
        >
          <a
            href="#"
            style={{
              fontFamily: "var(--font-dm), 'DM Sans', sans-serif",
              fontSize: "10px",
              letterSpacing: "3.5px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.88)",
              textDecoration: "none",
              background: "rgba(90,0,10,0.45)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(180,15,28,0.35)",
              padding: "14px 32px",
              display: "inline-block",
              transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.transform = "translateY(-2px)";
              el.style.background = "rgba(120,0,14,0.65)";
              el.style.boxShadow = "0 8px 32px rgba(100,0,12,0.4)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "rgba(90,0,10,0.45)";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
            }}
          >
            Reserve the V1 PRO
          </a>

          <a
            href="#"
            style={{
              fontFamily: "var(--font-dm), 'DM Sans', sans-serif",
              fontSize: "10px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.38)",
              textDecoration: "none",
              transition: "color 0.2s",
              cursor: "pointer",
              pointerEvents: "auto",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.85)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.38)")}
          >
            Tech specs →
          </a>
        </motion.div>
      </motion.div>

      {/* Right — floating brand mark over bars */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        style={{
          position: "absolute",
          right: "6%",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 4,
          pointerEvents: "none",
          textAlign: "right",
        }}
      >
        <div style={{
          fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
          fontSize: "clamp(48px, 6vw, 80px)",
          letterSpacing: "8px",
          color: "rgba(255,255,255,0.06)",
          lineHeight: 1,
          userSelect: "none",
        }}>
          VØLTA
        </div>
        <div style={{
          fontFamily: "var(--font-dm), 'DM Sans', sans-serif",
          fontSize: "9px",
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.08)",
          marginTop: "6px",
        }}>
          Reference Series
        </div>
      </motion.div>

    </section>
  );
}
