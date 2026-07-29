// ---------------------------------------------------------------------------
// This is the ONE file you edit with your real content. Nothing in scene/ or
// components/ should hard-code text — it all reads from here.
// ---------------------------------------------------------------------------

export type SectionKey = "about" | "experience" | "projects" | "resume" | "contact";

export interface SectionConfig {
  key: SectionKey;
  planetLabel: string;   // e.g. "Mars" — what the body is called in the scene
  eyebrow: string;       // e.g. "Experience" — the section's real-world name
  title: string;
  color: string;         // hex, drives both material color and UI accents
  orbitRadius: number;   // 0 = the sun / home body
  orbitSpeed: number;    // radians/sec, 0 = stationary
  size: number;
  hasRing?: boolean;
  isSun?: boolean;
  isGalaxy?: boolean;
}

export const sections: Record<SectionKey, SectionConfig> = {
  about: {
    key: "about",
    planetLabel: "Home",
    eyebrow: "About Me",
    title: "Your Name",
    color: "#ffb865",
    orbitRadius: 0,
    orbitSpeed: 0,
    size: 3.2,
    isSun: true,
  },
  experience: {
    key: "experience",
    planetLabel: "Mars",
    eyebrow: "Experience",
    title: "Where I've Worked",
    color: "#d9603b",
    orbitRadius: 11,
    orbitSpeed: 0.09,
    size: 1.3,
  },
  projects: {
    key: "projects",
    planetLabel: "Saturn",
    eyebrow: "Projects",
    title: "Things I've Built",
    color: "#e0c9a6",
    orbitRadius: 18,
    orbitSpeed: 0.05,
    size: 1.9,
    hasRing: true,
  },
  resume: {
    key: "resume",
    planetLabel: "Moon",
    eyebrow: "Resume",
    title: "Get The PDF",
    color: "#cfd2da",
    orbitRadius: 6.5,
    orbitSpeed: 0.16,
    size: 0.75,
  },
  contact: {
    key: "contact",
    planetLabel: "Galaxy",
    eyebrow: "Contact",
    title: "Let's Talk",
    color: "#7c6cf0",
    orbitRadius: 25,
    orbitSpeed: 0.03,
    size: 1.6,
    isGalaxy: true,
  },
};

// ---------------------------------------------------------------------------
// Long-form body content per section, kept as plain data (not JSX) so this
// stays a .ts file. ContentPanel.tsx is responsible for rendering it.
// Replace every placeholder string/array below with your real content.
// ---------------------------------------------------------------------------

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  summary: string;
}

export interface ProjectItem {
  name: string;
  summary: string;
  link?: string;
}

export const aboutBody = {
  paragraphs: [
    "I'm a full-stack developer who builds fast, thoughtful web experiences.",
    "Replace this with two or three real sentences about who you are, what you work on, and what you're looking for.",
  ],
};

export const experienceBody: ExperienceItem[] = [
  { role: "Senior Developer", company: "Company Name", period: "2023 — Present", summary: "One or two lines on scope and impact." },
  { role: "Developer", company: "Company Name", period: "2021 — 2023", summary: "One or two lines on scope and impact." },
];

export const projectsBody: ProjectItem[] = [
  { name: "Project Name", summary: "Short description and tech stack.", link: "https://github.com/you/project" },
  { name: "Project Name", summary: "Short description and tech stack.", link: "https://github.com/you/project" },
];

export const resumeBody = {
  fileUrl: "/resume.pdf",
  note: "Download a current copy of my resume.",
};

export const contactBody = {
  email: "you@example.com",
  links: [
    { label: "GitHub", url: "https://github.com/you" },
    { label: "LinkedIn", url: "https://linkedin.com/in/you" },
  ],
};
