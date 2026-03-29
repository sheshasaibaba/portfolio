import { cn } from "@/lib/utils";

/** Outer shell: tilt/glow cards + section cards */
export function portfolioCardShellClass(...extra: (string | false | undefined)[]) {
  return cn(
    "border-border/60 bg-surface-elevated/45 relative overflow-hidden rounded-2xl border",
    "shadow-[0_0_0_1px_var(--glow-muted)] transition-shadow duration-150",
    ...extra,
  );
}

/** Readable inner panel — keeps text clear over glow + particles */
export function portfolioCardInnerClass(...extra: (string | false | undefined)[]) {
  return cn(
    "relative z-10 rounded-xl border border-border/40 bg-background/82 p-6 shadow-[inset_0_1px_0_0_oklch(1_0_0/6%)] backdrop-blur-md md:p-7",
    "dark:bg-background/78 dark:shadow-[inset_0_1px_0_0_oklch(1_0_0/8%)]",
    ...extra,
  );
}

/** Body text on cards — extra contrast vs busy backgrounds */
export function portfolioCardTextClass() {
  return "[text-shadow:0_1px_2px_oklch(0_0_0/45%)] dark:[text-shadow:0_1px_3px_oklch(0_0_0/65%)]";
}
