export interface Project {
  id: string;
  title: string;
  role: string;
  outcome: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "bid-engine",
    title: "Bid Engine",
    role: "Architecture & full-stack lead",
    outcome: "Real-time auctions with sub-second updates at scale",
    description:
      "Designed a bidding platform around WebSockets, JWT auth, geospatial search, and Redis-backed state — built for concurrent sessions without sacrificing consistency.",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "WebSockets", "Redis"],
    featured: true,
  },
  {
    id: "fixo",
    title: "FIXO",
    role: "Mobile & platform engineering",
    outcome: "Marketplace connecting users to local technicians",
    description:
      "Shipped a cross-platform service marketplace with real-time chat, booking flows, and Firebase-backed sync — focused on reliability in low-connectivity environments.",
    tags: ["Flutter", "Firebase", "Node.js", "REST"],
    featured: true,
  },
  {
    id: "ai-rag-pipeline",
    title: "AI RAG Pipeline",
    role: "Systems & ML integration",
    outcome: "Document retrieval with grounded LLM responses",
    description:
      "Built an ingestion-to-answer pipeline using pgvector embeddings, Groq/Gemini orchestration, and automated document processing for production RAG workloads.",
    tags: ["Python", "FastAPI", "pgvector", "LLM"],
    featured: true,
  },
  {
    id: "mfe-dashboard",
    title: "Micro Frontend Dashboard",
    role: "Frontend platform",
    outcome: "Independent team deploys on a shared shell",
    description:
      "Enterprise admin surface using Webpack Module Federation — shared design system, isolated remotes, and safe independent release cycles.",
    tags: ["React", "MFE", "TypeScript", "Webpack"],
    featured: false,
  },
  {
    id: "multi-tenant-saas",
    title: "Multi-Tenant SaaS",
    role: "Backend architecture",
    outcome: "Tenant isolation with clean domain boundaries",
    description:
      "ASP.NET Core multi-tenant platform with isolation guarantees, JWT boundaries, and clean architecture suited for long-lived product evolution.",
    tags: ["ASP.NET Core", "SQL Server", "Clean Architecture"],
    featured: false,
  },
  {
    id: "e2e-automation",
    title: "E2E Automation Suite",
    role: "Quality engineering",
    outcome: "CI-gated releases with Playwright coverage",
    description:
      "Playwright suite wired into GitHub Actions — regression confidence on every merge, not as an afterthought.",
    tags: ["Playwright", "GitHub Actions", "CI/CD"],
    featured: false,
  },
];
