"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

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

export default function ProductSection() {
  return (
    <section
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
      {/* Radial red glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(232,0,30,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Left callout */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        style={{
          position: "absolute",
          left: "8%",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "6px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: "56px",
            color: "#ffffff",
            lineHeight: 1,
            letterSpacing: "2px",
          }}
        >
          40MM
        </span>
        <span
          style={{
            fontFamily: "var(--font-dm), 'DM Sans', sans-serif",
            fontSize: "9px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          Neodymium Driver
        </span>
        {/* Horizontal connector line */}
        <div
          style={{
            position: "absolute",
            right: "-48px",
            top: "50%",
            width: "40px",
            height: "1px",
            background:
              "linear-gradient(to right, rgba(232,0,30,0.5), rgba(232,0,30,0.1))",
          }}
        />
      </motion.div>

      {/* Right callout */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        style={{
          position: "absolute",
          right: "8%",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "6px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: "56px",
            color: "#ffffff",
            lineHeight: 1,
            letterSpacing: "2px",
          }}
        >
          32H
        </span>
        <span
          style={{
            fontFamily: "var(--font-dm), 'DM Sans', sans-serif",
            fontSize: "9px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          Battery Life
        </span>
        {/* Horizontal connector line */}
        <div
          style={{
            position: "absolute",
            left: "-48px",
            top: "50%",
            width: "40px",
            height: "1px",
            background:
              "linear-gradient(to left, rgba(232,0,30,0.5), rgba(232,0,30,0.1))",
          }}
        />
      </motion.div>

      {/* Center content */}
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
          gap: "0px",
        }}
      >
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-dm), 'DM Sans', sans-serif",
            fontSize: "10px",
            letterSpacing: "5px",
            textTransform: "uppercase",
            color: "var(--red-core)",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          Introducing · V1 PRO
        </motion.p>

        {/* Product image */}
        <motion.div
          variants={fadeUp}
          style={{
            width: "clamp(300px, 35vw, 480px)",
            height: "clamp(300px, 35vw, 480px)",
            position: "relative",
            filter: "drop-shadow(0 20px 60px rgba(232,0,30,0.2))",
            marginBottom: "32px",
          }}
        >
          <Image
            src="/product.png"
            alt="VØLTA V1 PRO"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </motion.div>

        {/* Product name */}
        <motion.div variants={fadeUp} style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: "80px",
              color: "#ffffff",
              lineHeight: 0.9,
              letterSpacing: "4px",
            }}
          >
            V1 PRO
          </div>
          <div
            style={{
              fontFamily: "var(--font-dm), 'DM Sans', sans-serif",
              fontSize: "11px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              marginTop: "10px",
            }}
          >
            Reference Headphone
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom specs */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{
          position: "absolute",
          bottom: "40px",
          left: 0,
          right: 0,
          zIndex: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Divider */}
        <motion.div
          variants={fadeUp}
          style={{
            width: "80%",
            height: "1px",
            background: "rgba(255,255,255,0.06)",
          }}
        />

        {/* Spec row */}
        <motion.div
          variants={fadeUp}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
          }}
        >
          {["120dB · Max SPL", "40Hz · Base Freq", "Hi-Res · Certified"].map(
            (spec, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "var(--font-dm), 'DM Sans', sans-serif",
                  fontSize: "9px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.25)",
                }}
              >
                {spec}
              </span>
            )
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
