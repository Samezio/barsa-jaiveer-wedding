import { Component } from '../core/Component.js';
import { el, icon } from '../core/dom.js';

/** Host families - the groups printed at the foot of the card. */
export class Hosts extends Component {
  render() {
    const { heading, groups = [] } = this.data;

    return el('section', { class: 'section hosts', id: 'hosts', dataset: { reveal: '' } }, [
      heading && el('h2', { class: 'section__title section__title--sm', text: heading }),
      icon('divider', 'divider'),
      el(
        'div',
        { class: 'hosts__grid' },
        groups.map((group) =>
          el('div', { class: 'hosts__group' }, [
            el('p', { class: 'hosts__label', text: group.label }),
            el('ul', { class: 'hosts__names' }, group.names.map((name) => el('li', { text: name }))),
          ]),
        ),
      ),
    ]);
  }
}
