import { Component } from '../core/Component.js';
import { el, icon } from '../core/dom.js';

const DEFAULT_LABELS = {
  name: 'Name',
  phone: 'Phone No.',
  guests: 'Number of guests',
  side: 'Which side are you joining us from?',
  message: 'A note for the couple (optional)',
};

export class Rsvp extends Component {
  render() {
    const { kicker, heading, blurb, sides, submitLabel, labels } = this.data;
    this.labels = { ...DEFAULT_LABELS, ...labels };

    return el('section', { class: 'section rsvp', id: 'rsvp', dataset: { reveal: '' } }, [
      kicker && el('p', { class: 'section__kicker', text: kicker }),
      el('h2', { class: 'section__title', text: heading }),
      icon('divider', 'divider'),
      blurb && el('p', { class: 'rsvp__blurb', text: blurb }),
      el('form', { class: 'rsvp__form', id: 'rsvp-form' }, [
        this.field({ name: 'name', type: 'text', required: true, autocomplete: 'name' }),
        this.field({ name: 'phone', type: 'tel', required: true, autocomplete: 'tel', pattern: '[0-9+\-\s()]{6,20}' }),
        this.field({ name: 'guests', type: 'number', min: '1', max: '20' }),
        this.sideChoice(sides),
        this.field({ name: 'message', type: 'textarea' }),
        el('button', { class: 'button button--solid', type: 'submit', text: submitLabel }),
        el('p', { class: 'rsvp__status', dataset: { rsvpStatus: '' }, role: 'status', 'aria-live': 'polite' }),
      ]),
    ]);
  }

  field({ name, type, required, ...attrs }) {
    const id = `rsvp-${name}`;
    const control =
      type === 'textarea'
        ? el('textarea', { class: 'field__control', id, name, rows: '3', required, ...attrs })
        : el('input', { class: 'field__control', id, name, type, required, ...attrs });

    return el('div', { class: 'field' }, [
      el('label', { class: 'field__label', for: id, text: this.labels[name] }),
      control,
    ]);
  }

  sideChoice(sides) {
    return el('fieldset', { class: 'field field--choice' }, [
      el('legend', { class: 'field__label', text: this.labels.side }),
      el(
        'div',
        { class: 'choice' },
        sides.map((side, index) =>
          el('label', { class: 'choice__option' }, [
            el('input', { type: 'radio', name: 'side', value: side, required: true, checked: index === 0 }),
            el('span', { text: side }),
          ]),
        ),
      ),
    ]);
  }
}
