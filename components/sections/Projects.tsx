import { Section } from "@/components/sections/Section";
import { ProjectCardInteractive } from "@/components/sections/ProjectCardInteractive";
import { projects } from "@/constants/data";

export function Projects() {
  const featured = projects.slice(0, 5);

  return (
    <Section id="projects" title="Projects" contentClassName="max-w-4xl">
      {featured.length === 0 ? (
        <p className="text-muted-foreground">
          No projects yet. Add entries to <code className="text-foreground">constants/personal.ts</code>
          .
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((p) => (
            <ProjectCardInteractive key={p.id} project={p} />
          ))}
        </div>
      )}
    </Section>
  );
}
