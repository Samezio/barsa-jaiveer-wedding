# The Wedding of Barsa & Jaiveer

A single-page, scroll-through digital wedding invitation. No build step, no framework, no
dependencies — plain HTML, CSS and ES modules, so it drops straight onto GitHub Pages.

The content is translated from the printed card: invocation → announcement → countdown →
ceremonies → venue → host families → contacts. The cover is a sealed door you tap to open.

**Saturday, 12 December 2026 · Sai Utsav Garden, Purviya Tola, Etawah**

## Quick start

1. **Fork / copy this repo.**
2. **Edit `assets/js/config/invitation.config.js`.** That is the only file you need to touch —
   names, lineage, dates, ceremonies, venue, host families, RSVP and contact numbers all come
   from there.
3. **Drop photos into `assets/img/`** and point a ceremony's `image` at them (e.g.
   `image: 'assets/img/tel-pujan.jpg'`). Leave `image: ''` and the card draws a gold crest instead.
4. **Publish on GitHub Pages:** *Settings → Pages → Source: Deploy from a branch →
   `main` / `root`.* The site is live at `https://<user>.github.io/<repo>/` in a minute or two.

`.nojekyll` is committed so GitHub serves the `assets/` folder untouched.

### Previewing locally

ES modules need a real HTTP origin, so `file://` will not work. Use any static server:

```bash
python -m http.server 8000     # then open http://localhost:8000
# or
npx --yes serve .
```

## Two things to confirm before sharing the link

| Item | Current value | Why |
| --- | --- | --- |
| `event.startsAt` | `2026-12-12T00:00:00+05:30` | The printed card gives a date but no muhurat time. The countdown currently runs to the **start of the wedding day**. Set the real lagna time when it is fixed. |
| `functions.items[].time` | empty | No per-ceremony timings are printed. Fill them in and they appear on the cards automatically. |

The weekday on each ceremony card is taken verbatim from the card, including the hand-written
correction on Matru Pujan (printed Thursday, corrected to **Friday** — 11 Dec 2026 is a Friday).
Weekdays for the two later additions were derived from their dates: Lagun falls on a Thursday,
Haldi / Mehndi on a Friday.

## How the card maps onto the page

| Printed text | On the page |
| --- | --- |
| Ganesh invocation and shloka | `invocation` — salutation plus its English meaning |
| "By the boundless grace of the Almighty, my daughter…" | `couple.preamble` |
| Ayushmati Barsa / Chiranjeev Jaiveer Singh | `couple.bride` / `couple.groom` — honorific, name, grandparent and parent lines, address |
| "with" … "Sacred Wedding" | `couple.conjunction`, `couple.connector`, `couple.occasion` |
| The blessing request | `couple.request` |
| Tel Pujan · Matru Pujan · Shubh Vivah · Vidai | `functions.items` — each with an English gloss as `subtitle` |
| *(not on the card)* Lagun · Haldi / Mehndi | Added from the family afterwards — both at Shree Krishna Vatika, Sahpau |
| Gauri shloka on the programme card | `functions.verse` |
| Sai Utsav Garden, Purviya Tola | `venue` + Google Maps button |
| The three host groups | `hosts.groups` |
| Sender's two phone numbers | `contact.people[0].phones` |

Proper nouns keep the spellings the family uses (Barsa, Jaiveer Singh, Sai Utsav Garden, Etawah); everything
else is in English. The Devanagari faces remain in the font stacks, so pasting Hindi back into
any config string renders correctly without touching the CSS.

## Sections driven by the config

| Config key | Section |
| --- | --- |
| `invocation` | Opening salutation and shloka |
| `couple` | Announcement — honorific, name, lineage, address, occasion, blessing request |
| `countdown` | Live countdown |
| `functions` | Ceremony cards (+ the Gauri shloka) |
| `itinerary` | Hour-by-hour timeline — **currently `null`, so the section is dropped from the page.** Give it `{ heading, days: [{ label, entries: [{ time, title, note, mapUrl }] }] }` to switch it on. |
| `venue` | Venue + Google Maps button |
| `hosts` | The three host groups |
| `rsvp` | RSVP form - **currently `null`, so the section is dropped from the page.** Give it `{ kicker, heading, blurb, sides, labels, submitLabel, successMessage, errorMessage, whatsappNumber }` to switch it on. |
| `contact` | One card per person, `phones: []` for several numbers |

