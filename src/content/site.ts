/** Central design tokens — scale the product from one source of truth. */
export const tokens = {
  headerOffset: 96,
  maxWidth: "80rem",
  ease: [0.16, 1, 0.3, 1] as const,
  duration: {
    fast: 0.35,
    base: 0.6,
    slow: 0.9,
  },
} as const;

export const site = {
  name: "Umar Ahmad",
  role: "Software Engineer",
  tagline:
    "I architect and ship production systems across web, mobile, and applied AI with the discipline of platform engineering and the taste of product craft.",
  location: "Remote · Worldwide",
  availability: "Open to full-time · Select engagements",
  email: "umar.ahmad9991@gmail.com",
  social: {
    github: "https://github.com/umar9991",
    linkedin: "https://www.linkedin.com/in/umar-ahmad-91b7b5338",
    upwork: "https://www.upwork.com/freelancers/~",
  },
  nav: [
    { href: "#work", label: "Work" },
    { href: "#expertise", label: "Expertise" },
    { href: "#about", label: "About" },
    { href: "#stack", label: "Stack" },
    { href: "#contact", label: "Contact" },
  ],
  portrait: "/umar's-pic.jpeg",
} as const;
