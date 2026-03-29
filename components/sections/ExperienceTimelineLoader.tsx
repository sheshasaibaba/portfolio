"use client";

import dynamic from "next/dynamic";

import type { Experience } from "@/types/portfolio";

const ExperienceTimeline = dynamic(
  () =>
    import("@/components/sections/ExperienceTimeline").then((m) => m.ExperienceTimeline),
  {
    ssr: false,
    loading: () => (
      <div
        className="bg-muted/20 h-72 animate-pulse rounded-xl border border-border/40"
        aria-hidden
      />
    ),
  },
);

export function ExperienceTimelineLoader({ items }: { items: Experience[] }) {
  return <ExperienceTimeline items={items} />;
}
