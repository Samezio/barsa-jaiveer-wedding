/**
 * OPTIONAL. Copy to `rsvp.config.js` to post RSVPs to a real endpoint.
 * `rsvp.config.js` is gitignored — never commit tokens or private URLs.
 * If the file is absent, RSVP falls back to a pre-filled WhatsApp message.
 */
export const rsvpEndpoint = {
  // Formspree, Google Apps Script web app, Sheet.best, your own API — anything that accepts POST.
  url: 'https://formspree.io/f/your-form-id',
  method: 'POST',
  // 'json' sends application/json; 'form' sends multipart/form-data (needed by Formspree's plain endpoint).
  encoding: 'json',
  headers: { Accept: 'application/json' },
};
