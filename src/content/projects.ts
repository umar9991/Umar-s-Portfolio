export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  role: string;
  year: string;
  summary: string;
  outcome: string;
  stack: string[];
  featured?: boolean;
  accent: string;
  scene: "orb" | "lattice" | "rings";
};

/** Add projects here — Work section scales automatically. */
export const projects: Project[] = [
  {
    id: "bid-engine",
    index: "01",
    title: "Bid Engine",
    category: "Realtime Platform",
    role: "Systems & Full-Stack",
    year: "2024",
    summary:
      "High-concurrency auction platform with live bidding, geospatial discovery, and authenticated sessions — engineered for consistency under burst traffic.",
    outcome: "Sub-second bid propagation with resilient WebSocket fan-out",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "WebSockets"],
    featured: true,
    accent: "#5EEAD4",
    scene: "lattice",
  },
  {
    id: "fixo",
    index: "02",
    title: "FIXO",
    category: "Marketplace",
    role: "Mobile Platform",
    year: "2024",
    summary:
      "Cross-platform service marketplace connecting users with technicians — booking, chat, and sync designed for unreliable networks.",
    outcome: "End-to-end mobile product with realtime messaging",
    stack: ["Flutter", "Firebase", "Node.js"],
    featured: true,
    accent: "#93C5FD",
    scene: "orb",
  },
  {
    id: "ai-rag",
    index: "03",
    title: "RAG Intelligence Layer",
    category: "Applied AI",
    role: "Architecture & ML Ops",
    year: "2025",
    summary:
      "Document ingestion to grounded answers — embeddings, retrieval, and LLM orchestration wired for production evaluation loops.",
    outcome: "Grounded responses over private corpora at product latency",
    stack: ["Python", "FastAPI", "pgvector", "Groq", "Gemini"],
    featured: true,
    accent: "#67E8F9",
    scene: "rings",
  },
  {
    id: "mfe-shell",
    index: "04",
    title: "Federation Shell",
    category: "Frontend Platform",
    role: "Platform Engineering",
    year: "2023",
    summary:
      "Module-federation admin shell enabling independent team deploys on a shared runtime and design system.",
    outcome: "Decoupled release trains without UI fragmentation",
    stack: ["React", "Webpack MFE", "TypeScript"],
    accent: "#FCD34D",
    scene: "lattice",
  },
  {
    id: "saas-tenancy",
    index: "05",
    title: "Multi-Tenant Core",
    category: "SaaS Backend",
    role: "Domain Architecture",
    year: "2023",
    summary:
      "Tenant isolation, auth boundaries, and clean domain layers for a long-lived B2B platform.",
    outcome: "Safe tenancy with extensible bounded contexts",
    stack: ["ASP.NET Core", "SQL Server", "JWT"],
    accent: "#6EE7B7",
    scene: "orb",
  },
  {
    id: "quality-gate",
    index: "06",
    title: "Quality Gate",
    category: "Engineering Systems",
    role: "Automation",
    year: "2024",
    summary:
      "Playwright suite and CI policy as a release gate — regressions caught before production, not after.",
    outcome: "Merge-blocking confidence on critical user paths",
    stack: ["Playwright", "GitHub Actions"],
    accent: "#FDA4AF",
    scene: "rings",
  },
];
