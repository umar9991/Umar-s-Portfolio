"use client";

import dynamic from "next/dynamic";
import { expertise } from "@/content/expertise";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/Layout";

const ExpertiseScene = dynamic(
  () => import("@/components/three/ExpertiseScene"),
  {
    ssr: false,
    loading: () => <div className="h-full w-full bg-white/[0.02]" />,
  }
);

export default function Services() {
  return (
    <section
      id="expertise"
      className="relative scroll-mt-[96px] overflow-hidden border-t border-border/60 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-50" />
      <div className="relative mx-auto max-w-content px-6 md:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Expertise"
            title="Depth where it compounds."
            description="Three domains I own end-to-end — from problem framing and architecture through shipping and iteration."
          />
        </Reveal>

        <div className="space-y-5">
          {expertise.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.07}>
              <article className="grid items-center gap-6 overflow-hidden rounded-3xl border border-border/80 bg-card/30 p-6 transition-colors hover:border-accent/25 md:grid-cols-[1fr_auto] md:gap-10 md:p-8">
                <div className="max-w-2xl">
                  <p className="text-[12px] font-semibold tracking-[0.2em] text-accent">
                    {item.index}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-medium tracking-tight md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">
                    {item.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="text-[12px] font-medium tracking-wide text-foreground/70"
                      >
                        <span className="mr-2 text-accent">▹</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="relative h-44 w-full overflow-hidden rounded-2xl md:h-52 md:w-72"
                  style={{
                    background: `radial-gradient(circle at 50% 45%, ${item.accent}28, transparent 70%)`,
                  }}
                >
                  <ExpertiseScene variant={item.scene} color={item.accent} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
