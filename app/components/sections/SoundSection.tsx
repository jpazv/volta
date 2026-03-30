"use client";

import { motion } from "framer-motion";

const vp = { once: true, margin: "-80px" } as const;

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: "easeOut" as const } }),
};

const CARDS = [
  {
    value: "120dB",
    label: "Max Pressure Level",
    sub: "Reference-grade SPL — every nuance, every peak, reproduced without distortion.",
    bar: 0.92,
  },
  {
    value: "5–40kHz",
    label: "Frequency Range",
    sub: "From subsonic rumble to the edge of perception. Nothing cut, nothing boosted.",
    bar: 1.0,
  },
  {
    value: "40mm",
    label: "Neodymium Driver",
    sub: "Custom-wound voice coil on a beryllium-coated dome. Tight bass, airy highs.",
    bar: 0.78,
  },
  {
    value: "Hi-Res",
    label: "Audio Certified",
    sub: "Exceeds the Japan Audio Society standard for high-resolution audio playback.",
    bar: 0.65,
  },
];

export default function SoundSection() {
  return (
    <section id="sound" style={{
      position: "relative",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      background: "#02000a",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "72px 6% 110px",
    }}>

      {/* Ambient glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 50% at 80% 50%, rgba(232,0,30,0.04) 0%, transparent 70%)",
      }} />

      {/* White headphones — background right */}
      <div style={{
        position: "absolute", right: "-4%", top: "50%",
        transform: "translateY(-50%)",
        width: "52%", pointerEvents: "none", zIndex: 0,
        opacity: 0.13,
      }}>
        <img
          src="/volta_white_nobg.png"
          alt=""
          aria-hidden="true"
          style={{ width: "100%", height: "auto", display: "block", filter: "blur(1px)" }}
        />
      </div>

      {/* Header */}
      <div style={{ marginBottom: "24px", position: "relative", zIndex: 1 }}>
        <motion.p
          custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
          style={{ fontFamily: "var(--font-dm)", fontSize: "10px", letterSpacing: "5px", textTransform: "uppercase", color: "var(--red-core)", marginBottom: "8px" }}
        >
          Sound · 01
        </motion.p>
        <motion.h2
          custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
          style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(42px, 5.5vw, 72px)", lineHeight: 0.88, letterSpacing: "2px", color: "#fff" }}
        >
          FEEL EVERY<br />
          <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.45)" }}>FREQUENCY</span>
        </motion.h2>
      </div>

      {/* Cards grid */}
      <div className="volta-sound-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", position: "relative", zIndex: 1 }}>
        {CARDS.map((c, i) => (
          <motion.div
            key={c.label}
            custom={i + 2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
            style={{
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "18px",
              padding: "20px 18px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 40px rgba(0,0,0,0.4)",
              cursor: "default",
            }}
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.2 }}
          >
            {/* Value */}
            <div style={{ fontFamily: "var(--font-bebas)", fontSize: "36px", lineHeight: 1, letterSpacing: "1px", color: "#ffffff" }}>
              {c.value}
            </div>

            {/* Label */}
            <div style={{ fontFamily: "var(--font-dm)", fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
              {c.label}
            </div>

            {/* Bar */}
            <div style={{ height: "2px", background: "rgba(255,255,255,0.07)", borderRadius: "2px", overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${c.bar * 100}%` }}
                viewport={vp}
                transition={{ duration: 1.1, delay: i * 0.1 + 0.4, ease: "easeOut" }}
                style={{ height: "100%", background: "linear-gradient(90deg, rgba(90,0,10,0.9), rgba(160,10,22,0.8))", borderRadius: "2px" }}
              />
            </div>

            {/* Sub */}
            <div style={{ fontFamily: "var(--font-dm)", fontSize: "10px", lineHeight: 1.65, color: "rgba(255,255,255,0.28)", fontWeight: 300 }}>
              {c.sub}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom quote card */}
      <motion.div
        custom={6} variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
        style={{
          marginTop: "14px",
          position: "relative", zIndex: 1,
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "14px",
          padding: "14px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        <div style={{ fontFamily: "var(--font-bebas)", fontSize: "18px", letterSpacing: "3px", color: "rgba(255,255,255,0.5)" }}>
          "Every driver tuned by ear. Every curve measured in silence."
        </div>
        <div style={{ fontFamily: "var(--font-dm)", fontSize: "9px", letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", whiteSpace: "nowrap" }}>
          VØLTA Sound Lab · 2025
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 639px) {
          #sound { padding: 80px 5% 100px !important; height: auto !important; min-height: 100vh; }
          .volta-sound-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
