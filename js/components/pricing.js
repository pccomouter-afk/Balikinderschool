import { el, icon } from "../foundation/dom.js";
import { P, getLang, onLang } from "../foundation/i18n.js";
import { waForPage } from "../data/school.js";
import { renderAccordion } from "./accordion.js";
const COPY = {
  eyebrow: { id: "Biaya program", en: "Program Fees" },
  title: {
    id: "Pilih tahap, lihat apa yang didapat.",
    en: "Pick a stage and see what is included.",
  },
  lead: {
    id: "Setiap tahap menampilkan biaya sekali bayar, biaya bulanan, dan isi program dalam satu tempat.",
    en: "Each stage shows its one-time fees, monthly fee, and program contents in one place.",
  },
  pick: { id: "Pilih tahap belajar", en: "Choose a learning stage" },
  monthly: { id: "Biaya Bulanan", en: "Monthly Fee" },
  registration: { id: "Biaya Pendaftaran", en: "Registration Fee" },
  supplies: { id: "Paket Perlengkapan", en: "Supply Pack" },
  included: { id: "Yang Termasuk", en: "What's Included" },
  compare: { id: "Perbandingan paket", en: "Plan comparison" },
  feature: { id: "Isi program", en: "Program contents" },
  schedule: { id: "Jadwal belajar", en: "Schedule" },
  age: { id: "Usia", en: "Age" },
  faq: { id: "Pertanyaan tentang biaya", en: "Questions about fees" },
  askFees: { id: "Tanya Detail Biaya", en: "Ask About Fees" },
  enroll: { id: "Mulai Pendaftaran", en: "Start Enrollment" },
  visit: { id: "Jadwalkan Kunjungan", en: "Schedule a Visit" },
  contact: { id: "Hubungi Kami", en: "Contact Us" },
  states: {
    included: { id: "Termasuk", en: "Included" },
    optional: { id: "Tambahan opsional", en: "Optional add-on" },
    oneTime: { id: "Sekali bayar", en: "One-time fee" },
  },
};
const ICON = {
  included: "M5 12.5l4.5 4.5L19 7.5",
  optional: "M12 5v14M5 12h14",
  oneTime: "M5 8h14v11H5zM9 8V5h6v3",
};
const t = (entry) => P(entry);
const money = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
const stateBadge = (state) =>
  el(
    "span",
    { class: "pstate pstate--" + state },
    icon(ICON[state]),
    el("span", { text: t(COPY.states[state]) }),
  );
const feeRow = (label, amount, kind, kindLabel) =>
  el(
    "li",
    { class: "pfee pfee--" + kind },
    el(
      "span",
      { class: "pfee__label" },
      el("span", { text: label }),
      el("span", { class: "pchip pchip--" + kind, text: kindLabel }),
    ),
    el("strong", { class: "pfee__amount", text: money(amount) }),
  );
