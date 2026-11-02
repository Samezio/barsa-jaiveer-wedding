import { qs } from './dom.js';

/**
 * Composition root. Mounts components onto placeholder nodes and then starts
 * services, so behaviour never has to guess whether the DOM exists yet.
 */
export class App {
  constructor() {
    this.components = new Map();
    this.services = [];
  }

  register(slotSelector, component) {
    this.components.set(slotSelector, component);
    return this;
  }

  use(service) {
    this.services.push(service);
    return this;
  }

  start() {
    for (const [selector, component] of this.components) {
      const slot = qs(selector);
      if (!slot) continue;
      if (component.isEmpty()) slot.remove();
      else component.mount(slot);
    }
    for (const service of this.services) service.init?.();
    document.documentElement.dataset.ready = 'true';
    return this;
  }
}
