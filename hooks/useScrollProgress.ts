"use client";

import { useEffect, useState } from "react";

/**
 * Document scroll progress in [0, 1]. Standard pattern: `scrollY / (scrollHeight - innerHeight)`.
 * Snaps to 1 near the bottom so the bar always completes (sub-pixel / browser quirks).
 */
export function useScrollProgress(): number {
  const [p, setP] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const y = window.scrollY;

      if (scrollable <= 0) {
        setP(1);
        return;
      }

      const remaining = scrollable - y;
      const raw = y / scrollable;
      // Treat as complete when within ~2px of end (rounding / rubber-band safe)
      const next = remaining <= 2 ? 1 : Math.min(1, Math.max(0, raw));
      setP(next);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return p;
}
