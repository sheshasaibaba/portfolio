import { Section } from "@/components/sections/Section";
import {
  portfolioCardInnerClass,
  portfolioCardShellClass,
  portfolioCardTextClass,
} from "@/lib/card-styles";
import { aboutContent } from "@/constants/personal";
import { cn } from "@/lib/utils";

export function About() {
  return (
    <Section id="about" title="About">
      <div className={portfolioCardShellClass()}>
        <div className={portfolioCardInnerClass()}>
          <p
            className={cn(
              "text-muted-foreground text-base leading-relaxed md:text-[1.05rem]",
              portfolioCardTextClass(),
            )}
          >
            {aboutContent.lead}
          </p>
          <ul className="mt-8 space-y-6">
            {aboutContent.pillars.map((pillar) => (
              <li key={pillar.title}>
                <h3 className="text-foreground text-sm font-semibold tracking-tight">{pillar.title}</h3>
                <p
                  className={cn(
                    "text-muted-foreground mt-2 text-sm leading-relaxed md:text-base",
                    portfolioCardTextClass(),
                  )}
                >
                  {pillar.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
