export type ProjectNarrative = {
  problem?: string;
  solution?: string;
  technicalDeepDive?: string[];
  impact?: string;
  mission?: string;
  innovation?: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Punchy technical line for cards (e.g. cost, retrieval strategy) */
  technicalHighlight?: string;
  /** Extra callouts (e.g. “Data Engineering”) */
  badges?: string[];
  /** Long-form case study for modal / detail */
  narrative?: ProjectNarrative;
  /** Primary external link (live app, Colab, etc.) */
  href?: string;
  /** Label for the primary link in the card (e.g. Colab); defaults to Live / GitHub when omitted */
  hrefLabel?: string;
  /** Optional public repo */
  github?: string;
  /** Cover for detail page (e.g. /projects/cover.svg) */
  image?: string;
  /** Short expandable blurb (legacy / summary) */
  details?: string;
  tags: string[];
};

export type Experience = {
  id: string;
  /** Compact label beside the trail (e.g. 2025–26) */
  timelineLabel: string;
  role: string;
  /** Full company line on card */
  company: string;
  /** Short name for the live counter (e.g. Clode) */
  companyShort: string;
  /** Full dates on card header */
  period: string;
  /** Human-readable tenure for this role (shown large beside timeline) */
  tenureLabel: string;
  summary: string;
  /** Extra copy revealed on expand (click) */
  details?: string;
  /** Bullet list when expanded; use **text** for bold metrics */
  highlights?: string[];
  accentColor?: string;
  /** e.g. government client line */
  clientSubtitle?: string;
  /** Tech chips shown when card is expanded */
  stackBadges?: string[];
  /** Distinct shell for AI/NLP row */
  cardVariant?: "default" | "nlp";
  /**
   * When expanded, show only this many bullets until “Show more”.
   * If omitted and highlights.length > 6, defaults to 5.
   */
  highlightsPreviewCount?: number;
};

export type TechStackItemData = {
  id: string;
  name: string;
  /** Fallback if no react-icons mapping (see `lib/tech-stack-icons.tsx`) */
  emoji?: string;
};

export type TechStackCategoryData = {
  id: string;
  label: string;
  blurb?: string;
  /** Category marker in the section UI */
  emoji?: string;
  items: TechStackItemData[];
};

export type SiteProfile = {
  name: string;
  title?: string;
  tagline: string;
  location?: string;
  portraitSrc?: string;
  portraitAlt?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  resumeUrl?: string;
  links: { label: string; href: string }[];
};
