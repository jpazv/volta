"use client";

import { useEffect, useRef } from "react";

const easeInOutQuart = (t: number): number =>
  t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;

export default function ScrollSnap({ children }: { children: React.ReactNode }) {
  const isAnimating = useRef(false);
  const currentIdx  = useRef(0);
  const rafRef      = useRef<number>(0);

  useEffect(() => {
    const getSections = (): HTMLElement[] =>
      Array.from(document.querySelectorAll("section"));

    const scrollToSection = (idx: number) => {
      const sections = getSections();
      if (idx < 0 || idx >= sections.length || isAnimating.current) return;

      isAnimating.current = true;
      const startY    = window.scrollY;
      const targetY   = sections[idx].offsetTop;
      const distance  = targetY - startY;
      const duration  = 1100;
      let startTime: number | null = null;

      const step = (now: number) => {
        if (!startTime) startTime = now;
        const elapsed  = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY + distance * easeInOutQuart(progress));
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          currentIdx.current  = idx;
          isAnimating.current = false;
        }
      };

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating.current) return;
      scrollToSection(currentIdx.current + (e.deltaY > 0 ? 1 : -1));
    };

    const onKey = (e: KeyboardEvent) => {
      if (isAnimating.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToSection(currentIdx.current + 1);
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToSection(currentIdx.current - 1);
      }
    };

    // Touch support
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchEnd   = (e: TouchEvent) => {
      if (isAnimating.current) return;
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 40) scrollToSection(currentIdx.current + (delta > 0 ? 1 : -1));
    };

    // Navbar scroll events
    const onNavScroll = (e: Event) => {
      const idx = (e as CustomEvent<{ idx: number }>).detail.idx;
      scrollToSection(idx);
    };

    window.addEventListener("wheel",        onWheel,      { passive: false });
    window.addEventListener("keydown",      onKey);
    window.addEventListener("touchstart",   onTouchStart, { passive: true });
    window.addEventListener("touchend",     onTouchEnd,   { passive: true });
    window.addEventListener("volta-scroll", onNavScroll);

    return () => {
      window.removeEventListener("wheel",        onWheel);
      window.removeEventListener("keydown",      onKey);
      window.removeEventListener("touchstart",   onTouchStart);
      window.removeEventListener("touchend",     onTouchEnd);
      window.removeEventListener("volta-scroll", onNavScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <>{children}</>;
}
