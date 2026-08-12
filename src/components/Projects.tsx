"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { projects } from "@/content/projects";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/Layout";

const ProjectVisual = dynamic(
  () => import("@/components/three/ProjectVisual"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center">
        <div className="h-16 w-16 rounded-full bg-accent/10" />
      </div>
    ),
  }
);

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section
      id="work"
      className="relative scroll-mt-[96px] overflow-hidden border-t border-border/60 bg-surface py-24 md:py-32"
    >
      <div className="mx-auto max-w-content px-6 md:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Selected work"
            title="Systems shipped end to end."
            description="Case studies spanning realtime platforms, mobile marketplaces, and applied AI each owned from architecture through production."
          />
        </Reveal>

        <div className="space-y-8">
          {featured.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.06}>
              <article className="group grid overflow-hidden rounded-3xl border border-border/80 bg-card/40 transition-colors hover:border-accent/30 lg:grid-cols-2">
                <div className="flex flex-col justify-between p-7 md:p-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-[12px] font-medium text-muted">
                      <span className="text-accent">{project.index}</span>
                      <span className="h-1 w-1 rounded-full bg-border" />
                      <span>{project.category}</span>
                      <span className="h-1 w-1 rounded-full bg-border" />
                      <span>{project.year}</span>
                    </div>
                    <h3 className="mt-5 font-display text-3xl font-medium tracking-tight md:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-[13px] font-medium text-accent/90">
                      {project.role}
                    </p>
                    <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
                      {project.summary}
                    </p>
                  </div>

                  <div className="mt-10">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-muted">
                      Outcome
                    </p>
                    <p className="mt-2 font-display text-xl font-medium leading-snug tracking-tight text-foreground md:text-2xl">
                      {project.outcome}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-3 py-1 text-[11px] font-medium text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className="relative min-h-[260px] border-t border-border/60 lg:min-h-[420px] lg:border-l lg:border-t-0"
                  style={{
                    background: `radial-gradient(ellipse at 50% 40%, ${project.accent}33, transparent 65%), #0a0a0c`,
                  }}
                >
                  <ProjectVisual
                    variant={project.scene}
                    color={project.accent}
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 divide-y divide-border/70 border-y border-border/70">
          {rest.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.55 }}
              className="group grid gap-4 py-8 md:grid-cols-[5rem_1.2fr_1fr] md:items-start md:gap-10"
            >
              <p className="text-[12px] font-semibold tracking-[0.16em] text-accent">
                {project.index}
              </p>
              <div>
                <h3 className="font-display text-2xl font-medium tracking-tight transition-colors group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="mt-1 text-[13px] text-muted">
                  {project.category} · {project.role}
                </p>
                <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-muted">
                  {project.summary}
                </p>
              </div>
              <p className="font-display text-lg font-medium leading-snug tracking-tight text-foreground/90 md:pt-1">
                {project.outcome}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
