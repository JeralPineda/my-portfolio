import aurora1 from "@/assets/projects/aurora-1.png";
import aurora2 from "@/assets/projects/aurora-2.png";
import aurora3 from "@/assets/projects/aurora-3.png";
import mia1 from "@/assets/projects/mia-1.png";
import mia2 from "@/assets/projects/mia-2.png";
import mia3 from "@/assets/projects/mia-3.png";
import site1 from "@/assets/projects/banhcafe-site-1.png";
import site2 from "@/assets/projects/banhcafe-site-2.png";
import site3 from "@/assets/projects/banhcafe-site-3.png";
import onlineWeb from "@/assets/projects/banhcafe-online-web.png";

export interface ProjectLink {
  label: string;
  url: string;
  /** Renders the matching store glyph before the label. */
  store?: "apple" | "google";
}

/** A phone screen recording, rendered inside a CSS phone frame. */
export interface VideoMedia {
  kind: "video";
  src: string;
  /** Aspect ratio of the source recording, used to size the frame. */
  aspect: string;
  alt: string;
}

/** One or more screenshots. A single image renders flat; two or more become a deck. */
export interface GalleryMedia {
  kind: "gallery";
  images: { src: ImageMetadata; alt: string }[];
}

export type ProjectMedia = VideoMedia | GalleryMedia;

export interface Project {
  slug: string;
  client: string;
  /** Short label for compact contexts such as the footer nav. */
  name: string;
  title: string;
  description: string;
  tags: string[];
  media: ProjectMedia;
  links: ProjectLink[];
  /** Internal tooling with no public URL — renders a badge instead of a dead button. */
  internal?: boolean;
}

export const projects: Project[] = [
  {
    slug: "aurora",
    client: "BANHCAFE",
    name: "Aurora",
    title: "AURORA",
    description:
      "Sistema web interno que centraliza la operación administrativa del banco: RRHH y nómina, contabilidad, créditos y cobranzas, banca, préstamos, cumplimiento, auditoría y seguridad, bajo un único panel privado con autenticación y control de permisos por pantalla. Lo estructuré como una app modular por dominio de negocio —cada uno con sus rutas, formularios, tablas y llamadas a API— para reemplazar procesos manuales y legacy con flujos digitales trazables.",
    tags: ["React", "TypeScript", "Redux Toolkit", "RTK Query", "DevExtreme"],
    media: {
      kind: "gallery",
      images: [
        {
          src: aurora1,
          alt: "Pantalla de inicio de Aurora con los módulos por departamento",
        },
        { src: aurora2, alt: "Módulo de gestión de usuarios de Aurora" },
        {
          src: aurora3,
          alt: "Vista de administración de roles y permisos en Aurora",
        },
      ],
    },
    links: [],
    internal: true,
  },
  {
    slug: "banhcafe-online",
    client: "BANHCAFE",
    name: "BANHCAFE Online",
    title: "BANHCAFE Online App",
    description:
      "Migré la app de Expo SDK 51 a SDK 54, integrando notificaciones push y gestión de dispositivos de confianza. Además consolidé el Token dentro de la app, eliminando la necesidad de una aplicación aparte para autenticarse.",
    tags: ["React Native", "Expo", "TypeScript", "Push Notifications", "Seguridad"],
    media: {
      kind: "video",
      src: "/videos/banhcafe-online.mp4",
      aspect: "1180 / 2556",
      alt: "Grabación de pantalla de la app BANHCAFE Online mostrando el flujo de banca móvil",
    },
    links: [
      {
        label: "App Store",
        store: "apple",
        url: "https://apps.apple.com/us/app/banhcafe-online/id6449547967",
      },
      {
        label: "Google Play",
        store: "google",
        url: "https://play.google.com/store/apps/details?id=com.jmacbhc.BANHCAFEMobileApp&hl=es_419",
      },
    ],
  },
  {
    slug: "mia",
    client: "BANHCAFE",
    name: "MIA",
    title: "MIA",
    description:
      "Plataforma empresarial que centraliza la administración de usuarios, políticas y permisos de Aurora y del resto de aplicaciones del banco, reduciendo el tiempo de gestión de accesos y mejorando la seguridad operativa. La construí con una arquitectura orientada a features, para que el sistema fuera escalable, mantenible y estable en producción.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "IAM", "Seguridad"],
    media: {
      kind: "gallery",
      images: [
        { src: mia1, alt: "Pantalla de inicio de sesión de MIA" },
        { src: mia2, alt: "Gestión de permisos y roles en MIA" },
        {
          src: mia3,
          alt: "Administración de perfiles y sitios conectados en MIA",
        },
      ],
    },
    links: [],
    internal: true,
  },
  {
    slug: "banhcafe-token",
    client: "BANHCAFE",
    name: "BANHCAFE Token",
    title: "BANHCAFE Token App",
    description:
      "Migré la Token App a Expo con la nueva arquitectura de React Native, añadiendo soporte multiusuario y optimizando los flujos de seguridad y autenticación, además del rendimiento y los tiempos de compilación.",
    tags: ["React Native", "Expo", "New Architecture", "TypeScript", "OTP"],
    media: {
      kind: "video",
      src: "/videos/banhcafe-token.mp4",
      aspect: "1180 / 2556",
      alt: "Grabación de pantalla de la app BANHCAFE Token mostrando la generación de códigos",
    },
    links: [
      {
        label: "App Store",
        store: "apple",
        url: "https://apps.apple.com/us/app/banhcafe-token/id6449266694",
      },
      {
        label: "Google Play",
        store: "google",
        url: "https://play.google.com/store/apps/details?id=com.banhcafetokenapp2&hl=es_419",
      },
    ],
  },
  {
    slug: "banhcafe-online-web",
    client: "BANHCAFE",
    name: "BANHCAFE Online Web",
    title: "BANHCAFE Online Web",
    description:
      "Desarrollé y mantuve la banca en línea web, implementando nuevas funcionalidades y ampliando los servicios digitales disponibles para los clientes del banco.",
    tags: ["React", "TypeScript", "REST APIs", "Banca en línea"],
    media: {
      kind: "gallery",
      images: [
        {
          src: onlineWeb,
          alt: "Pantalla de inicio de sesión de BANHCAFE Online Web",
        },
      ],
    },
    links: [{ label: "Ver sitio", url: "https://online.banhcafe.hn/" }],
  },
  {
    slug: "banhcafe-site",
    client: "BANHCAFE",
    name: "Sitio institucional",
    title: "Sito Institucional",
    description:
      "Lideré el mantenimiento y desarrollo del sitio institucional con Next.js y Strapi, optimizando el rendimiento, el SEO y la gestión de contenido para el equipo de mercadeo.",
    tags: ["Next.js", "Strapi", "TypeScript", "SEO", "CMS"],
    media: {
      kind: "gallery",
      images: [
        { src: site1, alt: "Portada del sitio institucional de BANHCAFE" },
        {
          src: site2,
          alt: "Sección de productos del sitio institucional de BANHCAFE",
        },
        {
          src: site3,
          alt: "Página interna del sitio institucional de BANHCAFE",
        },
      ],
    },
    links: [{ label: "Ver sitio", url: "https://www.banhcafe.hn/" }],
  },
];
