import { Component } from '../core/Component.js';
import { el, icon } from '../core/dom.js';

export class Announcement extends Component {
  render() {
    const { couple, event } = this.data;
    const [first, second] = (couple.order ?? ['groom', 'bride']).map((role) => [role, couple[role]]);

    return el('section', { class: 'section announcement', id: 'announcement', dataset: { reveal: '' } }, [
      couple.intro && el('p', { class: 'announcement__intro', text: couple.intro }),
      couple.preamble && el('p', { class: 'announcement__preamble', text: couple.preamble }),
      el('h1', {
        class: 'sr-only',
        tabindex: '-1',
        text: `${first[1].name} ${couple.conjunction ?? '&'} ${second[1].name} — ${event.dateLabel}`,
      }),
      el('div', { class: 'announcement__names' }, [
        this.person(...first),
        el('span', { class: 'announcement__amp', 'aria-hidden': 'true', text: couple.conjunction ?? '&' }),
        this.person(...second),
      ]),
      couple.connector && el('p', { class: 'announcement__connector', text: couple.connector }),
      couple.occasion && el('h2', { class: 'announcement__occasion', text: couple.occasion }),
      icon('divider', 'divider'),
      couple.request && el('p', { class: 'announcement__request', text: couple.request }),
      couple.tagline && el('p', { class: 'announcement__tagline', text: couple.tagline }),
      el('p', { class: 'announcement__date' }, [el('time', { datetime: event.startsAt, text: event.dateLabel })]),
      event.city && el('p', { class: 'announcement__city', text: event.city }),
      el('div', { class: 'scroll-cue', 'aria-hidden': 'true' }, [icon('chevron', 'scroll-cue__icon')]),
    ]);
  }

  person(role, who) {
    return el('div', { class: `announcement__person announcement__person--${role}` }, [
      who.honorific && el('p', { class: 'announcement__honorific', text: who.honorific }),
      el('p', { class: 'announcement__name', text: who.name }),
      who.grandparents && el('p', { class: 'announcement__lineage', text: `(${who.grandparents})` }),
      who.parents && el('p', { class: 'announcement__lineage', text: `(${who.parents})` }),
      who.address && el('p', { class: 'announcement__address', text: `(${who.address})` }),
    ]);
  }
}
