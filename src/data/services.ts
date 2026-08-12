export interface Service {
  id: string;
  number: string;
  title: string;
  summary: string;
  items: string[];
  accent: string;
  scene: "spiral" | "cylinders" | "screens";
}

export const services: Service[] = [
  {
    id: "systems",
    number: "01",
    title: "Product systems",
    summary:
      "End-to-end platforms spanning interface, API, and data — designed for longevity, not demos.",
    items: ["System design", "API architecture", "Observability"],
    accent: "#1B4DFF",
    scene: "spiral",
  },
  {
    id: "mobile",
    number: "02",
    title: "Mobile platforms",
    summary:
      "Cross-platform products with production-grade sync, auth, and offline-aware UX.",
    items: ["Flutter", "Realtime sync", "Release discipline"],
    accent: "#3D5A80",
    scene: "cylinders",
  },
  {
    id: "ai",
    number: "03",
    title: "Applied AI",
    summary:
      "Grounded retrieval systems and LLM orchestration embedded into real product workflows.",
    items: ["RAG pipelines", "Vector search", "Evaluation loops"],
    accent: "#5C6B8A",
    scene: "screens",
  },
];
