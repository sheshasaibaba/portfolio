"use client";

import { motion } from "framer-motion";

import type { TechStackCategoryData, TechStackItemData } from "@/types/portfolio";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";
import { TechStackBrandIcon, hasTechStackBrandIcon } from "@/lib/tech-stack-icons";
import { cn } from "@/lib/utils";

const CATEGORY_STYLE: Record<
  string,
  {
    stripe: string;
    chip: string;
    iconGlow: string;
  }
> = {
  frontend: {
    stripe: "from-cyan-500/50 via-fuchsia-600/35 to-violet-600/40",
    chip:
      "border-cyan-500/20 bg-cyan-500/[0.06] shadow-none hover:border-cyan-400/35 hover:bg-cyan-500/[0.1]",
    iconGlow: "[filter:drop-shadow(0_0_3px_oklch(0.7_0.08_200/0.45))]",
  },
  backend: {
    stripe: "from-amber-500/45 via-orange-600/30 to-rose-600/35",
    chip:
      "border-amber-500/20 bg-amber-500/[0.06] shadow-none hover:border-amber-400/35 hover:bg-amber-500/[0.1]",
    iconGlow: "[filter:drop-shadow(0_0_3px_oklch(0.72_0.08_65/0.45))]",
  },
  data: {
    stripe: "from-emerald-500/45 via-teal-600/30 to-sky-600/35",
    chip:
      "border-emerald-500/20 bg-emerald-500/[0.06] shadow-none hover:border-emerald-400/35 hover:bg-emerald-500/[0.1]",
    iconGlow: "[filter:drop-shadow(0_0_3px_oklch(0.7_0.08_165/0.45))]",
  },
  "database-ai": {
    stripe: "from-violet-500/40 via-fuchsia-600/28 to-cyan-600/32",
    chip:
      "border-violet-500/20 bg-violet-500/[0.06] shadow-none hover:border-violet-400/35 hover:bg-violet-500/[0.1]",
    iconGlow: "[filter:drop-shadow(0_0_3px_oklch(0.65_0.1_290/0.45))]",
  },
  "tools-cloud": {
    stripe: "from-sky-500/40 via-blue-600/28 to-slate-500/35",
    chip:
      "border-sky-500/20 bg-sky-500/[0.06] shadow-none hover:border-sky-400/35 hover:bg-sky-500/[0.1]",
    iconGlow: "[filter:drop-shadow(0_0_3px_oklch(0.68_0.08_240/0.45))]",
  },
  languages: {
    stripe: "from-violet-500/45 via-indigo-600/30 to-blue-600/35",
    chip:
      "border-violet-500/20 bg-violet-500/[0.06] shadow-none hover:border-violet-400/35 hover:bg-violet-500/[0.1]",
    iconGlow: "[filter:drop-shadow(0_0_3px_oklch(0.68_0.1_280/0.45))]",
  },
  "backend-security": {
    stripe: "from-amber-500/45 via-orange-600/30 to-rose-600/35",
    chip:
      "border-amber-500/20 bg-amber-500/[0.06] shadow-none hover:border-amber-400/35 hover:bg-amber-500/[0.1]",
    iconGlow: "[filter:drop-shadow(0_0_3px_oklch(0.72_0.08_65/0.45))]",
  },
  "ai-data": {
    stripe: "from-fuchsia-500/40 via-violet-600/28 to-cyan-600/32",
    chip:
      "border-fuchsia-500/20 bg-fuchsia-500/[0.06] shadow-none hover:border-fuchsia-400/35 hover:bg-fuchsia-500/[0.1]",
    iconGlow: "[filter:drop-shadow(0_0_3px_oklch(0.65_0.12_300/0.45))]",
  },
  "cloud-devops": {
    stripe: "from-sky-500/40 via-blue-600/28 to-slate-500/35",
    chip:
      "border-sky-500/20 bg-sky-500/[0.06] shadow-none hover:border-sky-400/35 hover:bg-sky-500/[0.1]",
    iconGlow: "[filter:drop-shadow(0_0_3px_oklch(0.68_0.08_240/0.45))]",
  },
};

const DEFAULT_STYLE = CATEGORY_STYLE.frontend!;

