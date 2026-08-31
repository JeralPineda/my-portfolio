export interface Position {
  company: string;
  role: string;
  location: string;
  period: string;
  current?: boolean;
  /** Prose summary of the role, one paragraph per idea. */
  summary: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export const positions: Position[] = [
  {
    company: "BANHCAFE",
    role: "Desarrollador Front-End",
    location: "Tegucigalpa, Honduras",
    period: "Septiembre 2022 — Actual",
    current: true,
    summary: [
      "Soy responsable del front-end de los productos digitales del banco, tanto web como móvil. Diseñé y construí desde cero Aurora, el back office administrativo que usan a diario los equipos internos, y MIA, el sistema que centraliza permisos, roles y accesos de Aurora y del resto de aplicaciones del banco.",
      "En móvil llevo BANHCAFE Online y la Token App: migré ambas a las versiones actuales de Expo y a la nueva arquitectura de React Native, integré notificaciones push y gestión de dispositivos de confianza, y consolidé el Token dentro de la app principal para que el cliente ya no necesite dos aplicaciones para autenticarse.",
      "En web mantengo la banca en línea y el sitio institucional construido con Next.js y Strapi, donde trabajo tanto funcionalidad nueva como rendimiento, SEO y la gestión de contenido que usa el equipo de mercadeo.",
      "Transversalmente me encargo de las integraciones con APIs REST y los mecanismos de autenticación, coordinando con Backend, QA y Producto. También reviso código y doy acompañamiento técnico a desarrolladores junior y a estudiantes en práctica profesional.",
    ],
  },
];

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
      "GSAP",
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
    items: ["Git", "GitHub", "Azure DevOps", "Docker", "TeamCity (CI/CD)", "Figma", "Slack"],
  },
];
