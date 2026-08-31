/**
 * Selector de tema. El script inline del <head> ya resolvió y aplicó el tema
 * antes del primer pintado; aquí solo vive lo que necesita interacción: el
 * grupo de radios, la persistencia y la sincronización entre pestañas.
 *
 * El sitio es claro por defecto y no consulta `prefers-color-scheme`: el
 * oscuro es una elección explícita del visitante.
 */
type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const THEMES: Theme[] = ["light", "dark"];
/** Ventana en la que los colores cruzan de un tema a otro. */
const SWITCH_MS = 260;

function readTheme(): Theme {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    /* Safari en modo privado puede lanzar; se cae al claro. */
  }
  return stored === "dark" ? "dark" : "light";
}

function storeTheme(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* Sin almacenamiento el tema simplemente no sobrevive a la recarga. */
  }
}

/** Escribe el tema en el <html>; el resto del CSS cuelga de este atributo. */
function paint(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document
    .getElementById("theme-color")
    ?.setAttribute("content", theme === "dark" ? "#0e0e0e" : "#ebebeb");
}

class ThemeSwitch {
  private readonly options: HTMLButtonElement[];
  private switchTimer: number | undefined;

  constructor(private readonly root: HTMLElement) {
    this.options = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-theme-choice]"));

    this.options.forEach((option) => {
      option.addEventListener("click", () => this.select(this.themeOf(option), { animate: true }));
    });
    this.root.addEventListener("keydown", this.onKeyDown);

    this.sync(readTheme());
  }

  private themeOf(option: HTMLButtonElement): Theme {
    return option.dataset.themeChoice === "dark" ? "dark" : "light";
  }

  /** Solo el árbol de accesibilidad: lo visual ya lo resolvió el CSS. */
  sync(theme: Theme): void {
    this.options.forEach((option) => {
      const active = this.themeOf(option) === theme;
      option.setAttribute("aria-checked", String(active));
      option.tabIndex = active ? 0 : -1;
    });
  }

  select(theme: Theme, { animate = false, focus = false } = {}): void {
    if (animate) this.animateSwitch();
    storeTheme(theme);
    paint(theme);
    this.sync(theme);
    if (focus) this.options.find((o) => this.themeOf(o) === theme)?.focus();
  }

  /** Cruza los colores durante un momento, en vez de saltar de golpe. */
  private animateSwitch(): void {
    const root = document.documentElement;
    root.classList.add("theme-switching");
    window.clearTimeout(this.switchTimer);
    this.switchTimer = window.setTimeout(() => {
      root.classList.remove("theme-switching");
    }, SWITCH_MS);
  }

  /** Navegación estándar de radiogroup: flechas, Home y End. */
  private onKeyDown = (event: KeyboardEvent): void => {
    const current = THEMES.indexOf(readTheme());
    let next = current;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = (current + 1) % THEMES.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = (current - 1 + THEMES.length) % THEMES.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = THEMES.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    this.select(THEMES[next]!, { animate: true, focus: true });
  };
}

export function initTheme(root: ParentNode = document): void {
  const switches = Array.from(root.querySelectorAll<HTMLElement>("[data-theme-switch]")).map(
    (element) => new ThemeSwitch(element),
  );

  // Mantener las pestañas abiertas de acuerdo entre sí.
  window.addEventListener("storage", (event) => {
    if (event.key !== null && event.key !== STORAGE_KEY) return;
    const theme = readTheme();
    paint(theme);
    switches.forEach((instance) => instance.sync(theme));
  });
}
