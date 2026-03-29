"use client";

import { motion } from "framer-motion";
import { Moon, Sparkles, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

export function ThemeOrbit() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="border-border/60 bg-surface-elevated/50 hover:border-glow-primary/45 group relative h-10 w-[4.5rem] shrink-0 overflow-hidden rounded-full border shadow-[0_0_0_1px_var(--glow-muted),inset_0_1px_0_oklch(1_0_0/8%)] backdrop-blur-sm transition-shadow hover:shadow-[0_0_20px_var(--glow-muted)]"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="pointer-events-none absolute inset-0 opacity-40 transition-opacity group-hover:opacity-70">
        <span className="from-glow-primary/30 via-glow-secondary/20 to-glow-accent/30 absolute inset-0 bg-gradient-to-r" />
      </span>
      {/* Track: sun = light (left), moon = dark (right) — opposite of the active theme on each end */}
      <Sun
        className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 text-amber-500/55 dark:text-amber-400/35"
        aria-hidden
      />
      <Moon
        className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 text-violet-400/50 dark:text-violet-300/35"
        aria-hidden
      />
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="from-glow-primary to-glow-secondary absolute top-1 left-1 flex size-8 items-center justify-center rounded-full bg-gradient-to-br shadow-[0_0_14px_var(--glow-primary),0_0_28px_var(--glow-muted)]"
        animate={{ x: isDark ? 26 : 0 }}
      >
        {mounted ? (
          isDark ? (
            <Moon className="text-background size-4" aria-hidden />
          ) : (
            <Sun className="text-background size-4" aria-hidden />
          )
        ) : (
          <Sparkles className="text-background size-4" aria-hidden />
        )}
      </motion.span>
    </button>
  );
}
