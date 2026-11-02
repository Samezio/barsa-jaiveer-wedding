/** @typedef {{ name: string, phone: string, side: string, guests?: string, message?: string }} RsvpPayload */

/** Interface every RSVP transport implements. */
export class RsvpProvider {
  /**
   * @param {RsvpPayload} payload
   * @returns {Promise<{ ok: boolean, message?: string }>}
   */
  async submit(payload) {
    throw new Error(`${this.constructor.name} must implement submit()`);
  }
}
