"use client";

import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Layout";

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "LinkedIn", value: "umar-ahmad-91b7b5338", href: site.social.linkedin },
  { label: "GitHub", value: "umar9991", href: site.social.github },
  { label: "Upwork", value: "Freelancer", href: site.social.upwork },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-[96px] overflow-hidden border-t border-border/60 bg-surface py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-70" />
      <div className="relative mx-auto max-w-content px-6 md:px-8">
        <Reveal>
          <p className="eyebrow mb-5">Contact</p>
          <h2 className="display max-w-4xl text-balance">
            Let&apos;s build the next system worth shipping.
          </h2>
          <p className="body mt-6 max-w-xl">
            Full-time roles and a small number of high-signal engagements.
            Prefer email for first contact — I typically respond within a day.
          </p>
          <div className="mt-10">
            <ButtonLink href={`mailto:${site.email}`}>Write to Umar</ButtonLink>
          </div>
        </Reveal>

        <div className="mt-20 grid border-t border-border/70 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((channel, i) => (
            <Reveal key={channel.label} delay={i * 0.05}>
              <a
                href={channel.href}
                target={channel.label === "Email" ? undefined : "_blank"}
                rel={
                  channel.label === "Email" ? undefined : "noopener noreferrer"
                }
                className="group block border-b border-border/70 py-7 sm:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-muted">
                  {channel.label}
                </p>
                <p className="mt-3 text-[15px] font-medium transition-colors group-hover:text-accent">
                  {channel.value}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
