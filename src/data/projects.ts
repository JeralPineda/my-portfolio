export interface Project {
  id: string;
  title: string;
  category: string;
  role: string;
  description: string;
  technologies: string[];
  image: string;
  imageAlt: string;
  status: "internal" | "public";
  theme: "blue" | "accent";
  links?: ProjectLink[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

export const projects: Project[] = [
  {
    id: "aurora",
    title: "Aurora",
    category: "Sistema interno · Back Office",
    role: "Diseño y desarrollo Front-End",
    description:
      "Back Office administrativo del banco con módulos para la gestión de clientes, usuarios internos, roles, permisos y operaciones departamentales.",
    technologies: ["React", "TypeScript", "REST APIs", "RBAC"],
    image: "/images/projects/aurora.svg",
    imageAlt:
      "Ilustración conceptual de un dashboard de back office administrativo",
    status: "internal",
    theme: "blue",
  },
  {
    id: "mia",
    title: "MIA",
    category: "Sistema interno · IAM",
    role: "Desarrollo Front-End",
    description:
      "Sistema independiente que centraliza la gestión de permisos y accesos para Aurora y otras aplicaciones internas de la institución.",
    technologies: ["React", "TypeScript", "IAM", "Autenticación"],
    image: "/images/projects/mia.svg",
    imageAlt:
      "Ilustración conceptual de un sistema centralizado de permisos y accesos",
    status: "internal",
    theme: "accent",
  },
  {
    id: "token-app",
    title: "BANHCAFE Token App",
    category: "Aplicación móvil · Seguridad",
    role: "Migración y desarrollo móvil",
    description:
      "Migración a Expo con la nueva arquitectura de React Native, incorporando soporte multiusuario y optimizaciones en rendimiento, seguridad y autenticación.",
    technologies: ["React Native", "Expo", "TypeScript", "Seguridad"],
    image: "/images/projects/token-app.svg",
    imageAlt:
      "Ilustración conceptual de dispositivos móviles con autenticación y token de seguridad",
    status: "public",
    theme: "accent",
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/banhcafe-token/id6449266694",
      },
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.banhcafetokenapp2&hl=es_419",
      },
    ],
  },
  {
    id: "mobile-banking",
    title: "Banca Móvil",
    category: "Aplicación móvil · Banca digital",
    role: "Mantenimiento y desarrollo Front-End",
    description:
      "Desarrollo de nuevas funcionalidades y mantenimiento continuo de la aplicación, mejorando la accesibilidad, los flujos y la experiencia de usuario.",
    technologies: ["React Native", "Accesibilidad", "UX", "REST APIs"],
    image: "/images/projects/mobile-banking.svg",
    imageAlt:
      "Ilustración conceptual de una aplicación móvil bancaria con balances y transferencias",
    status: "public",
    theme: "blue",
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/banhcafe-online/id6449547967",
      },
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.jmacbhc.BANHCAFEMobileApp&hl=es_419",
      },
    ],
  },
  {
    id: "institutional-web",
    title: "Sitio Institucional",
    category: "Plataforma web · CMS",
    role: "Liderazgo y desarrollo Front-End",
    description:
      "Mantenimiento y evolución del sitio institucional, optimizando rendimiento, SEO, publicación de contenido y la integración entre Next.js y Strapi.",
    technologies: ["Next.js", "Strapi", "SEO", "TypeScript"],
    image: "/images/projects/institutional-web.svg",
    imageAlt:
      "Ilustración conceptual de un sitio institucional y un panel de gestión de contenido",
    status: "public",
    theme: "accent",
    links: [
      {
        label: "Visitar sitio",
        url: "https://www.banhcafe.hn/",
      },
    ],
  },
];
