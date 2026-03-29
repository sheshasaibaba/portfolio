import { TechStackDynamic } from "@/components/sections/TechStackDynamic";
import { TECH_STACK } from "@/constants/data";

export function TechStack() {
  return (
    <section id="stack" className="scroll-mt-28 border-border/40 border-t">
      <TechStackDynamic categories={TECH_STACK} />
    </section>
  );
}
