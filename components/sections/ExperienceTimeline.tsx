"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Fragment, useCallback, useEffect, useId, useRef, useState } from "react";

import { GlowTiltCard } from "@/components/cards/GlowTiltCard";
import type { Experience } from "@/types/portfolio";
import { cn } from "@/lib/utils";

/** Comet rail width in px — SVG line + ball share this center */
const RAIL_PX = 32;
const RAIL_CENTER = RAIL_PX / 2;

type Props = {
  items: Experience[];
};

/** Renders `**bold**` segments as <strong>. */
function formatInlineBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          key={i}
          className="font-semibold text-foreground group-hover:text-zinc-950 dark:group-hover:text-white"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function getHighlightSplit(item: Experience): { primary: string[]; rest: string[] } {
  const h = item.highlights ?? [];
  if (h.length === 0) return { primary: [], rest: [] };

  const configured = item.highlightsPreviewCount;
  if (configured !== undefined) {
    const n = Math.min(Math.max(0, configured), h.length);
    return { primary: h.slice(0, n), rest: h.slice(n) };
  }
  if (h.length > 6) {
    return { primary: h.slice(0, 5), rest: h.slice(5) };
  }
  return { primary: h, rest: [] };
}

/** Smoothing for comet ball — higher = snappier (0–1) */
const BALL_LERP = 0.22;

