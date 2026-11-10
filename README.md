# Bali Global Kinder School (BGKS)

Static, bilingual (Indonesian and English) website prototype built with plain HTML, CSS, and ES modules. No build step.

## Run locally

Serve the folder root with any static server, for example `python3 -m http.server 8080`, then open `http://localhost:8080/`.
Components are loaded with `fetch`, so opening files directly from disk will not work.

## Structure

- `index.html` at the root, all other pages in `pages/`.
- `components/` navbar, footer, chatbot markup loaded by `js/main.js`.
- `css/` foundation, layout, components, and page styles, imported from `css/main.css`.
- `js/foundation/i18n.js` language manager. `js/i18n/en.js` holds the Indonesian to English dictionary for static text.
- `js/data/` structured content. News, FAQ, events, and visit slots carry `id` and `en` fields. Items marked `isDummy: true` are demonstration data.
- `js/data/school.js` single source for the WhatsApp number (`628388621176`), address, map link, and Instagram.

## Language

Default is Indonesian. The choice is stored in `localStorage` (`bgks-lang`) and can be forced with `?lang=en`.
Static markup stays in Indonesian and is translated at runtime from `js/i18n/en.js`. New markup may use `data-en="..."` on a leaf element. Data-driven pages call `P()` and `L()` from `i18n.js`.

## Chatbot (BGKS Assistant)

Rule-based information assistant, not AI. No backend, no external requests.

- `components/chatbot.html` markup shell, `css/components/chatbot.css` styles, `js/components/chatbot.js` UI and events.
- `js/chatbot/kb.js` knowledge base per language (`id`, `en`). `js/chatbot/intents.js` keyword, phrase, and FAQ matching. `js/chatbot/responder.js` turns an intent into a reply. `js/chatbot/wa.js` WhatsApp links. `js/chatbot/state.js` session state.
- Answers about age groups, documents, parking, and the FAQ reuse `js/data/faq.js`, so the chatbot and FAQ page do not contradict each other. Items marked `isDummy` are shown with a "sample information" note.
- WhatsApp number and address come from `js/data/school.js`. Messages are composed per topic in `js/chatbot/wa.js`.
- The conversation is kept in `sessionStorage` for the open tab only and is cleared by the reset button.
- Test intents, replies, bilingual keys, and WhatsApp links with `node scripts/test-chatbot.mjs`.

## Domain and SEO

No production domain is configured. After choosing one, run `node scripts/generate-sitemap.mjs https://your-domain` to regenerate `sitemap.xml` and `robots.txt`, then add `canonical` links per page. Single-file bilingual pages do not expose separate language URLs, so `hreflang` is intentionally not set.

## Integrations still needed

- Enrollment and visit forms only compose a WhatsApp message. No data is stored. Connect a backend, Cal.com, or Calendly in `js/data/visit.js` (`getSlots`) and `js/components/enquiry-form.js`.
- Replace dummy teachers, testimonials, news, events, FAQ answers, vision and mission, and institution identity (NPSN, permit, accreditation) with official data.
- Google Business Profile must be created and verified by the school.
- Official school photos should replace the concept illustrations. See `assets/IMAGE-SOURCES.txt`.

## Licenses

Fonts: Outfit and DM Sans under the SIL Open Font License, see `assets/fonts/`.
