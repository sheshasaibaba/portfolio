"use client";

import { ArrowUpRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { GlowTiltCard } from "@/components/cards/GlowTiltCard";
import { ProjectNarrativeDialog } from "@/components/sections/ProjectNarrativeDialog";
import type { Project } from "@/types/portfolio";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
};

const titleClass = cn(
  "text-lg font-semibold tracking-tight text-balance md:text-xl",
  "text-foreground group-hover:text-zinc-950 dark:group-hover:text-white",
  "[text-shadow:none] dark:[text-shadow:0_1px_2px_oklch(0_0_0/35%)]",
  "dark:group-hover:[text-shadow:0_2px_8px_oklch(0_0_0/55%)]",
);

const kickerClass = cn(
  "mt-2 text-[11px] font-medium leading-snug tracking-wide uppercase md:text-xs",
  "text-violet-800 [text-shadow:none] dark:text-glow-secondary dark:[text-shadow:0_0_12px_var(--glow-secondary)]",
  "group-hover:text-violet-950 dark:group-hover:text-cyan-200/95",
);

const linkClass = cn(
  "inline-flex shrink-0 items-center gap-1 text-sm font-medium hover:underline",
  "text-violet-800 [text-shadow:none] dark:text-glow-secondary dark:[text-shadow:0_0_10px_var(--glow-secondary)]",
  "group-hover:text-violet-950 dark:group-hover:text-cyan-200",
);

const bodyClass = cn(
  "mt-3 flex-1 text-sm leading-relaxed",
  "text-muted-foreground group-hover:text-zinc-800",
  "[text-shadow:none] dark:[text-shadow:0_1px_2px_oklch(0_0_0/40%)]",
  "dark:group-hover:text-zinc-200",
);

const tagClass = cn(
  "rounded-md border px-2 py-0.5 text-xs transition-colors",
  "border-zinc-300/90 bg-zinc-100/90 text-zinc-800 backdrop-blur-[2px]",
  "group-hover:border-zinc-400 group-hover:bg-zinc-200/95 group-hover:text-zinc-950",
  "dark:border-glow-muted/40 dark:bg-background/35 dark:text-muted-foreground",
  "dark:group-hover:border-cyan-500/30 dark:group-hover:bg-black/20 dark:group-hover:text-zinc-100",
);

const caseStudyBtn = cn(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all",
  "border-violet-400/70 text-violet-900 hover:bg-violet-100/80 [text-shadow:none]",
  "group-hover:border-violet-600 group-hover:text-zinc-950",
  "dark:border-glow-secondary/50 dark:text-glow-secondary dark:[text-shadow:0_0_10px_var(--glow-secondary)]",
  "dark:hover:bg-glow-secondary/10 dark:group-hover:border-cyan-400/50 dark:group-hover:text-cyan-100",
);

const fullPageLink = cn(
  "inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium transition-all",
  "border-violet-500/55 text-violet-900 hover:bg-violet-50 [text-shadow:none]",
  "group-hover:border-violet-700 group-hover:text-zinc-950",
  "dark:border-glow-primary/50 dark:text-glow-primary",
  "dark:hover:bg-glow-primary/15 dark:group-hover:border-cyan-400/60 dark:group-hover:text-cyan-100 dark:group-hover:[text-shadow:0_0_14px_var(--glow-primary)]",
);

export function ProjectCardInteractive({ project }: Props) {
  const [storyOpen, setStoryOpen] = useState(false);
  const showGithub =
    Boolean(project.github) && (!project.href || project.github !== project.href);

  return (
    <>
      <GlowTiltCard role="article">
        <div className="relative z-10 flex h-full min-h-0 flex-col p-6 transition-colors duration-150 md:p-7 [&_a]:transition-colors">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
            <div className="min-w-0 flex-1 sm:pr-2">
              <h3 className={titleClass}>{project.title}</h3>
              {project.technicalHighlight ? (
                <p className={kickerClass}>{project.technicalHighlight}</p>
              ) : null}
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {project.github === project.href
                    ? "GitHub"
                    : project.hrefLabel ?? "Live"}
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              ) : null}
              {showGithub ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  GitHub
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              ) : null}
            </div>
          </div>
          <p className={bodyClass}>{project.description}</p>
          {project.badges && project.badges.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.badges.map((b) => (
                <li
                  key={b}
                  className="rounded-md border border-amber-600/40 bg-amber-100/90 px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-amber-950 uppercase shadow-sm dark:border-amber-400/35 dark:bg-amber-500/[0.12] dark:text-amber-100/95 dark:shadow-[0_0_12px_rgba(251,191,36,0.15)]"
                >
                  {b}
                </li>
              ))}
            </ul>
          ) : null}
          <ul className={cn("flex flex-wrap gap-2", project.badges?.length ? "mt-3" : "mt-5")}>
            {project.tags.map((tag) => (
              <li key={tag} className={tagClass}>
                {tag}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.narrative ? (
              <button type="button" onClick={() => setStoryOpen(true)} className={caseStudyBtn}>
                <BookOpen className="size-4 shrink-0" aria-hidden />
                Case study
              </button>
            ) : null}
            <Link href={`/projects/${project.slug}`} className={fullPageLink}>
              Full page
            </Link>
          </div>
        </div>
      </GlowTiltCard>

      <ProjectNarrativeDialog project={project} open={storyOpen} onOpenChange={setStoryOpen} />
    </>
  );
}
