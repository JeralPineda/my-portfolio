# Imágenes del hero

Tres tarjetas rotadas en el collage del hero. La posición, rotación y caption de
cada una se definen en el array `cards` de `src/components/HeroCollage.astro`.

| Archivo      | Contenido             | Dimensiones            | Caption            | Origen                     |
| ------------ | --------------------- | ---------------------- | ------------------ | -------------------------- |
| `card-1.jpg` | Escritorio con código | 900 × 700 (horizontal) | "mi setup"         | Unsplash — **placeholder** |
| `card-2.jpg` | Playa                 | 700 × 900 (vertical)   | "fuera del código" | Foto propia                |
| `card-3.jpg` | Desarrollo móvil      | 900 × 700 (horizontal) | "React Native"     | Unsplash — **placeholder** |

## Alternativa guardada

`card-2-alt-tikal.jpg` (700 × 900) es la otra foto propia — Tikal. No se usa hoy;
está guardada para poder cambiar sin volver a recortar. Para activarla:

```bash
# desde la raíz del proyecto
cp src/assets/hero/card-2.jpg          /tmp/card-2-playa.jpg   # respaldo de la actual
cp src/assets/hero/card-2-alt-tikal.jpg src/assets/hero/card-2.jpg
pnpm astro dev stop && rm -rf node_modules/.astro && pnpm dev
```

El borrado de `node_modules/.astro` es necesario: Astro cachea las imágenes
optimizadas por ruta, así que reemplazar el archivo sin limpiar la caché sigue
sirviendo la versión vieja. En el navegador hace falta además un hard reload
(`cmd+shift+R`), porque la URL de `/_image` no cambia.

Los originales sin recortar están en `resources/fuera del codigo 1.JPG` (Tikal) y
`resources/fuera del codigo 2.JPG` (playa).

## Al reemplazar cualquiera

- Respetá la orientación del slot (`card-2` es la vertical del centro).
- Mismo nombre de archivo y extensión `.jpg`; Astro genera WebP y los tamaños
  responsive automáticamente.
- Recorte al tamaño del slot:
  ```bash
  ffmpeg -i entrada.JPG -vf "scale=700:900:force_original_aspect_ratio=increase,crop=700:900" -q:v 3 salida.jpg
  ```

## Pendiente

`card-1.jpg` y `card-3.jpg` siguen siendo fotos de stock de Unsplash. Cuando
tengas propias, reemplazalas y ajustá los captions si hace falta.
