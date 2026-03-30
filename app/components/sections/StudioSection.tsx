"use client";

import { motion } from "framer-motion";

const vp = { once: true, margin: "-80px" } as const;
const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: "easeOut" as const } }),
};

const USE_CASES = [
  {
    tag: "Mixing",
    headline: "FLAT RESPONSE.\nNO COLORATION.",
    body: "The V1 PRO's linear frequency curve reveals what other headphones hide. Producers trust it for final decisions.",
    stats: [{ v: "±0.5dB", l: "Response deviation" }, { v: "0ms", l: "Added latency" }],
  },
  {
    tag: "Monitoring",
    headline: "HEAR THE\nTRUTH.",
    body: "Reference-grade monitoring for broadcast, mastering and critical playback. What you hear is what the listener hears.",
    stats: [{ v: "32Ω", l: "Impedance" }, { v: "104dB", l: "Sensitivity" }],
  },
  {
    tag: "Live",
    headline: "BUILT FOR\nTHE STAGE.",
    body: "Reinforced headband. 32h battery. Noise isolation at 28dB. From studio to performance without compromise.",
    stats: [{ v: "28dB", l: "Noise isolation" }, { v: "285g", l: "Total weight" }],
  },
];

export default function StudioSection() {
  return (
    <section id="studio" style={{
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

      {/* Ambient */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 60% at 20% 60%, rgba(100,0,12,0.06) 0%, transparent 70%)",
      }} />

      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <motion.p
          custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
          style={{ fontFamily: "var(--font-dm)", fontSize: "10px", letterSpacing: "5px", textTransform: "uppercase", color: "var(--red-core)", marginBottom: "8px" }}
        >
          Studio · 03
        </motion.p>
        <motion.h2
          custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
          style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(42px, 5.5vw, 72px)", lineHeight: 0.88, letterSpacing: "2px", color: "#fff" }}
        >
          BUILT FOR THE<br />
          <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.45)" }}>PROFESSIONAL</span>
        </motion.h2>
      </div>

      {/* 3-column use case cards */}
      <div className="volta-studio-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
        {USE_CASES.map((uc, i) => (
          <motion.div
            key={uc.tag}
            custom={i + 2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
            style={{
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              background: i === 1 ? "rgba(255,255,255,0.065)" : "rgba(255,255,255,0.035)",
              border: i === 1 ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(255,255,255,0.07)",
              borderRadius: "22px",
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              boxShadow: i === 1
                ? "inset 0 1px 0 rgba(255,255,255,0.1), 0 32px 56px rgba(0,0,0,0.45)"
                : "inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 40px rgba(0,0,0,0.3)",
            }}
          >
            {/* Tag */}
            <div style={{
              display: "inline-flex", alignSelf: "flex-start",
              fontFamily: "var(--font-dm)", fontSize: "8px", letterSpacing: "3px", textTransform: "uppercase",
              color: i === 1 ? "var(--red-core)" : "rgba(255,255,255,0.35)",
              border: i === 1 ? "1px solid rgba(180,15,28,0.35)" : "1px solid rgba(255,255,255,0.1)",
              borderRadius: "999px", padding: "4px 12px",
            }}>
              {uc.tag}
            </div>

            {/* Headline */}
            <div style={{
              fontFamily: "var(--font-bebas)", fontSize: "30px", lineHeight: 0.9,
              letterSpacing: "1.5px", color: "#ffffff", whiteSpace: "pre-line",
            }}>
              {uc.headline}
            </div>

            {/* Body */}
            <div style={{ fontFamily: "var(--font-dm)", fontSize: "11px", lineHeight: 1.7, color: "rgba(255,255,255,0.32)", fontWeight: 300, flex: 1 }}>
              {uc.body}
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />

            {/* Stats row */}
            <div style={{ display: "flex", gap: "24px" }}>
              {uc.stats.map(s => (
                <div key={s.l}>
                  <div style={{ fontFamily: "var(--font-bebas)", fontSize: "20px", letterSpacing: "1px", color: "#fff", lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontFamily: "var(--font-dm)", fontSize: "8px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginTop: "4px" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 639px) {
          #studio { padding: 80px 5% 100px !important; height: auto !important; min-height: 100vh; }
          .volta-studio-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
