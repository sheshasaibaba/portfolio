"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, IHsl, Particle } from "@tsparticles/engine";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

/** Spider legs: nearest nodes to pointer */
const NEAREST = 8;
/** Max link length in CSS pixels for opacity falloff */
const MAX_LINK_PX = 240;
/** Stroke in CSS pixels (scaled by DPR) — light mode uses thicker strokes */
const LINE_CSS_PX_DARK = 0.535;
const LINE_CSS_PX_LIGHT = 0.95;

function hslToCss(c: IHsl, alpha: number): string {
  const s = c.s <= 1 ? c.s * 100 : c.s;
  const l = c.l <= 1 ? c.l * 100 : c.l;
  return `hsla(${Math.round(c.h)}, ${Math.round(s)}%, ${Math.round(l)}%, ${alpha})`;
}

const noopSubscribe = () => () => {};

function pickNearest(
  px: number,
  py: number,
  container: Container,
  n: number,
): { particle: Particle; dist: number }[] {
  const list = container.particles.filter((p) => !p.destroyed && p.isVisible());
  const scored: { particle: Particle; dist: number }[] = [];
  for (const particle of list) {
    const dx = particle.position.x - px;
    const dy = particle.position.y - py;
    const dist = Math.hypot(dx, dy);
    scored.push({ particle, dist });
  }
  scored.sort((a, b) => a.dist - b.dist);
  return scored.slice(0, n);
}

const PARTICLE_COLORS_LIGHT = [
  "#0e7490",
  "#6d28d9",
  "#be185d",
  "#047857",
  "#c2410c",
  "#1d4ed8",
  "#7c2d12",
  "#5b21b6",
  "#0f766e",
  "#a21caf",
  "#0369a1",
  "#4d7c0f",
  "#b45309",
];

export function ParticleBackground({ className }: { className?: string }) {
  const [ready, setReady] = useState(false);
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const containerRef = useRef<Container | null>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const rafRef = useRef<number>(0);
  const isLightRef = useRef(false);

  const isLight = mounted && resolvedTheme === "light";

  useEffect(() => {
    isLightRef.current = isLight;
  }, [isLight]);

  useEffect(() => {
    let cancelled = false;
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const drawGrabLines = useCallback(() => {
    const container = containerRef.current;
    const canvas = overlayRef.current;
    const wrap = wrapperRef.current;
    if (!container || !canvas || !wrap) return;

    const rect = wrap.getBoundingClientRect();
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const w = Math.max(1, Math.floor(rect.width * dpr));
    const h = Math.max(1, Math.floor(rect.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);

    const { x: mcx, y: mcy, active } = mouseRef.current;
    if (!active) return;

    const lx = mcx - rect.left;
    const ly = mcy - rect.top;
    const mx = (lx / rect.width) * w;
    const my = (ly / rect.height) * h;

    const scale = w / rect.width;
    const maxDistCanvas = MAX_LINK_PX * scale;

    const nearest = pickNearest(lx, ly, container, NEAREST);
    const light = isLightRef.current;
    const linePx = light ? LINE_CSS_PX_LIGHT : LINE_CSS_PX_DARK;
    ctx.lineCap = "round";
    ctx.lineWidth = Math.max(1.15 / dpr, linePx * dpr);

    for (const { particle, dist } of nearest) {
      const fill = particle.getFillColor();
      if (!fill) continue;
      const cx = (particle.position.x / rect.width) * w;
      const cy = (particle.position.y / rect.height) * h;
      const distCanvas = dist * scale;
      const t = Math.min(1, distCanvas / maxDistCanvas);
      // Strong falloff: far nodes much dimmer (steep curve)
      const falloff = Math.pow(Math.max(0, 1 - t), 3.2);
      if (falloff <= 0.02) continue;

      const alphaBoost = light ? 1.42 : 1.12;
      const alpha = Math.min(1, falloff * 1.02 * alphaBoost);
      const col = hslToCss(fill, alpha);
      ctx.strokeStyle = col;
      ctx.shadowColor = col;
      ctx.shadowBlur = (light ? 6.5 : 4.25) * dpr * falloff;
      ctx.beginPath();
      ctx.moveTo(mx, my);
      ctx.lineTo(cx, cy);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
  }, []);

  useEffect(() => {
    if (!ready) return;

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseleave", onLeave);

    const loop = () => {
      drawGrabLines();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [ready, drawGrabLines]);

  const onParticlesLoaded = useCallback(async (c?: Container) => {
    if (!c) return;
    containerRef.current = c;
    await c.refresh();
  }, []);

  const particleOptions = useMemo(
    () => ({
      fullScreen: { enable: false, zIndex: 0 },
      detectRetina: true,
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: false },
          onClick: { enable: false },
          resize: { enable: true, delay: 0.25 },
        },
      },
      particles: {
        links: { enable: false },
        number: { value: isLight ? 155 : 175, density: { enable: true, width: 1100, height: 1100 } },
        color: {
          value: isLight
            ? PARTICLE_COLORS_LIGHT
            : [
                "#22d3ee",
                "#a855f7",
                "#f472b6",
                "#34d399",
                "#fbbf24",
                "#60a5fa",
                "#fb7185",
                "#c084fc",
                "#2dd4bf",
                "#f97316",
                "#e879f9",
                "#38bdf8",
                "#a3e635",
                "#fcd34d",
              ],
        },
        shape: { type: "circle" },
        opacity: isLight ? { value: { min: 0.78, max: 1 } } : { value: { min: 0.52, max: 1 } },
        size: isLight ? { value: { min: 1.35, max: 3.4 } } : { value: { min: 0.5, max: 2.2 } },
        move: {
          enable: true,
          speed: isLight ? { min: 1.65, max: 2.1 } : { min: 1.8, max: 2.25 },
          direction: "none" as const,
          random: true,
          straight: false,
          outModes: { default: "bounce" as const },
        },
      },
    }),
    [isLight],
  );

  if (!ready) {
    return (
      <div
        className={cn("bg-background pointer-events-none absolute inset-0", className)}
        aria-hidden
      />
    );
  }

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden will-change-transform",
        className,
      )}
      aria-hidden
    >
      <Particles
        key={isLight ? "pt-light" : "pt-dark"}
        id="portfolio-particles"
        className="absolute inset-0 size-full"
        particlesLoaded={onParticlesLoaded}
        options={particleOptions}
      />
      <canvas ref={overlayRef} className="absolute inset-0 size-full" aria-hidden />
    </div>
  );
}
