"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
  /** Widen inner column (e.g. experience timeline) */
  contentClassName?: string;
};

export function Section({ id, title, children, className, contentClassName }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.08, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn("scroll-mt-28 border-border/40 border-t py-20 md:py-28", className)}
    >
      <div className={cn("mx-auto max-w-3xl px-4 sm:px-6", contentClassName)}>
        <h2 className="text-muted-foreground text-sm font-medium tracking-wide uppercase [text-shadow:0_0_10px_var(--glow-muted)]">
          {title}
        </h2>
        <div className="mt-10">{children}</div>
      </div>
    </motion.section>
  );
}
