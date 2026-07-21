export type SkillFallbackIcon =
  "database" | "message-square" | "palette" | "paw-print" | "wind" | "zap";

export interface Skill {
  name: string;
  slug?: string;
  icon?: SkillFallbackIcon;
}

export const skills: Skill[] = [
  // FrontEnd
  { name: "React", slug: "react" },
  { name: "React Native", slug: "react" },
  { name: "Expo", slug: "expo" },
  { name: "JavaScript", slug: "javascript" },
  { name: "TypeScript", slug: "typescript" },
  { name: "HTML", slug: "html5" },
  { name: "CSS", slug: "css" },
  { name: "Astro", slug: "astro" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Styled Components", slug: "styledcomponents" },
  { name: "Reanimated", icon: "zap" },
  { name: "Skia", icon: "palette" },
  { name: "GSAP", slug: "gsap" },
  { name: "React Query", slug: "reactquery" },
  { name: "Redux", slug: "redux" },
  { name: "RTK Query", slug: "redux" },
  { name: "NativeWind", icon: "wind" },
  { name: "Zod", slug: "zod" },
  { name: "Zustand", icon: "paw-print" },
  // BackEnd
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "SQL", icon: "database" },
  { name: "Postgres", slug: "postgresql" },
  { name: "Drizzle", slug: "drizzle" },
  { name: "Supabase", slug: "supabase" },
  { name: "Strapi", slug: "strapi" },
  // Herramientas
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github" },
  { name: "Docker", slug: "docker" },
  { name: "TeamCity", slug: "teamcity" },
  { name: "Slack", icon: "message-square" },
  { name: "Figma", slug: "figma" },
];
