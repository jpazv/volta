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
    <section style={{
      position: "relative",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      background: "#03010d",
      display: "flex",
      alignItems: "center",
      gap: "5%",
      padding: "0 6%",
    }}>

      {/* Ambient */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 50% 70% at 75% 50%, rgba(80,0,10,0.08) 0%, transparent 70%)",
      }} />

      {/* Left — headline + spec list */}
      <div style={{ flex: "0 0 44%", display: "flex", flexDirection: "column", gap: "40px" }}>
        <div>
          <motion.p
            custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
            style={{ fontFamily: "var(--font-dm)", fontSize: "10px", letterSpacing: "5px", textTransform: "uppercase", color: "var(--red-core)", marginBottom: "12px" }}
          >
            Tech · 02
          </motion.p>
          <motion.h2
            custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}
            style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(56px, 6.5vw, 88px)", lineHeight: 0.88, letterSpacing: "2px", color: "#fff" }}
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
            borderRadius: "20px",
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
                padding: "15px 24px",
                borderBottom: i < SPECS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}>
                <div style={{ fontFamily: "var(--font-bebas)", fontSize: "22px", letterSpacing: "1px", color: "#fff", minWidth: "72px" }}>{s.value}</div>
                <div style={{ fontFamily: "var(--font-dm)", fontSize: "8px", letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.32)" }}>{s.label}</div>
              </div>
              <div style={{ fontFamily: "var(--font-dm)", fontSize: "10px", color: "rgba(255,255,255,0.18)", textAlign: "right" }}>{s.detail}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right — concentric ring diagram */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp}
          transition={{ duration: 1.2, delay: 0.3 }}
          style={{ position: "relative", width: "420px", height: "420px" }}
        >
          {[420, 340, 260, 190, 130, 80].map((size, i) => (
            <div key={size} style={{
              position: "absolute",
              top: "50%", left: "50%",
              width: size, height: size,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: `1px solid rgba(255,255,255,${0.03 + i * 0.015})`,
              animation: `volta-ring-${i % 2 === 0 ? "cw" : "ccw"} ${28 + i * 12}s linear infinite`,
            }} />
          ))}

          {/* Center glass pill */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "110px", height: "110px",
            borderRadius: "50%",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.5)",
          }}>
            <div style={{ fontFamily: "var(--font-bebas)", fontSize: "28px", letterSpacing: "1px", color: "#fff", lineHeight: 1 }}>40MM</div>
            <div style={{ fontFamily: "var(--font-dm)", fontSize: "7px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>Driver</div>
          </div>

          {[
            { label: "Neodymium", top: "6%",  left: "52%" },
            { label: "5Hz Floor",  top: "50%", left: "88%" },
            { label: "Beryllium",  top: "86%", left: "54%" },
          ].map(l => (
            <div key={l.label} style={{
              position: "absolute", top: l.top, left: l.left,
              fontFamily: "var(--font-dm)", fontSize: "8px", letterSpacing: "2px",
              textTransform: "uppercase", color: "rgba(255,255,255,0.2)", whiteSpace: "nowrap",
            }}>{l.label}</div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes volta-ring-cw  { to { transform: translate(-50%,-50%) rotate(360deg);  } }
        @keyframes volta-ring-ccw { to { transform: translate(-50%,-50%) rotate(-360deg); } }
      `}</style>
    </section>
  );
}
