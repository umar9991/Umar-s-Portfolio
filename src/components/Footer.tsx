import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 px-6 py-10 md:px-8">
      <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="font-display text-lg font-medium tracking-tight">
          {site.name}
        </p>
        <p className="text-[13px] text-muted">
          © {new Date().getFullYear()} · Umar Ahmad
        </p>
      </div>
    </footer>
  );
}
