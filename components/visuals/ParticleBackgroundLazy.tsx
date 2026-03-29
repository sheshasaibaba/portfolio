"use client";

import dynamic from "next/dynamic";

const ParticleBackground = dynamic(
  () =>
    import("@/components/visuals/ParticleBackground").then((m) => m.ParticleBackground),
  {
    ssr: false,
    loading: () => (
      <div
        className="bg-background pointer-events-none absolute inset-0 z-0"
        aria-hidden
      />
    ),
  },
);

export function ParticleBackgroundLazy({ className }: { className?: string }) {
  return <ParticleBackground className={className} />;
}
