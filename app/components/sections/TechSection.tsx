"use client";

import { motion } from "framer-motion";

const vp = { once: true, margin: "-80px" } as const;
const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: "easeOut" as const } }),
};

const SPECS = [
  { value: "40mm",    label: "Driver",          detail: "Neodymium, beryllium dome" },
  { value: "5–40kHz", label: "Freq. Response",  detail: "Beyond human hearing range" },
  { value: "32Ω",     label: "Impedance",        detail: "Compatible with all sources" },
  { value: "285g",    label: "Weight",           detail: "Titanium reinforced frame" },
  { value: "32h",     label: "Battery",          detail: "Fast charge — 10min → 3h" },
  { value: "28dB",    label: "Noise Isolation",  detail: "Passive acoustic seal" },
];

export default function TechSection() {
  return (
    <section id="tech" style={{
      position: "relative",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      background: "#03010d",
      display: "flex",
      alignItems: "center",
      gap: "5%",
      padding: "72px 6% 110px",
    }}>

      {/* Ambient */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 50% 70% at 75% 50%, rgba(80,0,10,0.08) 0%, transparent 70%)",
      }} />

      {/* Left — headline + spec list */}
      <div className="volta-tech-left" style={{ flex: "0 0 44%", display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <motion.p
            custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
            style={{ fontFamily: "var(--font-dm)", fontSize: "10px", letterSpacing: "5px", textTransform: "uppercase", color: "var(--red-core)", marginBottom: "8px" }}
          >
            Tech · 02
          </motion.p>
          <motion.h2
            custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
            style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(42px, 5.5vw, 72px)", lineHeight: 0.88, letterSpacing: "2px", color: "#fff" }}
          >
            ZERO<br />
            <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.45)" }}>COMPROMISE</span>
          </motion.h2>
        </div>

        {/* Spec rows — glass list card */}
        <motion.div
          custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
          style={{
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 48px rgba(0,0,0,0.4)",
          }}
        >
          {SPECS.map((s, i) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "11px 20px",
                borderBottom: i < SPECS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1 }}>
                <div style={{ fontFamily: "var(--font-bebas)", fontSize: "20px", letterSpacing: "1px", color: "#fff", minWidth: "64px" }}>{s.value}</div>
                <div style={{ fontFamily: "var(--font-dm)", fontSize: "8px", letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.32)" }}>{s.label}</div>
              </div>
              <div style={{ fontFamily: "var(--font-dm)", fontSize: "10px", color: "rgba(255,255,255,0.18)", textAlign: "right" }}>{s.detail}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right — white headphones person */}
      <div className="volta-tech-right" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <motion.div
          initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp}
          transition={{ duration: 1.0, delay: 0.3, ease: "easeOut" }}
          style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}
        >
          <img
            src="/volta_white_nobg.png"
            alt="VØLTA V1 Pro — White Edition"
            style={{
              width: "100%",
              maxWidth: "480px",
              height: "auto",
              objectFit: "contain",
              display: "block",
              filter: "brightness(0.92) contrast(1.05)",
            }}
          />
          {/* Left fade to blend with specs */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, #03010d 0%, transparent 30%)",
            pointerEvents: "none",
          }} />
          {/* Subtle white glow behind headphones */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 60% 50% at 55% 40%, rgba(255,255,255,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 639px) {
          #tech {
            flex-direction: column !important;
            height: auto !important;
            min-height: 100vh;
            padding: 80px 5% 100px !important;
            align-items: flex-start !important;
          }
          .volta-tech-left { flex: unset !important; width: 100% !important; }
          .volta-tech-right { flex: unset !important; width: 100% !important; margin-top: 24px; }
        }
      `}</style>
    </section>
  );
}
