"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

import { siteProfile } from "@/constants/data";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ResumeDialog({ open, onOpenChange }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const href = siteProfile.resumeUrl ?? "/resume.pdf";

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px] dark:bg-black/75"
        aria-label="Close resume"
        onClick={() => onOpenChange(false)}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Resume"
        className={cn(
          "border-border/60 bg-background relative z-10 flex h-[86vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border shadow-2xl",
          "sm:h-[84vh] lg:h-[82vh]",
          "dark:bg-[oklch(0.16_0.02_260)]",
        )}
      >
        <div className="border-border/40 flex shrink-0 items-center justify-between gap-3 border-b px-5 py-4 md:px-6">
          <div className="min-w-0">
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Resume · PDF
            </p>
            <h2 className="text-foreground mt-1 truncate text-lg font-semibold tracking-tight md:text-xl">
              {siteProfile.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={cn(
              "text-muted-foreground hover:text-foreground hover:bg-muted/80",
              "rounded-lg border border-transparent p-2 transition-colors",
              "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-glow-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 bg-white dark:bg-zinc-950">
          <iframe
            title="Resume PDF"
            src={href}
            className="h-full w-full"
            // Helps some browsers render PDFs inside iframes more reliably.
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}

