export interface Position {
  company: string;
  role: string;
  location: string;
  period: string;
  current?: boolean;
  /** Resumen del puesto en un solo párrafo: es lo que se despliega en el acordeón. */
  summary: string;
}

export const positions: Position[] = [
  {
    company: "BANHCAFE",
    role: "Desarrollador Front-End",
    location: "Tegucigalpa, Honduras",
    period: "Septiembre 2022 — Actual",
    current: true,
    summary:
      "Soy responsable del front-end de los productos digitales del banco, tanto web como móvil. Diseñé y construí desde cero Aurora, el back office administrativo que usan a diario los equipos internos, y MIA, el sistema que centraliza permisos, roles y accesos del resto de aplicaciones. En móvil llevo BANHCAFE Online y la Token App: las migré a las versiones actuales de Expo y a la nueva arquitectura de React Native, integré notificaciones push y dispositivos de confianza, y consolidé el Token dentro de la app principal. En web mantengo la banca en línea y el sitio institucional en Next.js y Strapi, cuidando funcionalidad, rendimiento, SEO y las integraciones con APIs REST y autenticación. También reviso código y doy acompañamiento técnico a desarrolladores junior y a estudiantes en práctica.",
  },
];
