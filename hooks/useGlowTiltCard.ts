"use client";

import type { MouseEvent } from "react";
import { useCallback, useRef, useState } from "react";

export type GlowTiltVariant = "default" | "subtle";

export function useGlowTiltCard(variant: GlowTiltVariant = "default") {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const rxMul = variant === "subtle" ? -4.5 : -9;
  const ryMul = variant === "subtle" ? 5 : 10;
  const perspective = variant === "subtle" ? 1100 : 900;

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      setTilt({ rx: py * rxMul, ry: px * ryMul });
      setGlow({
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      });
    },
    [rxMul, ryMul],
  );

  const onMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
    setGlow({ x: 50, y: 50 });
  }, []);

  const glowMix = variant === "subtle" ? "32%" : "45%";
  const radialOpacityClass =
    variant === "subtle"
      ? "opacity-[0.22] group-hover:opacity-[0.36]"
      : "opacity-[0.32] group-hover:opacity-[0.48]";
  const veilClass =
    variant === "subtle"
      ? "absolute inset-0 bg-background/0 transition-colors duration-150 group-hover:bg-zinc-200/40 dark:group-hover:bg-black/22"
      : "absolute inset-0 bg-background/0 transition-colors duration-150 group-hover:bg-zinc-100/55 dark:group-hover:bg-black/30";

  const transform = `perspective(${perspective}px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`;

  return {
    cardRef,
    transform,
    glow,
    glowMix,
    radialOpacityClass,
    veilClass,
    onMouseMove,
    onMouseLeave,
  };
}
