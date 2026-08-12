export type Expertise = {
  id: string;
  index: string;
  title: string;
  description: string;
  points: string[];
  accent: string;
  scene: "spiral" | "cylinders" | "screens";
};

export const expertise: Expertise[] = [
  {
    id: "systems",
    index: "01",
    title: "Product systems",
    description:
      "Cohesive platforms spanning interface, API, and data — designed to evolve for years, not sprints.",
    points: ["System design", "API contracts", "Observability", "Performance budgets"],
    accent: "#5EEAD4",
    scene: "spiral",
  },
  {
    id: "mobile",
    index: "02",
    title: "Mobile platforms",
    description:
      "Cross-platform products with production sync, auth, and offline-aware experience quality.",
    points: ["Flutter", "Realtime sync", "Release discipline", "Device performance"],
    accent: "#93C5FD",
    scene: "cylinders",
  },
  {
    id: "ai",
    index: "03",
    title: "Applied AI",
    description:
      "Retrieval systems and LLM orchestration embedded into real workflows — grounded, measurable, shippable.",
    points: ["RAG pipelines", "Vector search", "Eval loops", "Cost control"],
    accent: "#67E8F9",
    scene: "screens",
  },
];

export type StackGroup = {
  title: string;
  items: string[];
};

export const stack: StackGroup[] = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Dart"],
  },
  {
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "Micro Frontends",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    title: "Backend",
    items: ["Node.js + Express", "Python + FastAPI", "REST APIs"],
  },
  {
    title: "Data & AI",
    items: [
      "PostgreSQL + pgvector",
      "MongoDB",
      "Redis",
      "RAG pipelines",
      "LLM APIs (Groq, Gemini)",
      "LangGraph agents",
    ],
  },
  {
    title: "Mobile",
    items: [
      "Flutter",
      "Firebase (Auth, Firestore, Realtime)",
      "Offline-first architecture",
    ],
  },
  {
    title: "Delivery",
    items: [
      "Git / GitHub",
      "GitHub Actions (CI/CD)",
      "Playwright E2E testing",
      "Clean Architecture",
    ],
  },
];

export const principles = [
  {
    title: "Systems over features",
    body: "Every surface connects to a durable model — APIs, state, and UX as one product.",
  },
  {
    title: "Clarity under load",
    body: "Readable boundaries, tested critical paths, and explicit trade-offs when pressure hits.",
  },
  {
    title: "Craft that compounds",
    body: "Releases should leave the codebase faster, safer, and easier for the next engineer.",
  },
] as const;
