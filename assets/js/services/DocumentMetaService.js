/** Keeps <head> in sync with the config so there is only one place to edit. */
export class DocumentMetaService {
  constructor({ title, description, favicon } = {}) {
    this.title = title;
    this.description = description;
    this.favicon = favicon;
  }

  init() {
    if (this.title) {
      document.title = this.title;
      this.setMeta('property', 'og:title', this.title);
    }

    if (this.description) {
      this.setMeta('name', 'description', this.description);
      this.setMeta('property', 'og:description', this.description);
    }

    if (this.favicon) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><text y="48" font-size="48">${this.favicon}</text></svg>`;
      this.setLink('icon', `data:image/svg+xml,${encodeURIComponent(svg)}`);
    }
  }

  setMeta(attr, key, value) {
    let node = document.querySelector(`meta[${attr}="${key}"]`);
    if (!node) {
      node = document.createElement('meta');
      node.setAttribute(attr, key);
      document.head.append(node);
    }
    node.setAttribute('content', value);
  }

  setLink(rel, href) {
    let node = document.querySelector(`link[rel="${rel}"]`);
    if (!node) {
      node = document.createElement('link');
      node.setAttribute('rel', rel);
      document.head.append(node);
    }
    node.setAttribute('href', href);
  }
}
