export const SECTION_NAV = [
  { id: "hero", label: "Home", href: "#hero" },
  { id: "about", label: "About", href: "#about" },
  { id: "stack", label: "Stack", href: "#stack" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Connect", href: "#contact" },
] as const;

/** Stable list for scroll hooks (avoid new array identity each render). */
export const SECTION_NAV_IDS: readonly string[] = SECTION_NAV.map((item) => item.id);

export type SectionNavItem = (typeof SECTION_NAV)[number];
