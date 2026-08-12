"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Layout";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] scroll-mt-[96px] overflow-hidden pt-[4.25rem]"
    >
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="pointer-events-none absolute inset-0 bg-grid-fade bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="relative mx-auto grid min-h-[calc(100svh-4.25rem)] max-w-content items-center gap-10 px-6 py-16 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-20">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-border/80 bg-white/[0.03] px-4 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-[12px] font-medium text-muted">
              {site.availability}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow mb-5"
          >
            {site.role}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl font-medium leading-[1.02] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            {site.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="body mt-7 max-w-xl text-balance"
          >
            {site.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <ButtonLink href="#work">Explore selected work</ButtonLink>
            <ButtonLink href="#contact" variant="ghost">
              Start a conversation
            </ButtonLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-14 flex flex-wrap gap-x-8 gap-y-2 border-t border-border/70 pt-6 text-[12px] font-medium tracking-[0.08em] text-dark-muted"
          >
            <span>WEB PLATFORMS</span>
            <span>MOBILE PRODUCTS</span>
            <span>APPLIED AI</span>
            <span>SYSTEM DESIGN</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-square w-full max-w-lg lg:max-w-none"
        >
          <div className="absolute inset-0 z-0">
            <HeroScene />
          </div>

          <div className="absolute inset-[18%] z-10 overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_80px_rgba(94,234,212,0.12)]">
            <Image
              src={site.portrait}
              alt={site.name}
              fill
              priority
              className="object-cover object-[center_15%]"
              sizes="(max-width: 1024px) 80vw, 420px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-2 left-1/2 z-20 hidden -translate-x-1/2 rounded-full border border-border bg-card/90 px-4 py-2 text-[11px] font-medium text-muted backdrop-blur md:block">
            {site.location}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
