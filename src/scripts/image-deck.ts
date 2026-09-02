/**
 * Stacked screenshot deck. The stack only moves when the visitor asks it to:
 * the front card can be flicked away with the mouse or a finger, and the dots
 * below give the keyboard-accessible equivalent, since a drag gesture alone is
 * not operable without a pointer. The dots are also the only visible hint that
 * there is more than one screenshot, so they stay even when a pointer is used.
 */
const DRAG_THRESHOLD = 70;

/** Depth 0 is the front card; each card behind is nudged back, down and rotated. */
function transformForDepth(depth: number): string {
  if (depth === 0) return "translate3d(0,0,0) rotate(0deg) scale(1)";
  return `translate3d(${depth * 22}px, ${depth * -14}px, 0) rotate(${depth * 2.4}deg) scale(${
    1 - depth * 0.05
  })`;
}

class Deck {
  private readonly cards: HTMLElement[];
  private readonly dots: HTMLButtonElement[];
  private readonly total: number;
  private front = 0;
  private dragging = false;
  private pointerId: number | null = null;
  private startX = 0;
  private startY = 0;

  constructor(private readonly root: HTMLElement) {
    this.cards = Array.from(root.querySelectorAll<HTMLElement>("[data-deck-card]"));
    this.dots = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-deck-dot]"));
    this.total = this.cards.length;

    if (this.total < 2) return;

    this.render();
    this.bind();
  }

  /** Position every card according to its distance from the front of the stack. */
  private render(animate = true): void {
    this.cards.forEach((card, index) => {
      const depth = (index - this.front + this.total) % this.total;
      card.style.transition = animate ? "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)" : "none";
      card.style.transform = transformForDepth(depth);
      card.style.zIndex = String(this.total - depth);
      card.style.opacity = "1";
      // Only the visible front card is reachable by assistive tech / tab order.
      card.setAttribute("aria-hidden", depth === 0 ? "false" : "true");
    });

    this.dots.forEach((dot, index) => {
      dot.setAttribute("aria-selected", index === this.front ? "true" : "false");
    });
  }

  private goTo(index: number): void {
    this.front = ((index % this.total) + this.total) % this.total;
    this.render();
  }

  private bind(): void {
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goTo(index));
      dot.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          this.goTo(this.front + 1);
          this.dots[this.front]?.focus();
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          this.goTo(this.front - 1);
          this.dots[this.front]?.focus();
        }
      });
    });

    this.root.addEventListener("pointerdown", this.onPointerDown);
    this.root.addEventListener("pointermove", this.onPointerMove);
    this.root.addEventListener("pointerup", this.onPointerUp);
    this.root.addEventListener("pointercancel", this.onPointerUp);
  }

  private frontCard(): HTMLElement | undefined {
    return this.cards[this.front];
  }

  private readonly onPointerDown = (event: PointerEvent): void => {
    const card = this.frontCard();
    if (!card || !card.contains(event.target as Node)) return;
    this.dragging = true;
    this.pointerId = event.pointerId;
    this.startX = event.clientX;
    this.startY = event.clientY;
    card.setPointerCapture(event.pointerId);
    card.style.transition = "none";
  };

  private readonly onPointerMove = (event: PointerEvent): void => {
    if (!this.dragging || event.pointerId !== this.pointerId) return;
    const card = this.frontCard();
    if (!card) return;
    const dx = event.clientX - this.startX;
    const dy = event.clientY - this.startY;
    card.style.transform = `translate3d(${dx}px, ${dy * 0.35}px, 0) rotate(${dx * 0.045}deg) scale(1)`;
  };

  private readonly onPointerUp = (event: PointerEvent): void => {
    if (!this.dragging || event.pointerId !== this.pointerId) return;
    const card = this.frontCard();
    this.dragging = false;
    this.pointerId = null;
    if (!card) return;

    const dx = event.clientX - this.startX;
    if (Math.abs(dx) > DRAG_THRESHOLD) {
      // Fling the card off before it reappears at the back of the stack.
      card.style.transition = "transform 280ms ease-out, opacity 280ms ease-out";
      card.style.transform = `translate3d(${dx > 0 ? 480 : -480}px, 40px, 0) rotate(${
        dx > 0 ? 18 : -18
      }deg) scale(0.95)`;
      card.style.opacity = "0";
      window.setTimeout(() => {
        this.front =
          dx > 0 ? (this.front + 1) % this.total : (this.front - 1 + this.total) % this.total;
        card.style.transition = "none";
        this.render(false);
        // Re-enable transitions on the next frame so later moves animate.
        requestAnimationFrame(() => this.render(true));
      }, 280);
    } else {
      this.render();
    }
  };
}

export function initImageDecks(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>("[data-image-deck]").forEach((el) => new Deck(el));
}
