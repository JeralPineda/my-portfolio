/**
 * Reveals de entrada. Cada bloque marcado se muestra la primera vez que asoma
 * en pantalla y deja de observarse: la animación no se rebobina al subir,
 * porque anuncia que el contenido acaba de llegar y eso solo ocurre una vez.
 *
 * Lo que sí sigue atado al scroll es el parallax de las medias, pero ese vive
 * entero en CSS con `animation-timeline: view()` y no necesita JavaScript.
 *
 * El estado oculto lo aplica el CSS bajo `.js`, así que quien tenga JavaScript
 * desactivado ve el contenido tal cual, sin animación y sin bloques en blanco.
 */
/** Las variantes (`reveal-media`, `reveal-rule`) acompañan siempre a `reveal`. */
const SELECTOR = ".reveal";

/** Se dispara cuando el bloque ya asomó un poco, no al rozar el borde. */
const ROOT_MARGIN = "0px 0px -12% 0px";

function revealAll(targets: Iterable<Element>): void {
  for (const target of targets) target.classList.add("is-revealed");
}

export function initReveals(): void {
  const targets = document.querySelectorAll<HTMLElement>(SELECTOR);
  if (!targets.length) return;

  // Sin IntersectionObserver no hay forma barata de saber qué entró en
  // pantalla; se muestra todo de una vez antes que dejar contenido oculto.
  if (!("IntersectionObserver" in window)) {
    revealAll(targets);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: ROOT_MARGIN },
  );

  for (const target of targets) observer.observe(target);
}
