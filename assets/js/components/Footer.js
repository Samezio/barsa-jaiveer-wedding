import { Component } from '../core/Component.js';
import { el, icon } from '../core/dom.js';

export class Footer extends Component {
  render() {
    const { note, credit, creditUrl } = this.data;

    return el('footer', { class: 'footer', dataset: { reveal: '' } }, [
      icon('flourish', 'footer__ornament'),
      el('p', { class: 'footer__note', text: note }),
      credit &&
        el('p', { class: 'footer__credit' }, [
          'created with ',
          el('span', { class: 'footer__heart', 'aria-label': 'love', text: '♥' }),
          ' by ',
          creditUrl ? el('a', { href: creditUrl, target: '_blank', rel: 'noopener', text: credit }) : credit,
        ]),
    ]);
  }
}