Any section whose config block is `null` is skipped and its placeholder removed, so there is
no empty band left on the page.

`couple.order` controls who is announced first — it is `['bride', 'groom']` here because the
card is issued by the bride's family.

## Collecting RSVPs (currently off)

`rsvp` is `null`, so there is no form and no "Confirm attendance" button on the page -
guests respond via the phone numbers in the Contact section instead. Give `rsvp` a config
block and the section returns; no HTML or CSS changes are needed.

With the form switched on, responses can go one of two ways:

| Mode | Setup | Where responses land |
| --- | --- | --- |
| **WhatsApp (default)** | `rsvp.whatsappNumber` in the config | Opens WhatsApp with the RSVP pre-filled, addressed to that number |
| **HTTP endpoint** | Copy `assets/js/config/rsvp.config.example.js` -> `rsvp.config.js` and fill in `url` | Formspree / Google Apps Script / your own API |

`rsvp.config.js` is **gitignored** - keep form IDs and tokens out of the repo. If the file is
absent, `RsvpProviderFactory` silently falls back to WhatsApp, so the deployed site always works.

## Project structure

```
index.html                     page shell, SVG ornament sprite, section slots
assets/
  css/
    tokens.css                 <- palette, fonts, tracking, spacing (retheme here)
    base.css                   reset, typography, buttons, reveal animation
    layout.css                 section rhythm, headings, scroll cue
    components/*.css           one file per section
  js/
    main.js                    composition root - registers components, starts services
    config/
      invitation.config.js     <- all content (edit this)
      rsvp.config.example.js   optional RSVP endpoint template
    core/
      dom.js                   el() / qs() helpers
      Component.js             render/mount contract + isEmpty()
      App.js                   mounts components, then boots services
    components/                pure rendering, one class per section
      CoverGate, Invocation, Announcement, Countdown, Functions,
      Itinerary, Venue, Hosts, Rsvp, Contact, Footer
    services/
      RevealService.js         the cover gate (doors + scroll lock)
      CountdownService.js      live countdown
      ScrollRevealService.js   fade-in on scroll
      RsvpService.js           validation + status reporting
      DocumentMetaService.js   <head> synced from the config
      rsvp/                    RsvpProvider interface + WhatsApp / HTTP transports + factory
  img/                         your photos
tmp/                           scans of the printed card (gitignored)
```

Rendering (`components/`) and behaviour (`services/`) never touch each other's job; `App`
mounts the DOM first and boots services afterwards, so no service has to guard for a missing
node. Swapping how RSVPs are delivered means adding one `RsvpProvider` — nothing else changes.

## Typography & retheming

Everything visual is a custom property in `assets/css/tokens.css`:

| Token group | Current value |
| --- | --- |
| Paper | `--paper #fffdf7`, `--paper-warm #f5f0e6` |
| Gold | `--gold #bfa36f`, `--gold-deep #9a6b1f`, `--gold-bright #d9b84e` |
| Accents | `--maroon #982d32`, `--olive #4a5a34`, `--olive-deep #22301a` |
| Latin faces | Great Vibes (script), Bodoni Moda (display), Playfair Display (headings), Cormorant Garamond (body) |
| Devanagari fallbacks | Rozha One (display), Tiro Devanagari Hindi (headings/body), Tiro Devanagari Sanskrit (shlokas), Yatra One (script) |

Each Devanagari face sits at the **end** of its Latin stack, so the browser resolves fonts per
glyph. With the page in English nothing Devanagari downloads; put Hindi back into any config
string and it renders in the right face with no CSS change.

Wide Latin letter-spacing breaks the Devanagari shirorekha, so tracking is tokenised
(`--tracking-display`, `--tracking-label`, `--tracking-kicker`). Setting `<html lang="hi">`
narrows all three in one rule.

## Accessibility & behaviour notes

- The cover is a real `<button>`: keyboard (Enter / Space) opens it, and the invitation body
  carries `aria-hidden` until it does.
- `prefers-reduced-motion` turns off the door swing, scroll reveals and the seal pulse.
- Fluid type and layout from ~320px up; the ceremony grid and host columns reflow to one column.
- Phone numbers are `tel:` links; map links open in a new tab with `rel="noopener"`.
