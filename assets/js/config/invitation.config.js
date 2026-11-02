/**
 * THE ONLY FILE YOU NEED TO EDIT.
 * Every string, date, card and link on the invitation is read from here.
 * Content translated from the printed card (Barsa & Jayveer, 12 December 2026).
 * Proper nouns are transliterated; everything else is rendered in English.
 */
export const invitation = {
  meta: {
    title: 'The Wedding of Barsa & Jayveer',
    description:
      'Saturday, 12 December 2026 — Sai Utsav Garden, Purviya Tola, Etawah. Please grace the occasion with your family.',
    favicon: '🪔',
  },

  cover: {
    monogram: 'B ❀ J',
    hint: 'Tap the seal to open',
    kicker: 'The Wedding',
  },

  /** Opening invocation printed at the head of the card. */
  invocation: {
    salutation: '|| Shri Ganeshaya Namah ||',
    verse: [
      'O Lord of the curved trunk and mighty form, radiant as ten million suns,',
      'make all my endeavours free of obstacles, always.',
    ],
  },

  couple: {
    intro: 'To our dearest family and friends,',
    preamble: 'By the boundless grace of the Almighty, my daughter',
    /** Render order — the card leads with the bride, as it is issued by her family. */
    order: ['bride', 'groom'],
    conjunction: 'with',
    connector: 'on the auspicious occasion of their',
    occasion: 'Sacred Wedding',
    request:
      "We request the pleasure of your family's presence — to bathe the bride and groom in the gentle moonlight of your blessings, and so bestow your grace upon us.",
    tagline: 'Wedding date',
    bride: {
      honorific: 'Ayushmati',
      name: 'BARSA',
      grandparents: 'Granddaughter of Shri Bangali Lal',
      parents: 'Daughter of Shri Santosh Kumar & Smt. Anita',
      address: 'Etawah',
    },
    groom: {
      honorific: 'Chiranjeev',
      name: 'JAYVEER SINGH',
      grandparents: 'Grandson of Shri Bholu Shankar',
      parents: 'Son of Shri Rameshwar Singh',
      address: 'District Hathras',
    },
  },

  /**
   * ISO 8601 with offset — drives the countdown.
   * The card gives no muhurat time, so this is set to the start of the
   * wedding day. Replace the time once the lagna is fixed.
   */
  event: {
    startsAt: '2026-12-12T00:00:00+05:30',
    dateLabel: 'Saturday, 12 December 2026',
    city: 'Etawah, Uttar Pradesh',
  },

  countdown: {
    heading: 'Counting down to the wedding',
    finishedLabel: 'The celebrations have begun — you are most welcome',
    labels: { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' },
  },

  functions: {
    heading: 'Auspicious Ceremonies',
    verse: [
      'Salutations to Gauri Narayani — the auspiciousness of all that is auspicious,',
      'consort of Shiva, fulfiller of every purpose, refuge of all, the three-eyed one.',
    ],
    dressCodeLabel: 'Attire',
    items: [
      {
        name: 'Tel Pujan',
        subtitle: 'The oil anointing ceremony',
        day: 'Wednesday',
        date: '09 December 2026',
        time: '',
        venue: '',
        dressCode: '',
        image: '',
        mapUrl: '',
      },
      {
        name: 'Matru Pujan',
        subtitle: 'Worship of the mother goddesses',
        day: 'Friday',
        date: '11 December 2026',
        time: '',
        venue: '',
        dressCode: '',
        image: '',
        mapUrl: '',
      },
      {
        name: 'Shubh Vivah',
        subtitle: 'The wedding ceremony',
        day: 'Saturday',
        date: '12 December 2026',
        time: '',
        venue: 'Sai Utsav Garden, Purviya Tola, Etawah',
        dressCode: '',
        image: '',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sai+Utsav+Garden+Purviya+Tola+Etawah',
      },
      {
        name: 'Vidai',
        subtitle: "The bride's farewell",
        day: 'Sunday',
        date: '13 December 2026',
        time: '',
        venue: '',
        dressCode: '',
        image: '',
        mapUrl: '',
      },
    ],
  },

  /**
   * The printed card lists no per-ceremony timings. Set this to an object with
   * `heading` and `days` (see README) once the schedule is fixed; leave it
   * `null` and the section is dropped from the page entirely.
   */
  itinerary: null,

  venue: {
    kicker: 'We await you at',
    name: 'Sai Utsav Garden',
    address: 'Purviya Tola, Etawah, Uttar Pradesh',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sai+Utsav+Garden+Purviya+Tola+Etawah',
    mapCta: 'Open in Google Maps',
  },

  /** Host families, as printed at the foot of the card. */
  hosts: {
    heading: 'Cordially inviting you',
    groups: [
      { label: 'Eagerly awaiting your presence', names: ['Raj Kishore', 'Ram Kumar', 'Ramesh Chandra'] },
      {
        label: 'Looking forward to welcoming you',
        names: ['Raj Kumar', 'Rinku', 'Sunil Kumar', 'Sandeep', 'Swam'],
      },
      { label: 'Humbly yours', names: ['Santosh Kumar', 'Smt. Anita'] },
    ],
  },

  /**
   * RSVP form. Currently off - set this to an object with `kicker`, `heading`,
   * `blurb`, `sides`, `labels`, `submitLabel`, `successMessage`, `errorMessage`
   * and `whatsappNumber` to bring the section back (see README).
   */
  rsvp: null,

  contact: {
    kicker: 'For any enquiry',
    heading: 'Contact us',
    people: [
      {
        side: "Bride's family",
        name: 'Santosh Kumar',
        detail: 'Etawah, Uttar Pradesh',
        phones: ['919927395516', '918299271619'],
      },
    ],
  },

  footer: {
    note: 'Your presence is our good fortune.',
    credit: '',
    creditUrl: '',
  },
};
