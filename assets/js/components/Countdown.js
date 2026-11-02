import { Component } from '../core/Component.js';
import { el } from '../core/dom.js';

const DEFAULT_LABELS = { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' };

export class Countdown extends Component {
  render() {
    const { heading, finishedLabel, labels } = this.data;
    const text = { ...DEFAULT_LABELS, ...labels };

    return el('section', { class: 'section countdown-section', dataset: { reveal: '' } }, [
      heading && el('p', { class: 'section__kicker', text: heading }),
      el(
        'div',
        { class: 'countdown', id: 'countdown', role: 'timer', 'aria-live': 'off' },
        Object.keys(DEFAULT_LABELS).map((key) =>
          el('div', { class: 'countdown__cell', dataset: { unit: key } }, [
            el('span', { class: 'countdown__value', text: '00' }),
            el('span', { class: 'countdown__label', text: text[key] }),
          ]),
        ),
      ),
      finishedLabel && el('p', { class: 'countdown__finished', text: finishedLabel }),
    ]);
  }
}