function StackChip({
  item,
  index,
  categoryId,
  scrollPace,
}: {
  item: TechStackItemData;
  index: number;
  categoryId: string;
  /** >1 = faster motion when scroll is fast */
  scrollPace: number;
}) {
  const s = CATEGORY_STYLE[categoryId] ?? DEFAULT_STYLE;
  const chipDuration = Math.max(0.075, 0.34 / scrollPace);
  const chipDelay = index * Math.max(0.006, 0.026 / scrollPace);
  const brandIcon = hasTechStackBrandIcon(item.name);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        delay: chipDelay,
        duration: chipDuration,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -1, transition: { type: "spring", stiffness: 480, damping: 30 } }}
      className={cn(
        "group flex items-center gap-2 rounded-lg border px-2 py-1.5 transition-[border-color,background-color,transform] duration-150",
        s.chip,
        "hover:shadow-[0_0_14px_var(--glow-muted)]",
      )}
    >
      {brandIcon ? (
        <div className={cn("shrink-0 rounded-md p-0.5 transition-transform duration-150", s.iconGlow)}>
          <TechStackBrandIcon name={item.name} />
        </div>
      ) : item.emoji ? (
        <span
          className="flex size-7 shrink-0 items-center justify-center text-lg leading-none select-none sm:text-xl"
          aria-hidden
        >
          {item.emoji}
        </span>
      ) : null}
      <span
        className={cn(
          "max-w-[8rem] text-left text-[11px] font-medium leading-tight text-foreground/88 sm:max-w-none sm:text-xs",
          "transition-[color,text-shadow] duration-150",
          "group-hover:text-violet-800 group-hover:[text-shadow:0_1px_0_oklch(1_0_0/50%)]",
          "dark:group-hover:text-glow-primary/95 dark:group-hover:[text-shadow:0_0_8px_var(--glow-primary)]",
        )}
      >
        {item.name}
      </span>
    </motion.div>
  );
}

export function TechStackWaterfall({ categories }: { categories: TechStackCategoryData[] }) {
  let idx = 0;
  const scrollVelocity = useScrollVelocity();
  const scrollPace = Math.min(4, Math.max(0.52, 0.52 + scrollVelocity * 1050));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 md:px-6 md:py-14">
      <motion.div
        className="mb-6 flex items-center gap-3 md:mb-8"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.45 }}
        transition={{
          duration: Math.max(0.12, 0.32 / scrollPace),
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <span className="text-glow-secondary/80 inline-flex" aria-hidden>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path
              d="M12 2L3 7v10l9 5 9-5V7l-9-5z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2 className="text-foreground/90 flex items-center gap-2 text-sm font-semibold tracking-[0.2em] md:text-base">
          <span aria-hidden>🛠️</span>
          MY STACK
        </h2>
      </motion.div>

      <div className="flex flex-col gap-6 md:gap-7">
        {categories.map((cat, catIndex) => {
          const s = CATEGORY_STYLE[cat.id] ?? DEFAULT_STYLE;
          return (
            <motion.div
              key={cat.id}
              className={cn(
                "flex gap-3.5 rounded-xl border px-3 py-3 shadow-sm backdrop-blur-md md:gap-4 md:px-4 md:py-3.5",
                "border-border/55 bg-zinc-100/92 dark:border-border/35 dark:bg-zinc-950/50",
              )}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{
                duration: Math.max(0.14, 0.3 / scrollPace),
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div
                className={cn(
                  "w-0.5 shrink-0 rounded-full bg-gradient-to-b md:w-1",
                  s.stripe,
                  "opacity-80",
                )}
                aria-hidden
              />
              <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
                <div className="shrink-0 sm:w-36 md:w-40">
                  {catIndex !== 2 && catIndex !== 3 ? (
                    <p className="text-muted-foreground font-mono text-[10px] tracking-[0.18em] uppercase">
                      {String(catIndex + 1).padStart(2, "0")}
                    </p>
                  ) : null}
                  <h3
                    className={cn(
                      "text-foreground/95 flex items-center gap-2 text-base font-semibold tracking-tight md:text-lg",
                      catIndex !== 2 && catIndex !== 3 ? "mt-1" : "mt-0",
                    )}
                  >
                    {cat.emoji ? (
                      <span className="text-xl leading-none select-none md:text-2xl" aria-hidden>
                        {cat.emoji}
                      </span>
                    ) : null}
                    {cat.label}
                  </h3>
                  {cat.blurb ? (
                    <p className="text-muted-foreground/90 mt-0.5 text-xs leading-snug">{cat.blurb}</p>
                  ) : null}
                </div>
                <div className="flex min-w-0 flex-1 flex-wrap gap-1.5 sm:gap-2">
                  {cat.items.map((item) => (
                    <StackChip
                      key={item.id}
                      item={item}
                      index={idx++}
                      categoryId={cat.id}
                      scrollPace={scrollPace}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
