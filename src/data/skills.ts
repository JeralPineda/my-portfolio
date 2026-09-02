export interface SkillGroup {
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Core",
    items: ["React", "React Native", "Expo", "Next.js", "Astro", "TypeScript", "JavaScript"],
  },
  {
    label: "Front-End",
    items: [
      "HTML",
      "CSS",
      "Tailwind CSS",
      "NativeWind",
      "Styled Components",
      "React Query",
      "Redux",
      "RTK Query",
      "Zustand",
      "Reanimated",
      "Skia",
      "Astro",
      "Zod",
    ],
  },
  {
    label: "Back-End",
    items: ["Node.js", "REST APIs", "SQL", "PostgreSQL", "Drizzle", "Supabase", "Strapi"],
  },
  {
    label: "Herramientas",
    items: [
      "Git",
      "GitHub",
      "Azure DevOps",
      "Docker",
      "TeamCity (CI/CD)",
      "Figma",
      "Claude Code",
      "OpenCode",
      "Slack",
    ],
  },
];
