import { Component } from '../core/Component.js';
import { el, icon } from '../core/dom.js';

export class Functions extends Component {
  render() {
    const { heading, verse = [], items } = this.data;

    return el('section', { class: 'section functions', id: 'functions', dataset: { reveal: '' } }, [
      el('h2', { class: 'section__title', text: heading }),
      verse.length &&
        el('p', { class: 'invocation__verse' }, verse.flatMap((line, i) => [i > 0 && el('br'), line])),
      icon('divider', 'divider'),
      el('div', { class: 'functions__grid' }, items.map((item, index) => this.card(item, index))),
    ]);
  }

  card(item, index) {
    const media = item.image
      ? el('img', { class: 'card__image', src: item.image, alt: item.name, loading: 'lazy', decoding: 'async' })
      : el('div', { class: 'card__image card__image--placeholder' }, [icon('wreath', 'card__crest')]);

    return el('article', { class: 'card', dataset: { reveal: '', index: String(index) } }, [
      el('div', { class: 'card__media' }, [media]),
      el('div', { class: 'card__body' }, [
        el('h3', { class: 'card__title', text: item.name }),
        item.subtitle && el('p', { class: 'card__subtitle', text: item.subtitle }),
        el('p', { class: 'card__when' }, [
          item.date && el('span', { class: 'card__date', text: item.date }),
          item.day && el('span', { class: 'card__day', text: item.day }),
          item.time && el('span', { class: 'card__time', text: item.time }),
        ]),
        item.venue &&
          el('p', { class: 'card__venue' }, [
            item.mapUrl
              ? el('a', { href: item.mapUrl, target: '_blank', rel: 'noopener', text: item.venue })
              : item.venue,
          ]),
        item.dressCode &&
          el('p', { class: 'card__dress' }, [
            el('span', { class: 'card__dress-label', text: this.data.dressCodeLabel ?? 'Glamour Guide' }),
            el('span', { class: 'card__dress-value', text: item.dressCode }),
          ]),
      ]),
    ]);
  }
}
