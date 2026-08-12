"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/content/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-all duration-500 ${
          scrolled
            ? "border-border/70 bg-background/80 backdrop-blur-2xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[4.25rem] max-w-content items-center justify-between px-6 md:px-8">
          <a
            href="#home"
            className="font-display text-lg font-medium tracking-tight md:text-xl"
          >
            {site.name}
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[13px] font-medium text-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href={`mailto:${site.email}`}
              className="hidden text-[13px] font-semibold text-accent transition-opacity hover:opacity-80 md:inline-block"
            >
              {site.availability.split("·")[0].trim()}
            </a>
            <button
              type="button"
              className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <div className="flex w-5 flex-col gap-[5px]">
                <span
                  className={`block h-px bg-foreground transition-transform ${
                    open ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px bg-foreground transition-opacity ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-px bg-foreground transition-transform ${
                    open ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="border-b border-border bg-background px-6 py-8 md:hidden"
          >
            <ul className="space-y-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-lg font-medium text-muted hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
