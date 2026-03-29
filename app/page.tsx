import { About, Contact, Experience, Hero, Projects, TechStack } from "@/components/sections";
import { ParticleBackgroundLazy } from "@/components/visuals/ParticleBackgroundLazy";

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col">
      <ParticleBackgroundLazy className="z-0" />
      <main className="relative z-10 flex flex-1 flex-col">
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
