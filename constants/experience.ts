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
  details: e.details,
  highlights: [...e.highlights],
  accentColor: e.color,
  clientSubtitle: "clientSubtitle" in e ? e.clientSubtitle : undefined,
  stackBadges: "stackBadges" in e && e.stackBadges ? [...e.stackBadges] : undefined,
  cardVariant: "cardVariant" in e ? e.cardVariant : undefined,
  highlightsPreviewCount:
    "highlightsPreviewCount" in e ? e.highlightsPreviewCount : undefined,
}));
