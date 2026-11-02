import { Component } from '../core/Component.js';
import { el, icon } from '../core/dom.js';

export class CoverGate extends Component {
  render() {
    const { monogram, hint, kicker } = this.data;

    const door = (side) =>
      el('div', { class: `cover__door cover__door--${side}`, 'aria-hidden': 'true' }, [
        el('div', { class: 'cover__door-inlay' }, [icon('flourish', 'cover__door-ornament')]),
      ]);

    return el('div', { class: 'cover', id: 'cover' }, [
      el('div', { class: 'cover__doors' }, [door('left'), door('right')]),
      el('button', { class: 'cover__seal', type: 'button', dataset: { action: 'open' }, 'aria-label': hint }, [
        el('span', { class: 'cover__seal-ring' }, [
          el('span', { class: 'cover__seal-monogram', text: monogram }),
        ]),
        el('span', { class: 'cover__ribbon cover__ribbon--left', 'aria-hidden': 'true' }),
        el('span', { class: 'cover__ribbon cover__ribbon--right', 'aria-hidden': 'true' }),
      ]),
      el('div', { class: 'cover__caption' }, [
        kicker && el('p', { class: 'cover__kicker', text: kicker }),
        el('p', { class: 'cover__hint', text: hint }),
      ]),
    ]);
  }
}
