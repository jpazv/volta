"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const N_BARS = 80;

function FreqBarsCanvas() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const rafRef       = useRef<number>(0);
  const lastFrameRef = useRef<number>(0);
  const tRef         = useRef(Date.now());
  const heightsRef   = useRef(new Float32Array(N_BARS));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const TARGET = 1000 / 30;

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      const t = (Date.now() - tRef.current) / 1000;

      ctx.clearRect(0, 0, W, H);

      // Transparent background — section handles bg
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.fillRect(0, 0, W, H);

      const heights = heightsRef.current;
      const targets = new Float32Array(N_BARS);

      for (let i = 0; i < N_BARS; i++) {
        const norm     = i / (N_BARS - 1);
        const triangle = Math.sin(norm * Math.PI);
        const p1 = (i * 1.618) % (Math.PI * 2);
        const p2 = (i * 2.414) % (Math.PI * 2);
        const p3 = (i * 0.927) % (Math.PI * 2);
        const drift =
          0.06 * Math.sin(t * 0.38 + p1) +
          0.04 * Math.sin(t * 0.22 + p2) +
          0.02 * Math.sin(t * 0.55 + p3);
        targets[i] = Math.max(0.03, triangle * 0.85 + drift);
      }

      for (let i = 0; i < N_BARS; i++) {
        const alpha = targets[i] > heights[i] ? 0.15 : 0.08;
        heights[i] = heights[i] * (1 - alpha) + targets[i] * alpha;
      }

      const startX = W * 0.03;
      const totalW = W * 0.94;
      const slotW  = totalW / N_BARS;
      const barW   = Math.max(2, slotW * 0.65);
      const baseY  = H - 60;
      const maxH   = H * 0.55;

      for (let i = 0; i < N_BARS; i++) {
        const h = Math.max(3, heights[i] * maxH);
        const x = startX + i * slotW + (slotW - barW) / 2;
        const y = baseY - h;

        const fill = ctx.createLinearGradient(x, baseY, x, y);
        fill.addColorStop(0, "rgba(60,0,6,0.6)");
        fill.addColorStop(0.5, "rgba(120,0,14,0.5)");
        fill.addColorStop(1, "rgba(180,10,22,0.4)");
        ctx.globalAlpha = 1;
        ctx.fillStyle = fill;
        ctx.fillRect(x, y, barW, h);

        // Left edge highlight
        ctx.globalAlpha = 0.15 + heights[i] * 0.1;
        ctx.fillStyle = "rgba(220,40,55,0.5)";
        ctx.fillRect(x, y, 1.2, h);

        // Top cap
        ctx.globalAlpha = 0.3 + heights[i] * 0.2;
        ctx.fillStyle = "rgba(220,30,45,0.7)";
        ctx.fillRect(x, y, barW, 1.5);
      }

      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop);
      if (now - lastFrameRef.current < TARGET) return;
      lastFrameRef.current = now;
      if (!document.hidden) draw();
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}

export default function LifestyleSection() {
  return (
    <section
      id="lifestyle"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "#02000a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Frequency bars — full background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <FreqBarsCanvas />
      </div>

      {/* Deep red ambient glow — center */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
        background: "radial-gradient(ellipse 55% 60% at 50% 80%, rgba(180,10,22,0.18) 0%, transparent 70%)",
      }} />

      {/* Person — main element */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        style={{
          position: "relative",
          zIndex: 3,
          pointerEvents: "none",
          userSelect: "none",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <img
          src="/voltamkt1_nobg.png"
          alt="VØLTA V1 Pro — worn"
          style={{
            height: "95vh",
            width: "auto",
            objectFit: "contain",
            objectPosition: "bottom center",
            display: "block",
          }}
        />

        {/* Bottom fade — blends into bars */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "22%",
          background: "linear-gradient(0deg, #02000a 0%, transparent 100%)",
          pointerEvents: "none",
        }} />
      </motion.div>

      {/* Floating label — top left */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: "10%",
          left: "6%",
          zIndex: 4,
          pointerEvents: "none",
        }}
      >
        <p style={{
          fontFamily: "var(--font-dm), 'DM Sans', sans-serif",
          fontSize: "9px",
          letterSpacing: "5px",
          textTransform: "uppercase",
          color: "var(--red-core)",
          marginBottom: "12px",
        }}>
          Experience · 00
        </p>
        <div style={{ lineHeight: 0.88 }}>
          {["CLOSE", "YOUR EYES."].map((word) => (
            <div key={word}>
              <span style={{
                display: "block",
                fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                fontSize: "clamp(36px, 4.5vw, 62px)",
                letterSpacing: "2px",
                color: "rgba(255,255,255,0.88)",
              }}>
                {word}
              </span>
            </div>
          ))}
          <span style={{
            display: "block",
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: "clamp(36px, 4.5vw, 62px)",
            letterSpacing: "2px",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(255,255,255,0.4)",
          }}>
            OPEN YOUR EARS.
          </span>
        </div>
      </motion.div>

      {/* Vignette */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 5,
        pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)",
      }} />
    </section>
  );
}
