export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "Dart"],
  },
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "Micro Frontends",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    title: "Backend",
    skills: ["Node.js + Express", "Python + FastAPI", "REST APIs"],
  },
  {
    title: "Data & AI",
    skills: [
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
    skills: [
      "Flutter",
      "Firebase (Auth, Firestore, Realtime)",
      "Offline-first architecture",
    ],
  },
  {
    title: "Delivery",
    skills: [
      "Git / GitHub",
      "GitHub Actions (CI/CD)",
      "Playwright E2E testing",
      "Clean Architecture",
    ],
  },
];

export const socialLinks = {
  github: "https://github.com/umar9991",
  linkedin: "https://www.linkedin.com/in/umar-ahmad-91b7b5338",
  upwork: "https://www.upwork.com/freelancers/~",
  email: "umar.ahmad9991@gmail.com",
};
