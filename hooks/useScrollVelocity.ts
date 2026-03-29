"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Smoothed vertical scroll speed in px/ms. Typical quick flicks are ~1–3;
 * idle drifts toward 0 via decay.
 */
export function useScrollVelocity(): number {
  const lastY = useRef(0);
  const lastT = useRef(0);
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    lastT.current = performance.now();

    let raf = 0;
    const decay = () => {
      setVelocity((v) => (v < 0.002 ? 0 : v * 0.92));
      raf = requestAnimationFrame(decay);
    };
    raf = requestAnimationFrame(decay);

    let scheduled = false;
    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        const now = performance.now();
        const y = window.scrollY;
        const dt = Math.max(5, now - lastT.current);
        const instant = Math.abs(y - lastY.current) / dt;
        lastY.current = y;
        lastT.current = now;
        setVelocity((v) => v * 0.82 + instant * 0.18);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return velocity;
}
