import { Component } from '../core/Component.js';
import { el, icon } from '../core/dom.js';

export class Venue extends Component {
  render() {
    const { kicker, name, address, mapUrl, mapCta } = this.data;

    return el('section', { class: 'section venue', id: 'venue', dataset: { reveal: '' } }, [
      el('p', { class: 'section__kicker', text: kicker }),
      el('h2', { class: 'venue__name', text: name }),
      address && el('p', { class: 'venue__address', text: address }),
      mapUrl &&
        el('a', { class: 'button button--outline', href: mapUrl, target: '_blank', rel: 'noopener' }, [
          icon('pin', 'button__icon'),
          mapCta ?? 'Open in Google Maps',
        ]),
    ]);
  }
}
