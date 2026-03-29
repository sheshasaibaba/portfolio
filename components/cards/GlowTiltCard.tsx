"use client";

import type { ComponentPropsWithoutRef } from "react";

import { useGlowTiltCard, type GlowTiltVariant } from "@/hooks/useGlowTiltCard";
import { portfolioCardShellClass } from "@/lib/card-styles";
import { cn } from "@/lib/utils";

type Props = ComponentPropsWithoutRef<"div"> & {
  variant?: GlowTiltVariant;
};

/**
 * Same interactive shell as project cards: perspective tilt, cursor-following
 * radial glow, hover veil. Use `subtle` for experience timeline rows.
 */
export function GlowTiltCard({ variant = "default", className, style, children, ...props }: Props) {
  const {
    cardRef,
    transform,
    glow,
    glowMix,
    radialOpacityClass,
    veilClass,
    onMouseMove,
    onMouseLeave,
  } = useGlowTiltCard(variant);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn(
        portfolioCardShellClass(
          "group motion-reduce:transform-none",
          variant === "default" && "hover:shadow-[0_0_32px_var(--glow-muted)]",
          variant === "subtle" && "hover:shadow-[0_0_22px_var(--glow-muted)]",
          className,
        ),
      )}
      style={{
        transform,
        transformStyle: "preserve-3d",
        ...style,
      }}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl" aria-hidden>
        <div
          className={cn(
            "absolute -inset-[35%] transition-opacity duration-150",
            radialOpacityClass,
            "motion-reduce:opacity-28",
          )}
          style={{
            background: `radial-gradient(closest-side at ${glow.x}% ${glow.y}%, color-mix(in oklch, var(--glow-primary) ${glowMix}, transparent), transparent 72%)`,
          }}
        />
        <div className={veilClass} />
      </div>
      {children}
    </div>
  );
}
