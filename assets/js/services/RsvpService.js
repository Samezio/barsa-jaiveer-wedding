import { createRsvpProvider } from './rsvp/RsvpProviderFactory.js';

/** Validates the form, delegates delivery to a provider, reports status. */
export class RsvpService {
  constructor(config, { formSelector = '#rsvp-form' } = {}) {
    this.config = config;
    this.formSelector = formSelector;
  }

  async init() {
    this.form = document.querySelector(this.formSelector);
    if (!this.form) return;

    this.status = this.form.querySelector('[data-rsvp-status]');
    this.button = this.form.querySelector('button[type="submit"]');
    this.provider = await createRsvpProvider(this.config);

    this.form.addEventListener('submit', (event) => this.handleSubmit(event));
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (!this.form.reportValidity()) return;

    const data = new FormData(this.form);
    const payload = {
      name: String(data.get('name') ?? '').trim(),
      phone: String(data.get('phone') ?? '').trim(),
      side: String(data.get('side') ?? '').trim(),
      guests: String(data.get('guests') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
    };

    this.setBusy(true);
    const result = await this.provider.submit(payload);
    this.setBusy(false);

    if (result.ok) {
      this.report(this.config.successMessage, 'success');
      this.form.reset();
    } else {
      this.report(result.message ? `${this.config.errorMessage} (${result.message})` : this.config.errorMessage, 'error');
    }
  }

  setBusy(busy) {
    if (!this.button) return;
    this.button.disabled = busy;
    this.button.dataset.busy = String(busy);
  }

  report(message, tone) {
    if (!this.status) return;
    this.status.textContent = message;
    this.status.dataset.tone = tone;
  }
}
