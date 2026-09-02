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
      "Llevo el front-end de los productos digitales del banco, web y móvil. Construí desde cero Aurora, el back office administrativo, y MIA, el sistema de permisos y accesos del resto de aplicaciones. En móvil mantengo BANHCAFE Online y la Token App, migradas a Expo y a la nueva arquitectura de React Native; en web, la banca en línea y el sitio institucional en Next.js y Strapi. También reviso código y acompaño a desarrolladores junior.",
  },
];
