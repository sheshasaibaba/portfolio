"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import type { Project } from "@/types/portfolio";
import { cn } from "@/lib/utils";

type Props = {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 first:mt-0">
      <h3 className="text-glow-secondary text-xs font-semibold tracking-[0.2em] uppercase [text-shadow:0_0_10px_var(--glow-secondary)]">
        {title}
      </h3>
      <div className="text-muted-foreground mt-2 text-sm leading-relaxed">{children}</div>
    </section>
  );
}

export function ProjectNarrativeDialog({ project, open, onOpenChange }: Props) {
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

  if (!project || !open) return null;

  const n = project.narrative;
  if (!n) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] dark:bg-black/75"
        aria-label="Close dialog"
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-narrative-title"
        className={cn(
          "border-border/60 bg-background relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border shadow-2xl sm:rounded-2xl",
          "dark:bg-[oklch(0.16_0.02_260)]",
        )}
      >
        <div className="border-border/40 flex shrink-0 items-start justify-between gap-3 border-b px-5 py-4 md:px-6">
          <div className="min-w-0">
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Case study</p>
            <h2
              id="project-narrative-title"
              className="text-foreground mt-1 text-xl font-semibold tracking-tight md:text-2xl"
            >
              {project.title}
            </h2>
            {project.technicalHighlight ? (
              <p className="text-glow-secondary/95 mt-2 text-[11px] font-medium leading-snug tracking-wide uppercase">
                {project.technicalHighlight}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-lg p-2 transition-colors"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 md:px-6 md:py-6">
          {n.mission ? <Section title="Mission">{n.mission}</Section> : null}
          {n.problem ? <Section title="The problem">{n.problem}</Section> : null}
          {n.innovation ? <Section title="Innovation">{n.innovation}</Section> : null}
          {n.solution ? <Section title="The solution">{n.solution}</Section> : null}
          {n.technicalDeepDive && n.technicalDeepDive.length > 0 ? (
            <section className="mt-6">
              <h3 className="text-glow-secondary text-xs font-semibold tracking-[0.2em] uppercase [text-shadow:0_0_10px_var(--glow-secondary)]">
                Technical deep dive
              </h3>
              <ul className="text-muted-foreground mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed">
                {n.technicalDeepDive.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </section>
          ) : null}
          {n.impact ? <Section title="Impact">{n.impact}</Section> : null}

          <div className="border-border/40 mt-8 flex flex-wrap gap-3 border-t pt-6">
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-glow-primary/50 text-glow-primary inline-flex rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-glow-primary/10"
              >
                Open live
              </a>
            ) : null}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border/60 text-foreground inline-flex rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
              >
                Repository
              </a>
            ) : null}
            <Link
              href={`/projects/${project.slug}`}
              className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm font-medium underline-offset-4 hover:underline"
              onClick={() => onOpenChange(false)}
            >
              Full page view →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