export function ExperienceTimeline({ items }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const tailId = useId().replace(/:/g, "");
  /** Pixel position of ball center from top of timeline rail (single source for SVG + ball) */
  const [ballYpx, setBallYpx] = useState(0);
  const targetBallYRef = useRef(0);
  const displayBallYRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sectionH, setSectionH] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);
  /** Extra highlight chunk for the currently expanded card only */
  const [extraHighlightsOpen, setExtraHighlightsOpen] = useState(false);

  const measure = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    setSectionH(el.offsetHeight);
  }, []);

  const smoothTick = useCallback(() => {
    const step = () => {
      const target = targetBallYRef.current;
      const prev = displayBallYRef.current;
      const next = prev + (target - prev) * BALL_LERP;
      const settled = Math.abs(target - next) < 0.35;
      const y = settled ? target : next;
      displayBallYRef.current = y;
      setBallYpx(y);

      if (!settled) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
      }
    };
    step();
  }, []);

  const updateFromScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el || items.length === 0) return;

    const rect = el.getBoundingClientRect();
    const h = el.offsetHeight;
    const viewAnchor = window.innerHeight * 0.42;
    const raw = (viewAnchor - rect.top) / rect.height;
    const t = Math.min(1, Math.max(0, raw));
    const targetY = t * h;
    targetBallYRef.current = targetY;

    const idx = Math.min(
      items.length - 1,
      Math.max(0, Math.floor(t * items.length + 1e-6)),
    );
    setActiveIndex(idx);
    setSectionH(h);

    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(smoothTick);
    }
  }, [items.length, smoothTick]);

  useEffect(() => {
    const el = sectionRef.current;
    if (el && items.length > 0) {
      const h0 = el.offsetHeight;
      const rect = el.getBoundingClientRect();
      const viewAnchor = window.innerHeight * 0.42;
      const raw = (viewAnchor - rect.top) / Math.max(h0, 1);
      const t = Math.min(1, Math.max(0, raw));
      const y0 = t * h0;
      targetBallYRef.current = y0;
      displayBallYRef.current = y0;
      setBallYpx(y0);
      setSectionH(h0);
    }
    measure();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll, { passive: true });
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            measure();
            updateFromScroll();
          })
        : null;
    if (sectionRef.current && ro) ro.observe(sectionRef.current);
    return () => {
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
      ro?.disconnect();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [updateFromScroll, measure, items.length]);

  const h = Math.max(sectionH, 1);
  /** Tail only extends upward from the ball; never below y = ball (follows, never leads) */
  const ballY = ballYpx;
  const tailLen = Math.min(ballY * 0.45, h * 0.4);
  const tailY2 = Math.max(0, ballY - tailLen);
  const gradId = `comet-tail-${tailId}`;
  const accent = items[activeIndex]?.accentColor ?? "#A855F7";

  const toggleOpen = (id: string) => {
    setExtraHighlightsOpen(false);
    setOpenId((current) => (current === id ? null : id));
  };

  if (items.length === 0) {
    return (
      <p className="text-muted-foreground">
        Add roles in <code className="text-foreground">constants/personal.ts</code>.
      </p>
    );
  }

  return (
    <section ref={sectionRef} className="relative">
      <div
        className="pointer-events-none absolute top-0 bottom-0 z-0 flex justify-center"
        style={{ width: RAIL_PX, left: 10 }}
        aria-hidden
      >
        {sectionH > 40 ? (
          <svg
            width={RAIL_PX}
            height={h}
            viewBox={`0 0 ${RAIL_PX} ${h}`}
            className="block"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id={gradId}
                gradientUnits="userSpaceOnUse"
                x1={RAIL_CENTER}
                y1={ballY}
                x2={RAIL_CENTER}
                y2={tailY2}
              >
                <stop offset="0%" stopColor={accent} stopOpacity="0.95" />
                <stop offset="28%" stopColor={accent} stopOpacity="0.55" />
                <stop offset="100%" stopColor={accent} stopOpacity="0" />
              </linearGradient>
            </defs>
            {tailLen > 4 ? (
              <line
                x1={RAIL_CENTER}
                y1={ballY}
                x2={RAIL_CENTER}
                y2={tailY2}
                stroke={`url(#${gradId})`}
                strokeWidth="5"
                strokeLinecap="round"
              />
            ) : null}
          </svg>
        ) : null}

        <div
          className="absolute size-5 rounded-full border-2 border-white/90 md:size-6"
          style={{
            top: ballYpx,
            left: "50%",
            transform: "translate(-50%, -50%)",
            willChange: "transform",
            background: `radial-gradient(circle at 30% 28%, rgba(255,255,255,0.98), ${accent} 38%, oklch(0.22 0.04 280) 95%)`,
            borderColor: `color-mix(in srgb, ${accent} 70%, white)`,
            boxShadow: `0 0 0 3px color-mix(in srgb, ${accent} 32%, transparent), 0 0 22px color-mix(in srgb, ${accent} 85%, transparent), 0 0 46px color-mix(in srgb, ${accent} 45%, transparent)`,
            transition: "box-shadow 0.38s ease, background 0.38s ease, border-color 0.38s ease",
          }}
        />
      </div>

      {items.length > 0 ? (
        <div
          className="pointer-events-none absolute z-[2] hidden min-w-[9rem] max-w-[13rem] md:block"
          style={{
            left: 10 + RAIL_PX + 6,
            top: ballYpx,
            transform: "translateY(-50%)",
          }}
        >
          <p className="rounded-lg border border-zinc-300/80 bg-white/95 px-2.5 py-2 text-foreground/95 shadow-md backdrop-blur-sm dark:border-border/50 dark:bg-black/75 dark:shadow-sm">
            <span className="block text-center text-lg font-bold leading-tight tracking-tight text-zinc-950 tabular-nums [text-shadow:none] dark:text-foreground/95 dark:[text-shadow:0_0_12px_var(--glow-muted)] md:text-xl">
              {items[activeIndex]?.tenureLabel}
            </span>
            <span className="mt-1 block text-center text-[10px] font-medium leading-tight text-zinc-600 dark:text-muted-foreground">
              {items[activeIndex]?.companyShort}
            </span>
          </p>
        </div>
      ) : null}

      <ol className="relative z-[1] ml-[46px] min-w-0 space-y-10 sm:ml-[50px] md:ml-[188px] md:space-y-12">
        {items.map((item, i) => {
          const open = openId === item.id;
          const hasMore = Boolean(item.details || (item.highlights && item.highlights.length > 0));
          const isActive = i === activeIndex;
          const { primary: hiPrimary, rest: hiRest } = getHighlightSplit(item);
          const showRestToggle = hiRest.length > 0;
          const restVisible = open && showRestToggle && extraHighlightsOpen;

          return (
            <li
              key={item.id}
              className={cn(
                "flex flex-col gap-3 sm:flex-row sm:gap-5",
                isActive && "[&_.timeline-card]:shadow-[0_0_28px_var(--glow-muted)]",
              )}
            >
              <div className="flex shrink-0 justify-start sm:w-[4.5rem] sm:justify-end sm:pt-1 md:w-[5.25rem]">
                <span
                  className={cn(
                    "font-mono text-[0.65rem] tracking-wide md:text-xs",
                    isActive && !item.accentColor
                      ? "text-glow-secondary font-semibold [text-shadow:0_0_12px_var(--glow-secondary)]"
                      : !isActive && "text-muted-foreground",
                    isActive && item.accentColor && "font-semibold",
                  )}
                  style={
                    isActive && item.accentColor
                      ? {
                          color: item.accentColor,
                          textShadow: `0 0 14px color-mix(in srgb, ${item.accentColor} 55%, transparent)`,
                        }
                      : undefined
                  }
                >
                  {item.timelineLabel}
                </span>
              </div>

              <GlowTiltCard
                variant="subtle"
                role={hasMore ? "button" : "article"}
                aria-expanded={hasMore ? open : undefined}
                className={cn(
                  "timeline-card min-w-0 flex-1 p-0 text-left transition-shadow duration-150",
                  hasMore ? "cursor-pointer" : "cursor-default",
                  isActive && "ring-1 ring-glow-muted/40",
                  item.cardVariant === "nlp" &&
                    "border-fuchsia-500/40 ring-1 ring-fuchsia-500/35 shadow-[0_0_26px_rgba(192,38,211,0.18)]",
                )}
                onClick={() => {
                  if (!hasMore) return;
                  toggleOpen(item.id);
                }}
                onKeyDown={(e) => {
                  if (!hasMore) return;
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleOpen(item.id);
                  }
                }}
                tabIndex={hasMore ? 0 : undefined}
              >
                <div
                  className={cn(
                    "relative z-10 rounded-2xl p-5 transition-colors duration-200 md:p-6",
                    "group-hover:bg-white/95 group-hover:shadow-md group-hover:ring-1 group-hover:ring-border/50",
                    "dark:group-hover:bg-black/58 dark:group-hover:shadow-none dark:group-hover:ring-0",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p
                        className={cn(
                          "text-xs font-medium tracking-wide uppercase",
                          "text-violet-700 [text-shadow:none] dark:text-glow-secondary dark:[text-shadow:0_0_8px_var(--glow-secondary)]",
                          "group-hover:text-violet-900 dark:group-hover:text-cyan-200/90",
                        )}
                      >
                        {item.period}
                      </p>
                      <h3
                        className={cn(
                          "mt-2 text-lg font-semibold tracking-tight text-foreground md:text-xl",
                          "group-hover:text-zinc-950 dark:group-hover:text-white",
                          "[text-shadow:0_1px_2px_oklch(0_0_0/12%)] dark:[text-shadow:0_1px_2px_oklch(0_0_0/35%)]",
                          "group-hover:[text-shadow:0_1px_0_oklch(1_0_0/40%)] dark:group-hover:[text-shadow:0_2px_6px_oklch(0_0_0/45%)]",
                        )}
                      >
                        {item.role}
                      </h3>
                      <p className="text-muted-foreground mt-1 text-sm font-medium group-hover:text-zinc-800 dark:group-hover:text-zinc-200/95">
                        {item.company}
                      </p>
                      {item.clientSubtitle ? (
                        <p
                          className={cn(
                            "mt-1.5 text-xs font-medium tracking-wide",
                            "text-violet-800 dark:text-glow-secondary/90",
                            "[text-shadow:none] dark:[text-shadow:0_0_8px_var(--glow-secondary)]",
                          )}
                        >
                          {item.clientSubtitle}
                        </p>
                      ) : null}
                    </div>
                    {hasMore ? (
                      <motion.span
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 380, damping: 26 }}
                        className="text-muted-foreground mt-1 shrink-0 rounded-md border border-border/50 p-1 group-hover:border-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200"
                        aria-hidden
                      >
                        <ChevronDown className="size-4" />
                      </motion.span>
                    ) : null}
                  </div>
                  <p
                    className={cn(
                      "mt-4 text-sm leading-relaxed text-muted-foreground group-hover:text-zinc-800",
                      "dark:group-hover:text-zinc-200/95",
                      "[text-shadow:none] dark:[text-shadow:0_1px_2px_oklch(0_0_0/30%)]",
                    )}
                  >
                    {formatInlineBold(item.summary)}
                  </p>

                  <AnimatePresence initial={false}>
                    {open && hasMore ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <div className="border-border/40 mt-5 space-y-4 border-t pt-5">
                          {item.details ? (
                            <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-zinc-800 dark:group-hover:text-zinc-300/95">
                              {formatInlineBold(item.details)}
                            </p>
                          ) : null}
                          {hiPrimary.length > 0 ? (
                            <ul className="space-y-2 text-sm">
                              {hiPrimary.map((h, hi) => (
                                <motion.li
                                  key={`p-${hi}`}
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    delay: hi * 0.02,
                                    duration: 0.2,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                  }}
                                  className="flex gap-2 text-foreground/95 group-hover:text-zinc-950 [text-shadow:none] dark:text-foreground/90 dark:[text-shadow:0_1px_2px_oklch(0_0_0/30%)] dark:group-hover:text-white/95"
                                >
                                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-violet-600 shadow-none dark:bg-glow-primary dark:shadow-[0_0_8px_var(--glow-primary)]" />
                                  <span>{formatInlineBold(h)}</span>
                                </motion.li>
                              ))}
                            </ul>
                          ) : null}

                          <AnimatePresence initial={false}>
                            {showRestToggle && restVisible ? (
                              <motion.ul
                                key="rest"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="space-y-2 overflow-hidden text-sm"
                              >
                                {hiRest.map((h, hi) => (
                                  <motion.li
                                    key={`r-${hi}`}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                      delay: hi * 0.02,
                                      duration: 0.2,
                                      ease: [0.25, 0.46, 0.45, 0.94],
                                    }}
                                    className="flex gap-2 text-foreground/95 group-hover:text-zinc-950 [text-shadow:none] dark:text-foreground/90 dark:[text-shadow:0_1px_2px_oklch(0_0_0/30%)] dark:group-hover:text-white/95"
                                  >
                                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-violet-600 shadow-none dark:bg-glow-primary dark:shadow-[0_0_8px_var(--glow-primary)]" />
                                    <span>{formatInlineBold(h)}</span>
                                  </motion.li>
                                ))}
                              </motion.ul>
                            ) : null}
                          </AnimatePresence>

                          {showRestToggle ? (
                            <button
                              type="button"
                              className="text-xs font-semibold tracking-wide uppercase text-violet-800 hover:text-violet-950 [text-shadow:none] dark:text-glow-secondary dark:[text-shadow:0_0_8px_var(--glow-secondary)] dark:hover:text-cyan-200"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExtraHighlightsOpen((v) => !v);
                              }}
                            >
                              {restVisible ? "Show less" : `Show more (${hiRest.length})`}
                            </button>
                          ) : null}

                          {item.stackBadges && item.stackBadges.length > 0 ? (
                            <ul className="flex flex-wrap gap-1.5 pt-2">
                              {item.stackBadges.map((b) => (
                                <li
                                  key={b}
                                  className="rounded-md border border-zinc-300/90 bg-zinc-200/90 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-zinc-800 uppercase backdrop-blur-sm dark:border-border/50 dark:bg-background/55 dark:text-muted-foreground"
                                >
                                  {b}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  {hasMore ? (
                    <p className="mt-4 text-xs text-zinc-600 group-hover:text-zinc-800 dark:text-muted-foreground/70 dark:group-hover:text-muted-foreground/80">
                      {open ? "Click to collapse" : "Click to expand impact & details"}
                    </p>
                  ) : null}
                </div>
              </GlowTiltCard>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
