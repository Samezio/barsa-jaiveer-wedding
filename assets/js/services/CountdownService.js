const SECOND = 1000;
const UNITS = [
  { key: 'days', ms: 24 * 60 * 60 * SECOND },
  { key: 'hours', ms: 60 * 60 * SECOND },
  { key: 'minutes', ms: 60 * SECOND },
  { key: 'seconds', ms: SECOND },
];

export class CountdownService {
  /**
   * @param {string} startsAt ISO 8601 timestamp with offset
   * @param {{ rootSelector?: string, onFinish?: () => void }} options
   */
  constructor(startsAt, { rootSelector = '#countdown', onFinish } = {}) {
    this.target = new Date(startsAt).getTime();
    this.rootSelector = rootSelector;
    this.onFinish = onFinish;
    this.timer = null;
  }

  /** Runs after components mount, so the node is guaranteed to exist. */
  init() {
    this.root = document.querySelector(this.rootSelector);
    if (!this.root || Number.isNaN(this.target)) return;
    this.cells = Object.fromEntries(
      UNITS.map(({ key }) => [key, this.root.querySelector(`[data-unit="${key}"] .countdown__value`)]),
    );
    this.tick();
    this.timer = window.setInterval(() => this.tick(), SECOND);
  }

  tick() {
    let remaining = this.target - Date.now();

    if (remaining <= 0) {
      this.stop();
      for (const { key } of UNITS) this.write(key, 0);
      this.root.dataset.finished = 'true';
      this.onFinish?.();
      return;
    }

    for (const { key, ms } of UNITS) {
      const value = Math.floor(remaining / ms);
      remaining -= value * ms;
      this.write(key, value);
    }
  }

  write(key, value) {
    const cell = this.cells?.[key];
    if (!cell) return;
    const text = String(value).padStart(2, '0');
    if (cell.textContent !== text) cell.textContent = text;
  }

  stop() {
    if (this.timer) window.clearInterval(this.timer);
    this.timer = null;
  }
}
