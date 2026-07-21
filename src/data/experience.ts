export interface Experience {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  achievements: string[];
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    company: "BANHCAFE",
    role: "Desarrollador Front-End",
    location: "Tegucigalpa, Honduras",
    startDate: "Septiembre 2022",
    endDate: "Actualidad",
    highlights: [
      "Diseñé y desarrollé Aurora y colaboré en MIA, construyendo soluciones para gestionar clientes, usuarios, roles, permisos y accesos de aplicaciones internas.",
      "Mantuve la banca móvil y migré BANHCAFE Token App a Expo con la nueva arquitectura de React Native, soporte multiusuario y mejoras de rendimiento, seguridad y autenticación.",
      "Lideré el sitio web institucional con Next.js y Strapi, optimizando rendimiento, SEO y gestión de contenido, además de desarrollar landing pages internas.",
      "Colaboré con QA y backend en pruebas, APIs REST y autenticación; también revisé código, guié desarrolladores junior y mentoricé estudiantes en práctica profesional.",
    ],
    achievements: [
      "Diseñé y desarrollé Aurora, el Back Office administrativo del banco, incorporando módulos para la gestión de clientes, usuarios internos, roles, permisos y operaciones departamentales.",
      "Colaboré en el desarrollo de MIA, un sistema independiente que centraliza la gestión de permisos y accesos para Aurora y otras aplicaciones internas.",
      "Mantuve y desarrollé nuevas funcionalidades para la aplicación de banca móvil, mejorando la accesibilidad y la experiencia del usuario.",
      "Migré BANHCAFE Token App a Expo con la nueva arquitectura de React Native, integrando soporte multiusuario, optimizando el rendimiento y mejorando los flujos de seguridad y autenticación.",
      "Lideré el mantenimiento y desarrollo del sitio web institucional con Next.js y Strapi, optimizando el rendimiento, SEO y las actualizaciones de contenido.",
      "Colaboré con el equipo de QA para planificar pruebas, prevenir errores y asegurar la calidad antes de los despliegues.",
      "Desarrollé landing pages internas para uso informativo dentro de la institución.",
      "Revisé y aprobé código de desarrolladores junior, brindando guía en la implementación de nuevas funcionalidades.",
      "Implementé APIs REST y mecanismos de autenticación modernos, colaborando con el equipo de backend para garantizar una integración segura y eficiente.",
      "Mentoricé estudiantes en práctica profesional y contribuí a mejoras de procesos y a la evolución de la estrategia técnica.",
    ],
  },
];
