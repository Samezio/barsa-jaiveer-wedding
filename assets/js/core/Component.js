/**
 * Minimal contract every section implements: build a DOM subtree from data.
 * Keeps rendering (components) separate from behaviour (services).
 */
export class Component {
  constructor(data = {}) {
    this.data = data;
    this.root = null;
  }

  /** A component whose config block is absent is dropped from the page. */
  isEmpty() {
    return !this.data;
  }

  /** @returns {HTMLElement} */
  render() {
    throw new Error(`${this.constructor.name} must implement render()`);
  }

  mount(target) {
    if (!target) return null;
    this.root = this.render();
    target.replaceWith(this.root);
    return this.root;
  }
}
