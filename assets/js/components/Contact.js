import { Component } from '../core/Component.js';
import { el, icon } from '../core/dom.js';

export class Contact extends Component {
  render() {
    const { kicker, heading, people } = this.data;

    return el('section', { class: 'section contact', id: 'contact', dataset: { reveal: '' } }, [
      kicker && el('p', { class: 'section__kicker', text: kicker }),
      el('h2', { class: 'section__title section__title--sm', text: heading }),
      el('ul', { class: 'contact__list' }, people.map((person) => this.person(person))),
    ]);
  }

  person(person) {
    const numbers = person.phones ?? [person.phone].filter(Boolean);

    return el('li', { class: 'contact__item' }, [
      person.side && el('span', { class: 'contact__side', text: person.side }),
      el('span', { class: 'contact__name', text: person.name }),
      el(
        'div',
        { class: 'contact__numbers' },
        numbers.map((number) =>
          el('a', { class: 'contact__phone', href: `tel:+${String(number).replace(/\D/g, '')}` }, [
            icon('phone', 'contact__icon'),
            number,
          ]),
        ),
      ),
      person.detail && el('span', { class: 'contact__detail', text: person.detail }),
    ]);
  }
}
