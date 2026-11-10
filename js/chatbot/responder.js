import { school, directionsUrl } from "../data/school.js";
import { faq } from "../data/faq.js";
import { knowledgeBase, pages } from "./kb.js";
const clone = (o) => JSON.parse(JSON.stringify(o));
const choice = (label, d, icon) => ({ t: "choice", label, to: d, icon: icon || "" });
const link = (label, href) => ({ t: "link", label, href });
const wa = (label, topic, q) => ({ t: "wa", label, topic, q: q || "" });
const find = (needle) => faq.find((f) => f.q.id.includes(needle));
const faqAnswer = (needle, lang) => {
  const f = find(needle);
  if (!f) return null;
  return { text: f.a[lang] || f.a.id, dummy: !!f.isDummy };
};
const PAGE_OF = {
  programs: pages.program,
  program: pages.program,
  stages: pages.program,
  admission: pages.admission,
  fees: pages.admission,
  facilities: pages.facilities,
  facility: pages.facilities,
  schoolLife: pages.life,
  visit: pages.visit,
  contact: pages.contact,
  location: pages.contact,
  hours: pages.contact,
  calendar: pages.calendar,
  news: pages.news,
  about: pages.about,
  faq: pages.faq,
  faqItem: pages.faq,
};
const WA_OF = {
  programs: "programs",
  program: "programs",
  stages: "programs",
  admission: "admission",
  fees: "fees",
  facilities: "facilities",
  facility: "facilities",
  schoolLife: "schoolLife",
  visit: "visit",
};
export const mainMenu = (lang) => {
  const m = knowledgeBase[lang].menu;
  return [
    choice(m.programs, { id: "programs" }, "book"),
    choice(m.admission, { id: "admission" }, "clipboard"),
    choice(m.facilities, { id: "facilities" }, "home"),
    choice(m.visit, { id: "visit" }, "door"),
    choice(m.contact, { id: "contact" }, "pin"),
    choice(m.other, { id: "other" }, "chat"),
  ];
};
const back = (lang) => choice(knowledgeBase[lang].back, { id: "menu" }, "back");
export function respond(d, lang) {
  const k = knowledgeBase[lang] || knowledgeBase.id;
  const q = d.q || "";
  const r = { paras: [], bullets: [], note: "", actions: [], layout: "list", menu: false };
  switch (d.id) {
    case "menu":
      r.paras = clone(k.greeting);
      r.actions = mainMenu(lang);
      r.layout = "grid";
      r.menu = true;
      return r;
    case "other":
      r.paras = clone(k.other.text);
      r.actions = k.other.examples.map((e) => ({ t: "ask", label: e, q: e }));
      r.actions.push(back(lang));
      return r;
    case "programs": {
      r.paras = clone(k.programs.text);
      const o = k.programs.options;
      r.actions = [
        choice(o.explore, { id: "program", arg: "explore" }),
        choice(o.creative, { id: "program", arg: "creative" }),
        choice(o.language, { id: "program", arg: "language" }),
        choice(o.movement, { id: "program", arg: "movement" }),
        back(lang),
      ];
      return r;
    }
    case "program": {
      const it = k.programs.items[d.arg];
      if (!it) return respond({ id: "programs" }, lang);
      r.paras = [it.title + ". " + it.text];
      r.bullets = clone(it.bullets);
      r.note = k.programs.itemNote;
      r.actions = [
        link(k.programs.seeAll, it.href),
        wa(k.programs.ask, "programs", q),
        choice(k.menu.programs, { id: "programs" }),
        back(lang),
      ];
      return r;
    }
    case "stages": {
      const a = faqAnswer("usia anak yang diterima", lang);
      r.paras = [k.programs.stages.text];
      r.bullets = clone(k.programs.stages.bullets);
      if (a) r.paras.push(a.text);
      r.note = k.ui.dummyNote;
      r.actions = [
        link(k.programs.seeAll, pages.program),
        wa(k.programs.ask, "programs", q),
        back(lang),
      ];
      return r;
    }
    case "admission": {
      r.paras = clone(k.admission.text);
      const o = k.admission.options;
      r.actions = [
        choice(o.requirements, { id: "admission", arg: "requirements" }),
        choice(o.info, { id: "programs" }),
        choice(o.how, { id: "admission", arg: "how" }),
        choice(o.consult, { id: "admission", arg: "consult" }),
        back(lang),
      ];
      if (d.arg === "how") {
        const h = k.admission.how;
        r.paras = [h.text];
        r.bullets = clone(h.bullets);
        r.note = h.note;
        r.actions = [
          link(k.admission.infoBtn, pages.admission),
          wa(k.ui.wa, "admission", q),
          choice(k.menu.admission, { id: "admission" }),
          back(lang),
        ];
      } else if (d.arg === "requirements") {
        const a = faqAnswer("dokumen apa", lang);
        r.paras = [k.admission.requirements.text];
        if (a) r.paras.push(a.text);
        else r.bullets = clone(k.admission.requirements.fallbackBullets);
        r.note = k.ui.dummyNote;
        r.actions = [
          link(k.admission.infoBtn, pages.admission),
          wa(k.ui.wa, "admission", q),
          choice(k.menu.admission, { id: "admission" }),
          back(lang),
        ];
      } else if (d.arg === "consult") {
        r.paras = [k.admission.consultText];
        r.actions = [
          wa(k.ui.wa, "admission", q),
          link(k.admission.infoBtn, pages.admission),
          choice(k.menu.admission, { id: "admission" }),
          back(lang),
        ];
      } else {
        const last = r.actions.pop();
        r.actions.push(link(k.admission.infoBtn, pages.admission), wa(k.ui.wa, "admission", q), last);
      }
      return r;
    }
    case "fees":
      r.paras = [k.fees.text, k.fees.note];
      r.actions = [wa(k.ui.wa, "fees", q), link(k.admission.infoBtn, pages.admission), back(lang)];
      return r;
    case "facilities": {
      r.paras = clone(k.facilities.text);
      const o = k.facilities.options;
      r.actions = [
        choice(o.learning, { id: "facility", arg: "learning" }),
        choice(o.play, { id: "facility", arg: "play" }),
        choice(o.environment, { id: "facility", arg: "environment" }),
        link(o.all, pages.facilities),
        choice(k.schoolLife.seeAll, { id: "schoolLife" }),
        back(lang),
      ];
      return r;
    }
    case "facility": {
      const it = k.facilities.items[d.arg];
      if (!it) return respond({ id: "facilities" }, lang);
      r.paras = [it.title + ". " + it.text, it.lead];
      r.bullets = clone(it.bullets);
      r.note = it.extra || "";
      r.actions = [
        link(k.facilities.seeAll, pages.facilities),
        wa(k.facilities.ask, "facilities", q),
        choice(k.menu.facilities, { id: "facilities" }),
        back(lang),
      ];
      return r;
    }
    case "schoolLife": {
      const o = k.schoolLife.options;
      const it = k.schoolLife.items[d.arg];
      if (it) {
        r.paras = [it.title + ". " + it.text];
        r.note = k.schoolLife.note;
        r.actions = [
          link(k.schoolLife.seeAll, pages.life),
          wa(k.schoolLife.ask, "schoolLife", q),
          choice(lang === "en" ? "More about school life" : "Lainnya tentang kehidupan sekolah", { id: "schoolLife" }),
          back(lang),
        ];
        return r;
      }
      r.paras = clone(k.schoolLife.text);
      r.actions = [
        choice(o.arrive, { id: "schoolLife", arg: "arrive" }),
        choice(o.learn, { id: "schoolLife", arg: "learn" }),
        choice(o.play, { id: "schoolLife", arg: "play" }),
        choice(o.daily, { id: "schoolLife", arg: "daily" }),
        link(k.schoolLife.seeAll, pages.life),
        back(lang),
      ];
      return r;
    }
    case "visit": {
      r.paras = clone(k.visit.text);
      r.actions = [
        choice(k.visit.options.info, { id: "visit", arg: "info" }),
        wa(k.visit.options.contact, "visit", q),
        link(k.visit.open, pages.visit),
        back(lang),
      ];
      if (d.arg === "info") {
        r.paras = [k.visit.info.text];
        r.note = k.visit.info.note;
        r.actions = [link(k.visit.open, pages.visit), wa(k.visit.ask, "visit", q), back(lang)];
      }
      return r;
    }
    case "contact":
    case "location": {
      r.paras = clone(k.contact.text);
      r.bullets = [];
      if (school.address) r.bullets.push(k.contact.address + ": " + school.address);
      if (school.phoneLocal) r.bullets.push(k.contact.phone + ": " + school.phoneLocal);
      if (school.email) r.bullets.push("Email: " + school.email);
      r.note = school.hours ? "" : k.contact.hoursMissing;
      r.actions = [];
      if (directionsUrl()) r.actions.push(link(k.contact.directions, directionsUrl()));
      r.actions.push(wa(k.ui.wa, "general", q), link(k.contact.page, pages.contact), back(lang));
      return r;
    }
    case "parking": {
      const a = faqAnswer("parkir", lang);
      if (!a) return respond({ id: "fallback", q }, lang);
      r.paras = [k.faqItem.lead, a.text];
      r.note = a.dummy ? k.ui.dummyNote : "";
      r.actions = [wa(k.ui.wa, "general", q), link(k.contact.page, pages.contact), back(lang)];
      return r;
    }
    case "hours":
      r.paras = [k.hours.text];
      r.actions = [wa(k.ui.wa, "general", q), link(k.contact.page, pages.contact), back(lang)];
      return r;
    case "calendar":
      r.paras = [k.calendar.text];
      r.actions = [link(k.calendar.open, pages.calendar), back(lang)];
      return r;
    case "news":
      r.paras = [k.news.text];
      r.actions = [link(k.news.open, pages.news), back(lang)];
      return r;
    case "about":
      r.paras = [k.about.text];
      r.note = k.about.note;
      r.actions = [link(k.about.open, pages.about), back(lang)];
      return r;
    case "faq":
      r.paras = [k.faq.text];
      r.actions = [link(k.faq.open, pages.faq), back(lang)];
      return r;
    case "thanks":
      r.paras = [k.thanks.text, k.menuAgain];
      r.actions = mainMenu(lang);
      r.layout = "grid";
      return r;
    case "human":
      r.paras = [k.human.text];
      r.actions = [wa(k.ui.wa, "general", ""), back(lang)];
      return r;
    case "aboutBot":
      r.paras = [k.aboutBot.text];
      r.actions = [wa(k.ui.wa, "general", ""), back(lang)];
      return r;
    case "followup": {
      const [pid, parg] = String(d.arg || ":").split(":");
      const page = PAGE_OF[pid];
      r.paras = [k.followup.text];
      if (page) r.actions.push(link(k.followup.open, page));
      r.actions.push(wa(k.ui.wa, WA_OF[pid] || "general", ""));
      r.actions.push(back(lang));
      return r;
    }
    case "disambig": {
      r.paras = [k.disambig.text];
      r.actions = (d.opts || []).map((o) => choice(labelOf(o, lang), o));
      r.actions.push(back(lang));
      return r;
    }
    case "faqItem": {
      const f = faq[Number(d.arg)];
      if (!f) return respond({ id: "fallback", q }, lang);
      r.paras = [k.faqItem.lead, f.q[lang] || f.q.id, f.a[lang] || f.a.id];
      r.note = f.isDummy ? k.ui.dummyNote : "";
      r.actions = [link(k.faq.open, pages.faq), wa(k.ui.wa, "general", q), back(lang)];
      return r;
    }
    default: {
      r.paras = [k.fallback.text];
      const o = k.fallback.options;
      r.actions = [
        choice(o.programs, { id: "programs" }),
        choice(o.admission, { id: "admission" }),
        choice(o.contact, { id: "contact" }),
        wa(k.ui.wa, "general", q),
        back(lang),
      ];
      return r;
    }
  }
}
export function labelOf(d, lang) {
  const k = knowledgeBase[lang];
  switch (d.id) {
    case "program":
      return k.programs.options[d.arg] || k.menu.programs;
    case "programs":
      return k.menu.programs;
    case "stages":
      return lang === "en" ? "Age groups" : "Kelompok usia";
    case "admission":
      return k.menu.admission;
    case "fees":
      return lang === "en" ? "Fees" : "Biaya";
    case "facility":
      return k.facilities.options[d.arg] || k.menu.facilities;
    case "facilities":
      return k.menu.facilities;
    case "schoolLife":
      return k.schoolLife.seeAll.replace(/^\S+\s/, "");
    case "visit":
      return k.menu.visit;
    case "location":
    case "contact":
      return k.menu.contact;
    case "calendar":
      return lang === "en" ? "Calendar" : "Kalender";
    case "news":
      return lang === "en" ? "News" : "Berita";
    case "about":
      return lang === "en" ? "About the school" : "Tentang sekolah";
    case "hours":
      return lang === "en" ? "Opening hours" : "Jam operasional";
    default:
      return k.menu.other;
  }
}
