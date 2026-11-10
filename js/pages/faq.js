import { faq, faqGroups } from "../data/faq.js";
import { renderAccordion } from "../components/accordion.js";
import { el } from "../foundation/dom.js";
import { P, L, onLang } from "../foundation/i18n.js";
export function initPage() {
  const host = document.getElementById("faq-groups");
  const nav = document.getElementById("faq-nav");
  const q = document.getElementById("faq-q");
  const count = document.getElementById("faq-count");
  const empty = document.getElementById("faq-empty");
  const state = { cat: "all", q: "" };
  const flat = (item) => ({ q: P(item.q), a: P(item.a) });
  const paint = () => {
    const term = state.q.trim().toLowerCase();
    host.replaceChildren();
    let shown = 0;
    faqGroups.forEach((g, gi) => {
      if (state.cat !== "all" && state.cat !== g.key) return;
      const items = faq.filter(
        (f) =>
          f.g.key === g.key &&
          (!term || (P(f.q) + " " + P(f.a)).toLowerCase().includes(term)),
      );
      if (!items.length) return;
      shown += items.length;
      const list = el("div", { class: "accordion" });
      renderAccordion(list, items.map(flat));
      list.querySelectorAll("[id^=acc-]").forEach((n) => {
        const re = /acc-(btn|panel)-(\d+)/;
        const fix = (a) => {
          const v = n.getAttribute(a);
          if (v)
            n.setAttribute(
              a,
              v.replace(re, (m, k, d) => "acc-" + k + "-g" + gi + "-" + d),
            );
        };
        n.id = n.id.replace(re, (m, k, d) => "acc-" + k + "-g" + gi + "-" + d);
        fix("aria-controls");
        fix("aria-labelledby");
      });
      host.appendChild(
        el(
          "section",
          { class: "faq-group", "aria-labelledby": "faq-" + gi + "-h" },
          el("h2", { id: "faq-" + gi + "-h", text: P(g) }),
          list,
        ),
      );
    });
    empty.hidden = shown > 0;
    count.textContent = shown ? shown + L(" pertanyaan", " questions") : "";
    [...nav.children].forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.cat === state.cat)),
    );
  };
  const buildNav = () => {
    const cats = [{ key: "all", id: "Semua", en: "All" }, ...faqGroups];
    nav.replaceChildren(
      ...cats.map((c) => {
        const b = el("button", {
          class: "chip",
          type: "button",
          "data-cat": c.key,
          "aria-pressed": "false",
          text: P(c),
        });
        b.addEventListener("click", () => {
          state.cat = c.key;
          paint();
        });
        return b;
      }),
    );
  };
  q.addEventListener("input", () => {
    state.q = q.value;
    paint();
  });
  document.getElementById("faq-reset").addEventListener("click", () => {
    state.cat = "all";
    state.q = "";
    q.value = "";
    paint();
  });
  buildNav();
  paint();
  onLang(() => {
    buildNav();
    paint();
  });
}
