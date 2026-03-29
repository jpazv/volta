"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

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
      staggerChildren: 0.15,
    },
  },
};

const PRESS_MARKS =
  "AUDIOPHILE REVIEW · SOUND & VISION · THE WIRE · STEREOPHILE · INNER FIDELITY";

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "#02000a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Diagonal gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(232,0,30,0.03) 0%, transparent 50%, rgba(0,0,0,0.4) 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        {/* Parallax headline wrapper */}
        <motion.div style={{ y: headlineY }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* THE */}
            <motion.div variants={fadeUp}>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                  fontSize: "clamp(28px, 4vw, 48px)",
                  letterSpacing: "8px",
                  color: "rgba(255,255,255,0.2)",
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                THE
              </span>
            </motion.div>

            {/* SIGNAL */}
            <motion.div variants={fadeUp}>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                  fontSize: "clamp(120px, 16vw, 200px)",
                  color: "#ffffff",
                  lineHeight: 0.85,
                  letterSpacing: "4px",
                }}
              >
                SIGNAL
              </span>
            </motion.div>

            {/* IS THE */}
            <motion.div variants={fadeUp}>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                  fontSize: "clamp(28px, 4vw, 48px)",
                  letterSpacing: "8px",
                  color: "rgba(255,255,255,0.2)",
                  lineHeight: 1,
                  margin: "8px 0 4px",
                }}
              >
                IS THE
              </span>
            </motion.div>

            {/* TRUTH (outline) */}
            <motion.div variants={fadeUp}>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                  fontSize: "clamp(120px, 16vw, 200px)",
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255,255,255,0.25)",
                  lineHeight: 0.85,
                  letterSpacing: "4px",
                }}
              >
                TRUTH
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Body paragraph */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-dm), 'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: "14px",
            lineHeight: 2,
            color: "rgba(255,255,255,0.4)",
            maxWidth: "420px",
            marginTop: "48px",
            textAlign: "center",
          }}
        >
          Every driver tuned by ear. Every curve measured in silence. The V1
          PRO doesn&apos;t chase trends — it chases accuracy.
        </motion.p>
      </div>

      {/* Press marks */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        style={{
          position: "absolute",
          bottom: "40px",
          left: 0,
          right: 0,
          zIndex: 3,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-dm), 'DM Sans', sans-serif",
            fontSize: "8px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.15)",
            fontVariant: "small-caps",
          }}
        >
          {PRESS_MARKS}
        </span>
      </motion.div>
    </section>
  );
}
