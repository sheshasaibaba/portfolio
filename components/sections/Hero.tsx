"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { GlowTiltCard } from "@/components/cards/GlowTiltCard";
import { ResumeDialog } from "@/components/layout/ResumeDialog";
import { siteProfile } from "@/constants/data";
import { cn } from "@/lib/utils";

export function Hero() {
  const src = siteProfile.portraitSrc;
  const alt = siteProfile.portraitAlt ?? `${siteProfile.name} portrait`;
  const [resumeOpen, setResumeOpen] = useState(false);
  const resumeLink = siteProfile.links.find((l) => l.label.toLowerCase() === "resume");

  return (
    <motion.section
      id="home"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex min-h-[78vh] flex-col justify-center px-4 py-20 sm:px-6 sm:py-24 md:min-h-[85vh] md:py-32"
    >
      <ResumeDialog open={resumeOpen} onOpenChange={setResumeOpen} />
      <div className="mx-auto grid w-full max-w-5xl items-center gap-12 md:grid-cols-[1fr_minmax(260px,320px)] md:gap-16">
        <div className="order-2 md:order-1">
          <p className="text-glow-secondary text-sm font-medium tracking-wide uppercase [text-shadow:0_0_12px_var(--glow-secondary)]">
            Portfolio
          </p>
          <h1 className="text-foreground mt-4 text-4xl font-semibold tracking-tight text-balance drop-shadow-[0_0_14px_color-mix(in_oklch,var(--glow-primary),transparent_55%)] md:text-5xl md:drop-shadow-[0_0_20px_color-mix(in_oklch,var(--glow-primary),transparent_50%)]">
            {siteProfile.name}
          </h1>
          {siteProfile.title ? (
            <p className="text-foreground/90 mt-3 text-lg font-medium tracking-tight text-balance md:text-xl">
              {siteProfile.title}
            </p>
          ) : null}
          {siteProfile.location ? (
            <p className="text-muted-foreground mt-2 text-sm md:text-base">{siteProfile.location}</p>
          ) : null}
          <p
            className={cn(
              "text-muted-foreground mt-6 max-w-xl text-lg text-pretty md:text-xl",
              "[text-shadow:0_1px_2px_oklch(0_0_0/40%)] dark:[text-shadow:0_1px_3px_oklch(0_0_0/60%)]",
            )}
          >
            {siteProfile.tagline}
          </p>
          {siteProfile.links.length > 0 ? (
            <ul className="mt-10 flex flex-wrap gap-3">
              {siteProfile.links
                .filter((l) => l.label.toLowerCase() !== "resume")
                .map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-glow-muted/40 text-foreground hover:border-glow-primary/50 hover:text-glow-primary inline-flex rounded-lg border bg-background/50 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors [box-shadow:0_0_0_1px_var(--glow-muted)] hover:[box-shadow:0_0_16px_var(--glow-muted)]"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              {resumeLink ? (
                <li>
                  <button
                    type="button"
                    onClick={() => setResumeOpen(true)}
                    className="border-glow-muted/40 text-foreground hover:border-glow-primary/50 hover:text-glow-primary inline-flex rounded-lg border bg-background/50 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors [box-shadow:0_0_0_1px_var(--glow-muted)] hover:[box-shadow:0_0_16px_var(--glow-muted)]"
                  >
                    Resume
                  </button>
                </li>
              ) : null}
            </ul>
          ) : null}
        </div>

        {src ? (
          <GlowTiltCard
            className={cn(
              "order-1 aspect-[4/5] w-full max-w-[320px] justify-self-center md:order-2 md:justify-self-end",
            )}
          >
            <div className="relative z-10 size-full min-h-[280px] p-3 md:min-h-[320px] md:p-4">
              <div className="relative size-full overflow-hidden rounded-lg">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </GlowTiltCard>
        ) : null}
      </div>
    </motion.section>
  );
}
