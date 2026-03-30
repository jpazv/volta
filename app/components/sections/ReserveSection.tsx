"use client";

import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75 },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
    },
  },
};

export default function ReserveSection() {
  return (
    <section
      id="reserve"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(to bottom, #02000a 0%, #0d0003 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background ghost text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: "80vw",
            color: "rgba(232,0,30,0.04)",
            lineHeight: 1,
            letterSpacing: "4px",
          }}
        >
          VØLTA
        </span>
      </div>

      {/* Main content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "0px",
        }}
      >
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-dm), 'DM Sans', sans-serif",
            fontSize: "9px",
            letterSpacing: "5px",
            textTransform: "uppercase",
            color: "var(--red-core)",
            marginBottom: "24px",
          }}
        >
          Limited First Run · 2025
        </motion.p>

        {/* Main headline */}
        <div style={{ lineHeight: 0.85, marginBottom: "32px" }}>
          {["RESERVE", "THE V1 PRO"].map((line) => (
            <motion.div key={line} variants={fadeUp}>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                  fontSize: "clamp(80px, 10vw, 130px)",
                  color: "#ffffff",
                  letterSpacing: "3px",
                }}
              >
                {line}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Price */}
        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-dm), 'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: "18px",
            color: "#ffffff",
            marginBottom: "40px",
          }}
        >
          Starting at $349
          <sup
            style={{
              fontSize: "10px",
              color: "rgba(255,255,255,0.35)",
              marginLeft: "3px",
            }}
          >
            *
          </sup>
        </motion.p>

        {/* CTA button */}
        <motion.div variants={fadeUp}>
          <a
            href="#"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: "20px",
              letterSpacing: "4px",
              color: "rgba(255,255,255,0.88)",
              background: "rgba(90,0,10,0.45)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(180,15,28,0.35)",
              padding: "18px 64px",
              textDecoration: "none",
              borderRadius: 0,
              transition: "transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "rgba(120,0,14,0.65)";
              el.style.transform = "translateY(-3px)";
              el.style.boxShadow = "0 12px 40px rgba(100,0,12,0.4)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "rgba(90,0,10,0.45)";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
            }}
          >
            RESERVE NOW
          </a>
        </motion.div>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-dm), 'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: "9px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
            marginTop: "20px",
          }}
        >
          Free shipping worldwide · 30-day returns · 2-year warranty
        </motion.p>
      </motion.div>

    </section>
  );
}
