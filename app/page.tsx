import { About } from "@/components/main/about";
import { Encryption } from "@/components/main/encryption";
import { Hero } from "@/components/main/hero";
import { Resume } from "@/components/main/resume";
import { Skills } from "@/components/main/skills";
import { InteractiveLogo } from "@/components/sub/interactive-logo";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <About />
        <Resume />
        <Skills />
        <Encryption />
        <InteractiveLogo />
      </div>
    </main>
  );
}
