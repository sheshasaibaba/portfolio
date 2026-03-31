import type { Experience } from "@/types/portfolio";
import { experienceSource } from "./personal";

export const experience: Experience[] = experienceSource.map((e) => ({
  id: e.id,
  timelineLabel: e.timelineLabel,
  role: e.role,
  company: e.company,
  companyShort: e.companyShort,
  period: e.period,
  tenureLabel: e.tenureLabel,
  summary: e.description,
  details: (() => {
    const v = (e as { details?: unknown }).details;
    return typeof v === "string" ? v : undefined;
  })(),
  highlights: [...e.highlights],
  accentColor: e.color,
  clientSubtitle: (() => {
    const v = (e as any).clientSubtitle;
    return typeof v === "string" ? v : undefined;
  })(),
  stackBadges: "stackBadges" in e && e.stackBadges ? [...e.stackBadges] : undefined,
  cardVariant: (() => {
    const v = (e as any).cardVariant;
    return v === "default" || v === "nlp" ? v : undefined;
  })(),
  highlightsPreviewCount: (() => {
    const v = (e as any).highlightsPreviewCount;
    return typeof v === "number" ? v : undefined;
  })(),
}));
