import { App } from './core/App.js';
import { invitation } from './config/invitation.config.js';
import { Announcement } from './components/Announcement.js';
import { Contact } from './components/Contact.js';
import { Countdown } from './components/Countdown.js';
import { CoverGate } from './components/CoverGate.js';
import { Footer } from './components/Footer.js';
import { Functions } from './components/Functions.js';
import { Hosts } from './components/Hosts.js';
import { Invocation } from './components/Invocation.js';
import { Itinerary } from './components/Itinerary.js';
import { Rsvp } from './components/Rsvp.js';
import { Venue } from './components/Venue.js';
import { CountdownService } from './services/CountdownService.js';
import { DocumentMetaService } from './services/DocumentMetaService.js';
import { RevealService } from './services/RevealService.js';
import { RsvpService } from './services/RsvpService.js';
import { ScrollRevealService } from './services/ScrollRevealService.js';

const app = new App()
  .register('[data-slot="cover"]', new CoverGate(invitation.cover))
  .register('[data-slot="invocation"]', new Invocation(invitation.invocation))
  .register('[data-slot="announcement"]', new Announcement(invitation))
  .register('[data-slot="countdown"]', new Countdown(invitation.countdown))
  .register('[data-slot="functions"]', new Functions(invitation.functions))
  .register('[data-slot="itinerary"]', new Itinerary(invitation.itinerary))
  .register('[data-slot="venue"]', new Venue(invitation.venue))
  .register('[data-slot="hosts"]', new Hosts(invitation.hosts))
  .register('[data-slot="rsvp"]', new Rsvp(invitation.rsvp))
  .register('[data-slot="contact"]', new Contact(invitation.contact))
  .register('[data-slot="footer"]', new Footer(invitation.footer))
  .use(new DocumentMetaService(invitation.meta))
  .use(new RevealService())
  .use(new ScrollRevealService())
  .use(new CountdownService(invitation.event.startsAt))
  .use(new RsvpService(invitation.rsvp));

app.start();
