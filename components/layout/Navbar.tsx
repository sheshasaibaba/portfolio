"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ThemeOrbit } from "@/components/layout/ThemeOrbit";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { SECTION_NAV, SECTION_NAV_IDS } from "@/lib/nav-sections";
import { cn } from "@/lib/utils";

export function Navbar() {
  const progress = useScrollProgress();
  const active = useActiveSection(SECTION_NAV_IDS);
  const [mobileOpen, setMobileOpen] = useState(false);

  const widthPct = progress >= 0.999 ? 100 : progress * 100;

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header className="border-border/50 bg-background/80 supports-[backdrop-filter]:bg-background/65 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-x-2 gap-y-3 px-3 py-3 sm:px-4 md:grid-cols-[1fr_auto_1fr] md:gap-x-6 md:px-6">
        <div className="flex justify-start">
          <button
            type="button"
            className="border-border/55 bg-background/85 text-foreground hover:bg-muted/40 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="nav-mobile"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
            {mobileOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>

        <div className="flex min-w-0 justify-center">
          <nav
            className="hidden flex-wrap items-center justify-center gap-x-0.5 gap-y-1 text-sm md:flex md:gap-x-1"
            aria-label="Primary"
          >
            {SECTION_NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-2.5 py-2 transition-colors duration-150 md:px-3.5",
                    isActive
                      ? "text-glow-primary font-medium [text-shadow:0_0_14px_var(--glow-primary)]"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex justify-end">
          <ThemeOrbit />
        </div>

        {mobileOpen ? (
          <nav
            id="nav-mobile"
            className="border-border/40 col-span-3 flex flex-col gap-0.5 border-t pt-3 pb-1 md:hidden"
            aria-label="Primary"
          >
            {SECTION_NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "min-h-11 rounded-lg px-3 py-2.5 text-base transition-colors duration-150",
                    isActive
                      ? "text-glow-primary bg-muted/35 font-medium [text-shadow:0_0_14px_var(--glow-primary)]"
                      : "text-muted-foreground active:bg-muted/25 hover:text-foreground",
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        ) : null}

        <div className="col-span-3 w-full min-w-0">
          <div
            className="bg-nav-progress-track relative h-[2px] w-full shrink-0 overflow-hidden rounded-full"
            role="progressbar"
            aria-valuenow={Math.round(widthPct)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Page scroll progress"
          >
            <motion.div
              className="from-glow-primary via-glow-secondary to-glow-accent absolute inset-y-0 left-0 rounded-full bg-gradient-to-r shadow-[0_0_6px_var(--glow-primary),0_0_3px_var(--glow-secondary)]"
              initial={false}
              style={{ willChange: "width" }}
              animate={{ width: `${widthPct}%` }}
              transition={{ duration: 0.08, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