export function renderPricing(host, data) {
  let selected = 0;
  let swap = false;
  const draw = () => {
    const plan = data.plans[selected];
    const tabs = data.plans.map((p, i) =>
      el(
        "button",
        {
          class: "ptab",
          type: "button",
          "aria-pressed": String(i === selected),
          onclick: () => {
            if (i === selected) return;
            selected = i;
            swap = true;
            draw();
          },
        },
        el("span", { class: "ptab__name", text: t(p.name) }),
        el("span", { class: "ptab__age", text: t(p.age) }),
      ),
    );
    const features = data.features.map((f) =>
      el(
        "li",
        { class: "pfeat pfeat--" + plan.access[f.key] },
        stateBadge(plan.access[f.key]),
        el(
          "span",
          { class: "pfeat__text" },
          el("strong", { text: t(f.name) }),
          el("span", { text: t(f.desc) }),
        ),
      ),
    );
    const main = el(
      "article",
      { class: "pmain" + (swap ? " is-swap" : ""), "aria-live": "polite" },
      el(
        "div",
        { class: "pmain__plan" },
        el("p", { class: "pmain__age", text: t(plan.age) }),
        el("h3", { text: t(plan.name) }),
        el("p", { class: "pmain__summary", text: t(plan.summary) }),
        el("p", { class: "pmain__schedule", text: t(plan.schedule) }),
        el(
          "ul",
          { class: "pfees", role: "list" },
          feeRow(t(COPY.monthly), plan.monthlyFee, "monthly", t(data.monthlyLabel)),
          feeRow(t(COPY.registration), plan.registrationFee, "one", t(data.oneTimeLabel)),
          feeRow(t(COPY.supplies), plan.supplyFee, "one", t(data.oneTimeLabel)),
        ),
        el("p", { class: "pmain__term", text: t(plan.paymentTerm) }),
      ),
      el(
        "div",
        { class: "pmain__inc" },
        el("h4", { text: t(COPY.included) }),
        el("ul", { class: "pfeats", role: "list" }, ...features),
      ),
    );
    const cols = data.plans;
    const head = el(
      "tr",
      null,
      el("th", { scope: "col", text: t(COPY.feature) }),
      ...cols.map((p, i) =>
        el("th", { scope: "col", class: i === selected ? "is-selected" : "", text: t(p.name) }),
      ),
    );
    const cell = (label, i, ...kids) =>
      el("td", { "data-label": label, class: i === selected ? "is-selected" : "" }, ...kids);
    const infoRow = (label, pick) =>
      el(
        "tr",
        null,
        el("th", { scope: "row", text: label }),
        ...cols.map((p, i) => cell(t(p.name), i, el("span", { text: pick(p) }))),
      );
    const featRows = data.features.map((f) =>
      el(
        "tr",
        null,
        el("th", { scope: "row", text: t(f.name) }),
        ...cols.map((p, i) => cell(t(p.name), i, stateBadge(p.access[f.key]))),
      ),
    );
    const table = el(
      "table",
      { class: "pcmp" },
      el("caption", { class: "sr-only", text: t(COPY.compare) }),
      el("thead", null, head),
      el(
        "tbody",
        null,
        infoRow(t(COPY.age), (p) => t(p.age)),
        infoRow(t(COPY.schedule), (p) => t(p.schedule)),
        ...featRows,
        infoRow(t(COPY.registration), (p) => money(p.registrationFee)),
        infoRow(t(COPY.supplies), (p) => money(p.supplyFee)),
        infoRow(t(COPY.monthly), (p) => money(p.monthlyFee)),
      ),
    );
    const faqHost = el("div", { class: "pfaq__list" });
    renderAccordion(
      faqHost,
      data.faq.map((x) => ({ q: t(x.q), a: t(x.a) })),
    );
    const wa = waForPage("biaya");
    const root = el(
      "div",
      { class: "container pricing__inner" },
      el(
        "div",
        { class: "section-head", "data-reveal": "" },
        el("p", { class: "eyebrow", text: t(COPY.eyebrow) }),
        el("h2", { id: "judul-biaya", text: t(COPY.title) }),
        el("p", { class: "lead", text: t(COPY.lead) }),
        data.isDemoData ? el("p", { class: "pricing__note", text: t(data.note) }) : null,
      ),
      el("div", { class: "ptabs", role: "group", "aria-label": t(COPY.pick) }, ...tabs),
      main,
      el(
        "div",
        { class: "pcta" },
        wa
          ? el("a", { class: "btn btn--primary", href: wa, target: "_blank", rel: "noopener", text: t(COPY.askFees) })
          : null,
        el("a", { class: "btn btn--ghost", href: "pages/pendaftaran.html", text: t(COPY.enroll) }),
        el("a", { class: "link-go", href: "pages/jadwalkan-kunjungan.html", text: t(COPY.visit) }),
      ),
      el(
        "div",
        { class: "pcmp-wrap" },
        el("h3", { class: "pricing__sub", text: t(COPY.compare) }),
        table,
      ),
      el(
        "div",
        { class: "pfaq" },
        el("h3", { class: "pricing__sub", text: t(COPY.faq) }),
        faqHost,
        el("a", { class: "link-go", href: "pages/kontak.html", text: t(COPY.contact) }),
      ),
    );
    host.replaceChildren(root);
    root.querySelectorAll("[data-reveal]").forEach((n) => n.classList.add("is-visible"));
    swap = false;
  };
  draw();
  onLang(draw);
  return { select: (i) => ((selected = i), draw()), lang: getLang };
}
