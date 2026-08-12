"use client";

import Image from "next/image";
import { site } from "@/content/site";
import { principles } from "@/content/expertise";
import { Reveal } from "@/components/ui/Reveal";

export default function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-[96px] border-t border-border/60 bg-surface py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-content items-start gap-14 px-6 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border/70">
            <Image
              src={site.portrait}
              alt={site.name}
              fill
              className="object-cover object-[center_16%]"
              sizes="(max-width: 1024px) 100vw, 420px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-[12px] font-medium text-accent">{site.location}</p>
              <p className="mt-1 text-[13px] text-muted">{site.availability}</p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow mb-5">About</p>
            <h2 className="display max-w-xl text-balance">
              Built for product depth — not portfolio theater.
            </h2>
            <div className="body mt-8 max-w-xl space-y-5">
              <p>
                I work across the stack with equal weight on architecture and
                experience: React and Next.js at the edge, FastAPI and Node in
                the middle, Flutter on mobile, and retrieval systems when the
                product needs grounded AI.
              </p>
              <p>
                The projects that matter most are the ones that survive contact
                with real users — realtime bidding, multi-tenant platforms,
                marketplaces, and pipelines that stay honest under load.
              </p>
            </div>
          </Reveal>

          <div className="mt-14">
            {principles.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="grid gap-3 border-t border-border/70 py-7 sm:grid-cols-[7rem_1fr] sm:gap-8">
                  <p className="text-[12px] font-semibold tracking-[0.18em] text-accent">
                    0{i + 1}
                  </p>
                  <div>
                    <h3 className="font-display text-xl font-medium tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-border/70" />
          </div>
        </div>
      </div>
    </section>
  );
}
