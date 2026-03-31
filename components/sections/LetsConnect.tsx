"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";

import { GlowTiltCard } from "@/components/cards/GlowTiltCard";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/brand-icons";
import { siteProfile } from "@/constants/data";
import { cn } from "@/lib/utils";

/** Subtle contact rows — no tilt / radial / shell shadow (parent card carries the drama). */
const connectRow =
  "group flex min-h-[4rem] items-center gap-3 rounded-xl border border-zinc-300/80 bg-white/90 px-4 py-3 transition-colors duration-150 hover:border-zinc-400 hover:bg-zinc-100 hover:shadow-sm dark:border-border/25 dark:bg-black/20 dark:hover:border-border/45 dark:hover:bg-black/28";

const connectIcon =
  "size-5 shrink-0 text-zinc-600 transition-colors group-hover:text-violet-700 dark:text-muted-foreground dark:group-hover:text-glow-secondary";

const connectLabel =
  "text-sm font-medium text-zinc-900 transition-colors group-hover:text-zinc-950 dark:text-foreground/90 dark:group-hover:text-foreground";

export function LetsConnect() {
  const { email, phone, linkedin, github } = siteProfile;

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.12, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="scroll-mt-28 border-border/40 border-t py-20 md:py-28"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <GlowTiltCard>
          <div className="relative z-10 p-6 text-center md:p-8">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.24 }}
              className="text-sm font-medium tracking-[0.25em] text-violet-800 uppercase [text-shadow:none] group-hover:text-violet-950 dark:text-glow-secondary dark:[text-shadow:0_0_12px_var(--glow-secondary)] dark:group-hover:text-cyan-200"
            >
              Open to collaboration
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.26, delay: 0.03 }}
              className={cn(
                "mt-4 text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl",
                "group-hover:text-zinc-950 [text-shadow:none]",
                "dark:text-foreground dark:group-hover:text-white",
                "dark:[text-shadow:0_1px_2px_oklch(0_0_0/35%)] dark:group-hover:[text-shadow:0_2px_10px_oklch(0_0_0/50%)]",
              )}
            >
              Let&apos;s connect
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.26, delay: 0.06 }}
              className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-zinc-700 md:text-lg [text-shadow:none] group-hover:text-zinc-900 dark:text-muted-foreground dark:[text-shadow:0_1px_2px_oklch(0_0_0/40%)] dark:group-hover:text-zinc-200"
            >
              Building the future, one line at a time. Whether you&apos;re shipping a product,
              scaling a team, or exploring something ambitious, I&apos;d love to hear from you.
            </motion.p>

            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={{
                visible: { transition: { staggerChildren: 0.04 } },
                hidden: {},
              }}
              className="mt-10 grid gap-2.5 text-left sm:grid-cols-2 sm:gap-3"
            >
              {linkedin ? (
                <motion.li
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.22 }}
                >
                  <Link
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(connectRow, "w-full")}
                  >
                    <LinkedInIcon className={connectIcon} />
                    <span className={connectLabel}>LinkedIn</span>
                  </Link>
                </motion.li>
              ) : null}
              {github ? (
                <motion.li
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.22 }}
                >
                  <Link
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(connectRow, "w-full")}
                  >
                    <GitHubIcon className={connectIcon} />
                    <span className={connectLabel}>GitHub</span>
                  </Link>
                </motion.li>
              ) : null}
              {email ? (
                <motion.li
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.22 }}
                >
                  <a href={`mailto:${email}`} className={cn(connectRow, "w-full")}>
                    <Mail className={connectIcon} aria-hidden />
                    <span className={cn(connectLabel, "break-all")}>{email}</span>
                  </a>
                </motion.li>
              ) : null}
              {phone ? (
                <motion.li
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.22 }}
                >
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className={cn(connectRow, "w-full")}>
                    <Phone className={connectIcon} aria-hidden />
                    <span className={connectLabel}>{phone}</span>
                  </a>
                </motion.li>
              ) : null}
            </motion.ul>
          </div>
        </GlowTiltCard>
      </div>
    </motion.section>
  );
}
