# Portfolio — Jeral Pineda

Portfolio personal construido con **Astro**, **Tailwind CSS 4** y **TypeScript**.
El diseño está basado en [junhyungpark.com](https://junhyungpark.com/).

Código y estructura de carpetas en inglés; el contenido visible en español.

## Requisitos

- Node.js >= 22.12
- pnpm

## Comandos

| Comando        | Qué hace                                      |
| -------------- | --------------------------------------------- |
| `pnpm install` | Instala dependencias                          |
| `pnpm dev`     | Servidor de desarrollo en `localhost:4321`    |
| `pnpm build`   | `astro check` + build de producción a `dist/` |
| `pnpm preview` | Sirve el build de producción                  |
| `pnpm check`   | Solo diagnóstico de TypeScript/Astro          |

## Estructura

```
src/
  data/            Contenido tipado (proyectos, experiencia, datos del sitio)
  components/      Componentes .astro
  scripts/         TS del lado del cliente (deck de imágenes, lazy video)
  styles/          Tokens de diseño (@theme) y @font-face
  assets/          Imágenes procesadas por astro:assets
public/            Archivos servidos tal cual (CV, videos, iconos)
```

### Dónde editar qué

- **Proyectos** → `src/data/projects.ts`
- **Experiencia, educación y stack** → `src/data/experience.ts`
- **Nombre, email, links, CV** → `src/data/site.ts`
- **Paleta y tipografías** → `src/styles/global.css` (bloque `@theme`)

## Media

### Imágenes

Las capturas viven en `src/assets/projects/`. Astro genera WebP y los tamaños
responsive en el build, así que se pueden reemplazar sin tocar código mientras
se mantenga el nombre del archivo.

Las fotos del hero viven en `src/assets/hero/` y son propias — ver
[`src/assets/hero/README.md`](src/assets/hero/README.md) para el recorte de cada
slot y los originales.

### Videos

Las versiones que usa el sitio están en `public/videos/`, en H.264 400×866 sin
audio (1.7 MB y 714 KB). Las grabaciones originales en HEVC ya no están en el
repo — para regenerar hay que volver a grabar la pantalla.

El comando, si hace falta rehacerlas desde una grabación nueva (`ffmpeg`,
`brew install ffmpeg`):

```bash
ffmpeg -y -i grabacion.MOV \
  -vf "scale=400:-2" \
  -c:v libx264 -crf 30 -preset slow -profile:v main -pix_fmt yuv420p \
  -an -movflags +faststart \
  public/videos/banhcafe-online.mp4

# Poster (primer frame) que se muestra mientras el video carga
ffmpeg -y -ss 1 -i public/videos/banhcafe-online.mp4 -frames:v 1 -q:v 4 \
  public/videos/banhcafe-online-poster.jpg
```

`-an` quita el audio y `-crf 30` controla la calidad (más bajo = mejor y más pesado).

## Notas de implementación

- **Cero JavaScript de framework.** Las interacciones (baraja de capturas,
  slider del hero y autoplay de videos) son TypeScript plano que Astro inlinea
  en el HTML.
- **Los videos no se descargan hasta que el marco del teléfono entra en viewport**
  (`IntersectionObserver` en `src/scripts/lazy-video.ts`), y se pausan al salir.
- **La baraja de capturas no rota sola.** Solo avanza con el gesto de arrastre
  o con un clic en los indicadores, así que no compite por la atención mientras
  se lee la descripción del proyecto.
- **`prefers-reduced-motion`** desactiva el autoplay del video; en ese caso el
  video muestra controles.
- **Solo tema claro.** Los colores son variables CSS en `@theme`, así que agregar
  modo oscuro es redefinirlas, no reescribir componentes.
- **Fuentes**: solo se declaran los subsets latin y latin-ext
  (`src/styles/fonts.css`), ya que el sitio está en español.
