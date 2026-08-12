"use client";

import { stack } from "@/content/expertise";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/Layout";

const marqueeItems = [
  "TypeScript",
  "React",
  "Next.js",
  "FastAPI",
  "Flutter",
  "PostgreSQL",
  "pgvector",
  "LangGraph",
  "Firebase",
  "Playwright",
  "Micro Frontends",
  "Clean Architecture",
];

export default function Skills() {
  return (
    <section
      id="stack"
      className="relative scroll-mt-[96px] overflow-hidden border-t border-border/60 py-24 md:py-32"
    >
      <div className="mb-16 overflow-hidden border-y border-border/50 py-5">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center whitespace-nowrap"
            >
              {marqueeItems.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="mx-6 font-display text-2xl font-medium tracking-tight text-foreground/25 md:text-3xl"
                >
                  {item}
                  <span className="ml-6 text-accent/40">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-content px-6 md:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Stack"
            title="Chosen for leverage not novelty."
            description="A focused toolkit that scales with the problem. Content lives in one file; this grid grows as you do."
          />
        </Reveal>

        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.04}>
              <h3 className="border-b border-border/70 pb-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-[15px] font-medium text-foreground/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
