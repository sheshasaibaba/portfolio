"use client";

import { useEffect, useState } from "react";

const DEFAULT_ORDER = [
  "home",
  "about",
  "stack",
  "experience",
  "projects",
  "contact",
] as const;

export type SectionId = (typeof DEFAULT_ORDER)[number];

export function useActiveSection(order: readonly string[] = DEFAULT_ORDER): string | null {
  const [active, setActive] = useState<string | null>(order[0] ?? null);

  useEffect(() => {
    const elements = order
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.intersectionRatio > 0)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (top?.target.id) setActive(top.target.id);
      },
      { root: null, rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [order]);

  return active;
}
