/**
 * Hero collage on small screens. The desktop version overlaps the cards on a
 * stage; that reads as clutter on a phone, so here each photo gets the full
 * width and the track snaps one slide at a time. Dots below double as the
 * keyboard-operable control, since swiping alone is not.
 */
const AUTOPLAY_MS = 4200;
/** How long to leave autoplay off after the visitor swipes it themselves. */
const RESUME_DELAY_MS = 6000;

class HeroSlider {
  private readonly slides: HTMLElement[];
  private readonly dots: HTMLButtonElement[];
  private readonly reduceMotion: boolean;
  private index = 0;
  private paused = false;
  private timer: number | undefined;
  private resumeTimer: number | undefined;
  private syncQueued = false;

  constructor(
    private readonly root: HTMLElement,
    private readonly track: HTMLElement,
  ) {
    this.slides = Array.from(track.querySelectorAll<HTMLElement>("[data-hero-slide]"));
    this.dots = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-hero-dot]"));
    this.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (this.slides.length < 2) return;

    this.bind();
    this.start();
  }

  /** The track is `lg:hidden`, so on desktop it has no layout to scroll. */
  private get active(): boolean {
    return this.track.clientWidth > 0;
  }

  private goTo(index: number, smooth = true): void {
    const total = this.slides.length;
    this.index = ((index % total) + total) % total;
    this.track.scrollTo({
      left: this.index * this.track.clientWidth,
      behavior: smooth && !this.reduceMotion ? "smooth" : "auto",
    });
    this.paint();
  }

  private paint(): void {
    this.dots.forEach((dot, i) => {
      dot.setAttribute("aria-selected", i === this.index ? "true" : "false");
      dot.tabIndex = i === this.index ? 0 : -1;
    });
  }

  /** Scroll position is the source of truth — a swipe moves it without us. */
  private syncFromScroll(): void {
    if (this.syncQueued || !this.active) return;
    this.syncQueued = true;
    requestAnimationFrame(() => {
      this.syncQueued = false;
      const next = Math.round(this.track.scrollLeft / this.track.clientWidth);
      if (next !== this.index && next >= 0 && next < this.slides.length) {
        this.index = next;
        this.paint();
      }
    });
  }

  private start(): void {
    if (this.reduceMotion) return;
    this.stop();
    this.timer = window.setInterval(() => {
      if (this.paused || document.hidden || !this.active) return;
      this.goTo(this.index + 1);
    }, AUTOPLAY_MS);
  }

  private stop(): void {
    if (this.timer !== undefined) window.clearInterval(this.timer);
    this.timer = undefined;
  }

  /** Hand control back to the visitor, then pick autoplay up again later. */
  private hold(): void {
    this.paused = true;
    if (this.resumeTimer !== undefined) window.clearTimeout(this.resumeTimer);
    this.resumeTimer = window.setTimeout(() => {
      this.paused = false;
    }, RESUME_DELAY_MS);
  }

  private bind(): void {
    this.track.addEventListener("scroll", () => this.syncFromScroll(), { passive: true });
    this.track.addEventListener("pointerdown", () => this.hold(), { passive: true });
    this.track.addEventListener("touchstart", () => this.hold(), { passive: true });
    this.root.addEventListener("focusin", () => this.hold());

    this.dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        this.hold();
        this.goTo(i);
      });
      dot.addEventListener("keydown", (event) => {
        const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
        if (step === 0) return;
        event.preventDefault();
        this.hold();
        this.goTo(this.index + step);
        this.dots[this.index]?.focus();
      });
    });

    // A rotated phone keeps the same slide instead of landing between two.
    window.addEventListener("resize", () => {
      if (this.active) this.goTo(this.index, false);
    });

    this.paint();
  }
}

export function initHeroSlider(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>("[data-hero-slider]").forEach((el) => {
    const track = el.querySelector<HTMLElement>("[data-hero-track]");
    if (track) new HeroSlider(el, track);
  });
}
