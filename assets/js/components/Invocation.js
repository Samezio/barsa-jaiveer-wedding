import { Component } from '../core/Component.js';
import { el } from '../core/dom.js';

/** The salutation and shloka printed at the head of the card. */
export class Invocation extends Component {
  render() {
    const { salutation, verse = [] } = this.data;

    return el('section', { class: 'invocation', dataset: { reveal: '' } }, [
      salutation && el('p', { class: 'invocation__salutation', text: salutation }),
      verse.length &&
        el('p', { class: 'invocation__verse' }, verse.flatMap((line, i) => [i > 0 && el('br'), line])),
    ]);
  }
}
