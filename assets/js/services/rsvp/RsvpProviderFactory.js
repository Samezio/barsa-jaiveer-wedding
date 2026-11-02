import { HttpRsvpProvider } from './HttpRsvpProvider.js';
import { WhatsAppRsvpProvider } from './WhatsAppRsvpProvider.js';

/**
 * Picks a transport at runtime. `rsvp.config.js` is gitignored and may not
 * exist, so the import is dynamic and failure falls back to WhatsApp.
 */
export async function createRsvpProvider(config = {}) {
  try {
    const module = await import('../../config/rsvp.config.js');
    if (module?.rsvpEndpoint?.url) return new HttpRsvpProvider(module.rsvpEndpoint);
  } catch {
    /* no endpoint configured — expected on a plain GitHub Pages deploy */
  }

  return new WhatsAppRsvpProvider({
    number: config.whatsappNumber,
    heading: config.whatsappHeading,
    labels: config.labels,
  });
}
