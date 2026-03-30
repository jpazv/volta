"use client";

import { useEffect, useRef, useState } from "react";
import { AudioEngine } from "./AudioEngine";
import type { SmoothedValues } from "./AudioEngine";

const N_BARS   = 80;
const TWO_PI   = Math.PI * 2;
const circPts  = new Float32Array(96 * 2);

export default function BeamsCanvas() {
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const dimRef         = useRef({ W: 0, H: 0 });
  const rafRef         = useRef<number>(0);
  const lastFrameRef   = useRef<number>(0);
  const engineRef      = useRef<AudioEngine | null>(null);
  const audioRef       = useRef(false);
  const smoothRef      = useRef<SmoothedValues>({ bass: 0, mid: 0, high: 0, energy: 0 });
  const tRef           = useRef(Date.now());
  const barHeightsRef  = useRef(new Float32Array(N_BARS));
  const [audioActive, setAudioActive] = useState(false);

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
      dimRef.current = { W, H };
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const TARGET = 1000 / 30;
    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop);
      if (now - lastFrameRef.current < TARGET) return;
      lastFrameRef.current = now;
      if (!document.hidden) drawFrame(canvas);
    };
    rafRef.current = requestAnimationFrame(loop);

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(rafRef.current);
      else rafRef.current = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawFrame = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { W, H } = dimRef.current;
    const t = (Date.now() - tRef.current) / 1000;

    if (engineRef.current && audioRef.current) {
      smoothRef.current = engineRef.current.getSmoothed();
    } else {
      const s = smoothRef.current;
      smoothRef.current = { bass: s.bass * 0.95, mid: s.mid * 0.95, high: s.high * 0.95, energy: s.energy * 0.95 };
    }
    const { bass: sb, energy: se } = smoothRef.current;

    ctx.clearRect(0, 0, W, H);

    // Background — very dark, warm tint toward bottom
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0,   "rgb(2,0,10)");
    bg.addColorStop(0.7, "rgb(6,3,1)");
    bg.addColorStop(1,   "rgb(14,6,0)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Subtle warm glow at horizon (where bars start)
    const baseY = H - 96;
    const horizGlow = ctx.createRadialGradient(W / 2, baseY, 0, W / 2, baseY, W * 0.55);
    horizGlow.addColorStop(0,   `rgba(180,0,20,${0.04 + se * 0.05})`);
    horizGlow.addColorStop(1,   "transparent");
    ctx.fillStyle = horizGlow;
    ctx.fillRect(0, 0, W, H);

    // Compute bar targets
    const fft = engineRef.current?.getFFT();
    const targets = new Float32Array(N_BARS);

    // Triangular envelope — tallest at center, zero at edges (Operários composition)
    for (let i = 0; i < N_BARS; i++) {
      const norm = i / (N_BARS - 1);
      const triangle = Math.sin(norm * Math.PI); // 0 → 1 → 0

      if (fft && audioRef.current) {
        const freqNorm = Math.pow(norm, 1.4);
        const fi = Math.floor(freqNorm * fft.length * 0.72);
        const raw = fft[Math.min(fi, fft.length - 1)] / 255;
        // FFT scaled by envelope — edges stay short even with loud audio
        targets[i] = raw * (0.22 + triangle * 0.78);
      } else {
        // Idle: slow irregular drift shaped by the triangle
        const p1 = (i * 1.618) % (Math.PI * 2);
        const p2 = (i * 2.414) % (Math.PI * 2);
        const drift =
          0.032 * Math.sin(t * 0.28 + p1) +
          0.018 * Math.sin(t * 0.17 + p2);
        targets[i] = Math.max(0.02, triangle * 0.72 + drift);
      }
    }

    // Smooth — attack faster than decay
    const heights = barHeightsRef.current;
    for (let i = 0; i < N_BARS; i++) {
      const alpha = targets[i] > heights[i] ? 0.20 : 0.10;
      heights[i] = heights[i] * (1 - alpha) + targets[i] * alpha;
    }

    drawBars(ctx, W, H, heights, sb, se);

    // Sound circle — left area
    ctx.globalCompositeOperation = "lighter";
    const { mid: sm } = smoothRef.current;
    drawCircle(ctx, W * 0.13, H * 0.42, t, sb, sm, se, fft, audioRef.current);

    // Vignette
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    const vig = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.75);
    vig.addColorStop(0.3, "transparent");
    vig.addColorStop(1,   "rgba(0,0,0,0.78)");
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);
  };

  const handleClick = async () => {
    if (audioRef.current) {
      engineRef.current?.stop();
      audioRef.current = false;
      setAudioActive(false);
    } else {
      if (!engineRef.current) {
        const e = new AudioEngine();
        await e.init();
        engineRef.current = e;
      }
      engineRef.current.start();
      audioRef.current = true;
      setAudioActive(true);
    }
  };

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%", cursor: "pointer" }}
      onClick={handleClick}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />

      {!audioActive && (
        <div style={{
          position: "absolute",
          left: "52px",
          bottom: "138px",
          display: "flex", flexDirection: "column", gap: "10px", pointerEvents: "none",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0,
              background: "#e8001e", animation: "volpulse 2s ease-in-out infinite",
            }} />
            <span style={{
              fontFamily: "var(--font-dm),sans-serif", fontSize: "13px", fontWeight: 300,
              letterSpacing: "3px", color: "rgba(255,255,255,0.72)", textTransform: "uppercase",
            }}>Tap to listen</span>
          </div>
          <span style={{
            fontFamily: "var(--font-dm),sans-serif", fontSize: "10px", fontWeight: 300,
            letterSpacing: "1.5px", color: "rgba(255,255,255,0.28)", lineHeight: 1.6,
            maxWidth: "180px",
          }}>
            Activate spatial audio.<br />Feel the V1 PRO signature.
          </span>
        </div>
      )}

      <style>{`@keyframes volpulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.2;transform:scale(.6);}}`}</style>
    </div>
  );
}

