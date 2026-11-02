import { RsvpProvider } from './RsvpProvider.js';

const FIELD_ORDER = ['name', 'phone', 'side', 'guests', 'message'];

/** Zero-backend transport: opens WhatsApp with the RSVP pre-filled. */
export class WhatsAppRsvpProvider extends RsvpProvider {
  constructor({ number, heading = 'RSVP', labels = {} } = {}) {
    super();
    this.number = String(number ?? '').replace(/\D/g, '');
    this.heading = heading;
    this.labels = labels;
  }

  async submit(payload) {
    if (!this.number) return { ok: false, message: 'No RSVP destination configured.' };

    const lines = [
      this.heading,
      ...FIELD_ORDER.filter((key) => payload[key]).map((key) => `${this.labels[key] ?? key}: ${payload[key]}`),
    ];

    window.open(`https://wa.me/${this.number}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
    return { ok: true };
  }
}
