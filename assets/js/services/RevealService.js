/**
 * Owns the envelope gate: locks scrolling until the doors are opened,
 * then hands focus to the invitation body.
 */
export class RevealService {
  constructor({ gateSelector = '#cover', contentSelector = '#invitation', storageKey = null } = {}) {
    this.gateSelector = gateSelector;
    this.contentSelector = contentSelector;
    this.storageKey = storageKey;
    this.opened = false;
  }

  init() {
    this.gate = document.querySelector(this.gateSelector);
    this.content = document.querySelector(this.contentSelector);
    if (!this.gate || !this.content) return;

    document.body.dataset.gated = 'true';

    const trigger = this.gate.querySelector('[data-action="open"]') ?? this.gate;
    trigger.addEventListener('click', () => this.open());
    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.open();
      }
    });
  }

  open() {
    if (this.opened) return;
    this.opened = true;

    this.gate.dataset.open = 'true';
    document.body.dataset.gated = 'false';
    document.dispatchEvent(new CustomEvent('invitation:opened'));

    const done = () => {
      this.gate.setAttribute('hidden', '');
      this.content.removeAttribute('aria-hidden');
      this.content.querySelector('h1, [tabindex="-1"]')?.focus?.({ preventScroll: true });
    };

    const doors = this.gate.querySelector('.cover__doors');
    if (doors && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      doors.addEventListener('transitionend', done, { once: true });
      window.setTimeout(done, 2200);
    } else {
      done();
    }
  }
}