function drawBars(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  heights: Float32Array,
  sb: number,
  se: number,
) {
  const N      = heights.length;
  const startX = W * 0.03;
  const totalW = W * 0.94;
  const slotW  = totalW / N;
  const barW   = Math.max(2, slotW * 0.65);
  const baseY  = H - 96;
  const maxH   = H * 0.32;

  ctx.globalCompositeOperation = "source-over";

  for (let i = 0; i < N; i++) {
    const h = Math.max(3, heights[i] * maxH * (1 + sb * 0.3));
    const x = startX + i * slotW + (slotW - barW) / 2;
    const y = baseY - h;

    // Glass body — dark red translucent fill
    const fill = ctx.createLinearGradient(x, baseY, x, y);
    fill.addColorStop(0,   `rgba(80,0,8,${0.55 + se * 0.1})`);
    fill.addColorStop(0.5, `rgba(140,0,16,${0.45 + se * 0.08})`);
    fill.addColorStop(1,   `rgba(180,10,22,${0.35 + se * 0.06})`);
    ctx.globalAlpha = 1;
    ctx.fillStyle = fill;
    ctx.fillRect(x, y, barW, h);

    // Left edge highlight — thin glass refraction
    ctx.globalAlpha = 0.18 + heights[i] * 0.12;
    const edge = ctx.createLinearGradient(x, baseY, x, y);
    edge.addColorStop(0,   "rgba(200,30,40,0.0)");
    edge.addColorStop(0.6, "rgba(220,40,55,0.4)");
    edge.addColorStop(1,   "rgba(232,60,70,0.55)");
    ctx.fillStyle = edge;
    ctx.fillRect(x, y, 1.2, h);

    // Top cap — thin dark crimson line
    ctx.globalAlpha = 0.35 + heights[i] * 0.25 + se * 0.08;
    ctx.fillStyle = `rgba(220,30,45,0.7)`;
    ctx.fillRect(x, y, barW, 1.5);

    // Top inner glow — very subtle
    if (h > 10) {
      const capG = ctx.createLinearGradient(x, y, x, y + 8);
      capG.addColorStop(0, `rgba(200,20,30,${0.12 + se * 0.05})`);
      capG.addColorStop(1, "rgba(140,0,15,0)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = capG;
      ctx.fillRect(x, y, barW, 8);
    }
  }

  ctx.globalAlpha = 1;
}

function drawCircle(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  t: number,
  sb: number, sm: number, se: number,
  fft: Uint8Array<ArrayBuffer> | undefined,
  audioActive: boolean,
) {
  const baseR = 52;
  const STEPS = 80; // points along the waveform line
  ctx.globalCompositeOperation = "source-over";

  // ── Grey outer ring ──────────────────────────────────────────────
  ctx.globalAlpha = 0.35;
  ctx.strokeStyle = "rgb(90,94,104)";
  ctx.lineWidth   = 1.2;
  ctx.beginPath(); ctx.arc(cx, cy, baseR, 0, TWO_PI); ctx.stroke();

  // ── Dark inner fill ──────────────────────────────────────────────
  ctx.globalAlpha = 1;
  ctx.fillStyle   = "rgba(4,0,8,0.96)";
  ctx.beginPath(); ctx.arc(cx, cy, baseR - 1, 0, TWO_PI); ctx.fill();

  // ── Neon waveform line clipped inside circle ─────────────────────
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, baseR - 2, 0, TWO_PI); ctx.clip();

  // Build wave points
  const pts: [number, number][] = [];
  const amp = audioActive
    ? 10 + sb * 28 + sm * 12
    : 5 + 4 * Math.sin(t * 1.4);

  for (let i = 0; i <= STEPS; i++) {
    const norm = i / STEPS;                        // 0 → 1
    const x    = cx - baseR + norm * baseR * 2;

    let y: number;
    if (fft && audioActive) {
      const fi = Math.floor(norm * fft.length * 0.65);
      const raw = (fft[fi] / 255) * 2 - 1;         // -1 → +1
      y = cy + raw * amp;
    } else {
      y = cy
        + Math.sin(norm * Math.PI * 5 + t * 3.2) * amp
        + Math.sin(norm * Math.PI * 3 - t * 1.8) * amp * 0.4;
    }
    pts.push([x, y]);
  }

  // Pass 1 — wide neon red glow
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha  = 0.35 + se * 0.2;
  ctx.strokeStyle  = "#e8001e";
  ctx.lineWidth    = 6 + sb * 8;
  ctx.beginPath();
  pts.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
  ctx.stroke();

  // Pass 2 — mid red
  ctx.globalAlpha  = 0.65 + se * 0.2;
  ctx.lineWidth    = 2;
  ctx.beginPath();
  pts.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
  ctx.stroke();

  // Pass 3 — white core
  ctx.globalAlpha  = 0.92;
  ctx.strokeStyle  = "rgba(255,220,220,0.95)";
  ctx.lineWidth    = 0.8;
  ctx.beginPath();
  pts.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
  ctx.stroke();

  ctx.restore();

  // ── Text above / below line ──────────────────────────────────────
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha  = 0.82;
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle    = "rgba(255,255,255,0.88)";
  ctx.font         = `bold 15px var(--font-bebas,'Bebas Neue',sans-serif)`;
  ctx.fillText("VØLTA", cx, cy - 18);
  ctx.fillStyle    = "rgba(140,148,162,0.7)";
  ctx.font         = `300 6.5px var(--font-dm,'DM Sans',sans-serif)`;
  ctx.fillText("V1 PRO SERIES", cx, cy + 20);

  ctx.globalCompositeOperation = "lighter";
}
