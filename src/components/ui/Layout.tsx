import { tokens } from "@/content/site";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-content px-6 md:px-8 ${className}`}
      style={{ maxWidth: tokens.maxWidth }}
    >
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-[96px] py-24 md:py-32 ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`mb-14 max-w-3xl md:mb-20 ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      <p className="eyebrow mb-5">{eyebrow}</p>
      <h2 className="display text-balance">{title}</h2>
      {description ? <p className="body mt-6 max-w-xl">{description}</p> : null}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "line";
  className?: string;
}) {
  const base =
    "inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[13px] font-semibold tracking-wide transition-all duration-300";
  const variants = {
    primary:
      "bg-accent text-background hover:bg-accent/90 hover:shadow-[0_0_40px_rgba(94,234,212,0.25)]",
    ghost:
      "border border-border bg-transparent text-foreground hover:border-foreground/40 hover:bg-white/5",
    line: "px-2 text-foreground underline-offset-[6px] hover:underline",
  };

  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </a>
  );
}
