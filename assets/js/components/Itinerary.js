import { Component } from '../core/Component.js';
import { el, icon } from '../core/dom.js';

export class Itinerary extends Component {
  render() {
    const { heading, days } = this.data;

    return el('section', { class: 'section itinerary', id: 'itinerary', dataset: { reveal: '' } }, [
      el('h2', { class: 'section__title', text: heading }),
      icon('divider', 'divider'),
      el('div', { class: 'itinerary__days' }, days.map((day) => this.day(day))),
    ]);
  }

  day(day) {
    return el('div', { class: 'itinerary__day', dataset: { reveal: '' } }, [
      el('h3', { class: 'itinerary__day-label', text: day.label }),
      el('ol', { class: 'timeline' }, day.entries.map((entry) => this.entry(entry))),
    ]);
  }

  entry(entry) {
    const title = entry.mapUrl
      ? el('a', { class: 'timeline__title timeline__title--link', href: entry.mapUrl, target: '_blank', rel: 'noopener' }, [
          entry.title,
          icon('pin', 'timeline__pin'),
        ])
      : el('span', { class: 'timeline__title', text: entry.title });

    return el('li', { class: 'timeline__item' }, [
      el('span', { class: 'timeline__time', text: entry.time }),
      el('span', { class: 'timeline__marker', 'aria-hidden': 'true' }),
      el('div', { class: 'timeline__body' }, [title, entry.note && el('p', { class: 'timeline__note', text: entry.note })]),
    ]);
  }
}
