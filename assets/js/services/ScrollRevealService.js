/**
 * Fades sections in as they enter the viewport. Degrades to "everything
 * visible" when IntersectionObserver or motion is unavailable.
 */
export class ScrollRevealService {
  constructor({ selector = '[data-reveal]', threshold = 0.15 } = {}) {
    this.selector = selector;
    this.threshold = threshold;
  }

  init() {
    const nodes = [...document.querySelectorAll(this.selector)];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }

    this.observer = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: this.threshold, rootMargin: '0px 0px -8% 0px' },
    );

    nodes.forEach((node) => this.observer.observe(node));
  }
}
