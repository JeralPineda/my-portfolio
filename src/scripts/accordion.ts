/**
 * Acordeón. Lo visual —alto del panel y giro del "+"— lo resuelve el CSS a
 * partir de `aria-expanded`, así que aquí solo vive el estado: qué fila está
 * abierta, qué panel queda fuera del orden de tabulación y la navegación con
 * teclado entre cabeceras.
 *
 * Solo hay una fila abierta a la vez; volver a pulsar la abierta la cierra.
 */
class Accordion {
  private readonly triggers: HTMLButtonElement[];

  constructor(root: HTMLElement) {
    this.triggers = Array.from(
      root.querySelectorAll<HTMLButtonElement>("[data-accordion-trigger]"),
    );

    this.triggers.forEach((trigger, index) => {
      trigger.addEventListener("click", () => {
        this.toggle(index);
      });
      trigger.addEventListener("keydown", (event) => this.onKeyDown(event, index));
    });
  }

  private panelOf(trigger: HTMLButtonElement): HTMLElement | null {
    const id = trigger.getAttribute("aria-controls");
    return id ? document.getElementById(id) : null;
  }

  private toggle(index: number): void {
    const target = this.triggers[index];
    if (!target) return;
    const willOpen = target.getAttribute("aria-expanded") !== "true";

    this.triggers.forEach((trigger) => {
      const open = trigger === target && willOpen;
      trigger.setAttribute("aria-expanded", String(open));
      // El contenido colapsado no debe recibir foco ni leerse.
      this.panelOf(trigger)?.toggleAttribute("inert", !open);
    });
  }

  /** Navegación estándar de acordeón: flechas entre cabeceras, Home y End. */
  private onKeyDown(event: KeyboardEvent, index: number): void {
    const total = this.triggers.length;
    let next = index;

    switch (event.key) {
      case "ArrowDown":
        next = (index + 1) % total;
        break;
      case "ArrowUp":
        next = (index - 1 + total) % total;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = total - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    this.triggers[next]?.focus();
  }
}

export function initAccordions(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>("[data-accordion]").forEach((el) => new Accordion(el));
}
