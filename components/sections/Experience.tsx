import { Section } from "@/components/sections/Section";
import { ExperienceTimelineLoader } from "@/components/sections/ExperienceTimelineLoader";
import { experience } from "@/constants/experience";

export function Experience() {
  return (
    <Section id="experience" title="Experience" contentClassName="max-w-4xl">
      <ExperienceTimelineLoader items={experience} />
    </Section>
  );
}
