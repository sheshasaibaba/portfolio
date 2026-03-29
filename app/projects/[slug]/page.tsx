import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { getProjectBySlug, projects } from "@/constants/data";
import {
  portfolioCardInnerClass,
  portfolioCardShellClass,
  portfolioCardTextClass,
} from "@/lib/card-styles";
import type { Project } from "@/types/portfolio";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

function NarrativeBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-glow-secondary text-xs font-semibold tracking-[0.22em] uppercase [text-shadow:0_0_12px_var(--glow-secondary)]">
        {title}
      </h2>
      <div className="text-muted-foreground mt-3 text-sm leading-relaxed md:text-base">{children}</div>
    </section>
  );
}

function ProjectNarrativeSections({ project }: { project: Project }) {
  const n = project.narrative;
  if (!n) return null;

  return (
    <div className="border-border/40 mt-10 space-y-8 border-t pt-10">
      {n.mission ? <NarrativeBlock title="Mission">{n.mission}</NarrativeBlock> : null}
      {n.problem ? <NarrativeBlock title="The problem">{n.problem}</NarrativeBlock> : null}
      {n.innovation ? <NarrativeBlock title="Innovation">{n.innovation}</NarrativeBlock> : null}
      {n.solution ? <NarrativeBlock title="The solution">{n.solution}</NarrativeBlock> : null}
      {n.technicalDeepDive && n.technicalDeepDive.length > 0 ? (
        <section>
          <h2 className="text-glow-secondary text-xs font-semibold tracking-[0.22em] uppercase [text-shadow:0_0_12px_var(--glow-secondary)]">
            Technical deep dive
          </h2>
          <ul className="text-muted-foreground mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed md:text-base">
            {n.technicalDeepDive.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </section>
      ) : null}
      {n.impact ? <NarrativeBlock title="Impact">{n.impact}</NarrativeBlock> : null}
    </div>
  );
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="relative flex min-h-full flex-1 flex-col">
      <article className="mx-auto w-full max-w-2xl flex-1 px-4 py-14 sm:px-6 sm:py-16 md:py-24">
        <div className={portfolioCardShellClass()}>
          <div className={portfolioCardInnerClass()}>
            <Link
              href="/#projects"
              className="text-glow-secondary text-sm font-medium [text-shadow:0_0_10px_var(--glow-secondary)] hover:underline"
            >
              ← Back to projects
            </Link>

            {project.image ? (
              <div className="border-border/50 relative mt-8 aspect-video w-full overflow-hidden rounded-xl border">
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 672px) 100vw, 672px"
                  priority
                />
              </div>
            ) : null}

            <h1
              className={cn(
                "text-foreground mt-8 text-3xl font-semibold tracking-tight md:text-4xl",
                portfolioCardTextClass(),
                "drop-shadow-[0_0_16px_color-mix(in_oklch,var(--glow-primary),transparent_60%)]",
              )}
            >
              {project.title}
            </h1>
            {project.technicalHighlight ? (
              <p
                className={cn(
                  "text-glow-secondary mt-5 text-xs font-semibold tracking-[0.18em] uppercase md:text-sm",
                  portfolioCardTextClass(),
                  "[text-shadow:0_0_14px_var(--glow-secondary)]",
                )}
              >
                {project.technicalHighlight}
              </p>
            ) : null}
            <p
              className={cn(
                "text-muted-foreground mt-6 text-base leading-relaxed md:text-lg",
                portfolioCardTextClass(),
              )}
            >
              {project.description}
            </p>
            {project.details ? (
              <p
                className={cn(
                  "text-muted-foreground mt-6 text-base leading-relaxed",
                  portfolioCardTextClass(),
                )}
              >
                {project.details}
              </p>
            ) : null}

            <ProjectNarrativeSections project={project} />

            {project.badges && project.badges.length > 0 ? (
              <ul className="mt-8 flex flex-wrap gap-2">
                {project.badges.map((b) => (
                  <li
                    key={b}
                    className="border-amber-400/40 bg-amber-500/15 text-amber-100 rounded-md border px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            ) : null}
            <ul
              className={cn(
                "flex flex-wrap gap-2",
                project.badges?.length ? "mt-4" : "mt-8",
              )}
            >
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="border-glow-muted/40 bg-background/45 text-muted-foreground rounded-md border px-2.5 py-1 text-xs backdrop-blur-sm"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "border-glow-primary/45 text-glow-primary inline-flex rounded-lg border px-5 py-2.5 text-sm font-medium shadow-[0_0_18px_var(--glow-muted)]",
                    portfolioCardTextClass(),
                    "[text-shadow:0_0_10px_var(--glow-primary)]",
                  )}
                >
                  {project.github === project.href
                    ? "Open repository"
                    : project.hrefLabel
                      ? `Open ${project.hrefLabel}`
                      : "Open live"}
                </a>
              ) : null}
              {project.github && project.github !== project.href ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "border-border/60 text-foreground hover:border-glow-muted/50 inline-flex rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors",
                    portfolioCardTextClass(),
                  )}
                >
                  GitHub
                </a>
              ) : null}
              <Link
                href="/#contact"
                className="border-border/60 text-foreground hover:border-glow-muted/50 inline-flex rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors"
              >
                Let&apos;s talk
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
