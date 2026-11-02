import { RsvpProvider } from './RsvpProvider.js';

/** Posts the RSVP to any endpoint declared in rsvp.config.js. */
export class HttpRsvpProvider extends RsvpProvider {
  constructor({ url, method = 'POST', encoding = 'json', headers = {} }) {
    super();
    this.url = url;
    this.method = method;
    this.encoding = encoding;
    this.headers = headers;
  }

  async submit(payload) {
    const init = { method: this.method, headers: { ...this.headers } };

    if (this.encoding === 'form') {
      const body = new FormData();
      Object.entries(payload).forEach(([key, value]) => body.append(key, value ?? ''));
      init.body = body;
    } else {
      init.headers['Content-Type'] = 'application/json';
      init.body = JSON.stringify(payload);
    }

    try {
      const response = await fetch(this.url, init);
      return response.ok ? { ok: true } : { ok: false, message: `Endpoint returned ${response.status}` };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }
}
