"use client";

import dynamic from "next/dynamic";

import type { TechStackCategoryData } from "@/types/portfolio";

const TechStackWaterfall = dynamic(
  () =>
    import("@/components/sections/TechStackWaterfall").then((m) => m.TechStackWaterfall),
  {
    ssr: false,
    loading: () => (
      <div
        className="bg-muted/15 min-h-[28rem] animate-pulse rounded-2xl border border-border/30"
        aria-hidden
      />
    ),
  },
);

export function TechStackDynamic({ categories }: { categories: TechStackCategoryData[] }) {
  return <TechStackWaterfall categories={categories} />;
}
