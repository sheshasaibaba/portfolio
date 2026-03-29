import type { Project, ProjectNarrative, SiteProfile, TechStackCategoryData } from "@/types/portfolio";

import { personalInfo, projectsSource, techStackSource } from "./personal";
import { visionAIProject } from "./vision-ai-project";

export { experience } from "@/constants/experience";

export const TECH_STACK: TechStackCategoryData[] = techStackSource.map((cat) => {
  const id = cat.category
    .toLowerCase()
    .replace(/\s+&\s+/g, "-")
    .replace(/\s+/g, "-");

  return {
    id,
    label: cat.category,
    emoji: "emoji" in cat ? cat.emoji : undefined,
    items: cat.items.map((it, j) => ({
      id: `${id}-${j}`,
      name: it.label,
      emoji: "emoji" in it ? it.emoji : undefined,
    })),
  };
});

export const siteProfile: SiteProfile = {
  name: personalInfo.name,
  title: personalInfo.title,
  tagline: personalInfo.bio,
  portraitSrc: "/portrait.jpeg",
  portraitAlt: `${personalInfo.name} — portrait photo`,
  email: personalInfo.email,
  linkedin: personalInfo.linkedin,
  github: personalInfo.github,
  resumeUrl: personalInfo.resumeUrl,
  links: [
    { label: "GitHub", href: personalInfo.github },
    { label: "LinkedIn", href: personalInfo.linkedin },
    { label: "Resume", href: personalInfo.resumeUrl },
  ],
};

function mapNarrative(raw: (typeof projectsSource)[number]["narrative"]): ProjectNarrative | undefined {
  if (!raw) return undefined;
  const n = raw as Record<string, unknown>;
  const td = n.technicalDeepDive;
  return {
    problem: typeof n.problem === "string" ? n.problem : undefined,
    solution: typeof n.solution === "string" ? n.solution : undefined,
    technicalDeepDive: Array.isArray(td) ? td.map(String) : undefined,
    impact: typeof n.impact === "string" ? n.impact : undefined,
    mission: typeof n.mission === "string" ? n.mission : undefined,
    innovation: typeof n.innovation === "string" ? n.innovation : undefined,
  };
}

const projectsFromSource: Project[] = projectsSource.map((p) => ({
  id: p.id,
  slug: p.id,
  title: p.title,
  description: p.description,
  technicalHighlight: "technicalHighlight" in p ? p.technicalHighlight : undefined,
  badges:
    "badges" in p && Array.isArray(p.badges) && p.badges.length > 0 ? [...p.badges] : undefined,
  narrative: "narrative" in p ? mapNarrative(p.narrative) : undefined,
  href: p.link !== "#" ? p.link : undefined,
  github: p.github !== "#" ? p.github : undefined,
  image: p.image,
  details: p.details,
  tags: [...p.tags],
}));

/** TaxByNav first, then vision project, then remaining sourced entries */
export const projects: Project[] = [
  ...projectsFromSource.slice(0, 1),
  visionAIProject,
  ...projectsFromSource.slice(1),
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((proj) => proj.slug === slug);
}
