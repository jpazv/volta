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
    }}>

      {/* Equalizer canvas — full background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <BeamsCanvas />
      </div>

      {/* Ambient red glow behind person */}
      <div style={{
        position: "absolute",
        right: "10%",
        bottom: "0",
        width: "560px",
        height: "560px",
        background: "radial-gradient(ellipse at center bottom, rgba(180,10,22,0.13) 0%, transparent 65%)",
        zIndex: 2,
        pointerEvents: "none",
      }} />

      {/* Person cutout — right side, bottom anchored — hidden on mobile */}
      <motion.div
        className="volta-hero-person"
        initial={{ opacity: 0, x: 32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          zIndex: 3,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <img
          src="/voltamkt1_nobg.png"
          alt="Person wearing VØLTA V1 Pro headphones"
          style={{
            height: "92vh",
            width: "auto",
            display: "block",
            objectFit: "contain",
            objectPosition: "bottom center",
          }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, var(--bg) 0%, rgba(0,0,0,0) 28%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(0deg, var(--bg) 0%, rgba(0,0,0,0) 18%)",
          pointerEvents: "none",
        }} />
      </motion.div>

      {/* Left — frosted glass card */}
      <motion.div
        className="volta-hero-card"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{
          position: "relative",
          zIndex: 4,
          marginLeft: "8%",
          backdropFilter: "blur(36px)",
          WebkitBackdropFilter: "blur(36px)",
          background: "rgba(255,255,255,0.045)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "28px",
          padding: "20px 36px 22px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          textAlign: "left",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
          pointerEvents: "none",
          minWidth: "300px",
          maxWidth: "380px",
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
            marginBottom: "14px",
          }}
        >
          V1 Pro Series · 2025
        </motion.p>

        {/* Headline */}
        <div style={{ marginBottom: "16px", lineHeight: 0.88 }}>
          {(["SIGNAL", "OVER", "NOISE"] as const).map((word, i) => (
            <motion.div key={word} custom={i + 1} variants={fadeUp} initial="hidden" animate="visible">
              <span style={{
                display: "block",
                fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                fontSize: "clamp(44px, 5.5vw, 76px)",
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
        <div style={{ width: "40px", height: "1px", background: "rgba(255,255,255,0.12)", marginBottom: "14px" }} />

        {/* Tagline */}
        <motion.p
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "var(--font-dm), 'DM Sans', sans-serif",
            fontSize: "11px",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.32)",
            marginBottom: "18px",
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

      <style>{`
        @media (max-width: 639px) {
          .volta-hero-person { display: none !important; }
          .volta-hero-card {
            margin-left: 0 !important;
            margin: 0 5% !important;
            align-items: center !important;
            text-align: center !important;
            min-width: unset !important;
            max-width: unset !important;
            width: 90% !important;
          }
        }
      `}</style>
    </section>
  );
}
