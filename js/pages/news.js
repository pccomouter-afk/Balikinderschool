import {
  news,
  newsNote,
  newsCategories,
  findNews,
  categoryOf,
} from "../data/news.js";
import { el } from "../foundation/dom.js";
import { P, L, onLang, getLang } from "../foundation/i18n.js";
import { waLink } from "../data/school.js";
const SIZE = 3;
const vt = (slug) => "news-" + slug;
const minutes = (a) => a.minutes + L(" menit baca", " min read");
const fmtDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString(
    getLang() === "en" ? "en-GB" : "id-ID",
    { day: "numeric", month: "long", year: "numeric" },
  );
const meta = (a) => fmtDate(a.date) + " · " + P(a.author) + " · " + minutes(a);
const href = (a) => "berita-detail.html?slug=" + encodeURIComponent(a.slug);
function card(a, cls) {
  return el(
    "li",
    null,
    el(
      "a",
      { class: "nc " + (cls || ""), href: href(a) },
      el(
        "span",
        { class: "nc__img" },
        el("img", {
          src: a.image,
          alt: P(a.alt),
          width: 520,
          height: 400,
          style: "view-transition-name:" + vt(a.slug),
        }),
      ),
      el(
        "span",
        { class: "nc__body" },
        el("span", { class: "nc__cat", text: P(categoryOf(a)) }),
        el("h3", { text: P(a.title) }),
        el("p", { text: P(a.summary) }),
        el("span", { class: "nc__meta", text: meta(a) }),
        el("span", {
          class: "link-go",
          text: L("Baca artikel", "Read article"),
        }),
      ),
    ),
  );
}
function renderList() {
  const feat = document.getElementById("news-featured");
  const grid = document.getElementById("news-grid");
  const filters = document.getElementById("news-filters");
  const pager = document.getElementById("news-pager");
  const empty = document.getElementById("news-empty");
  const search = document.getElementById("news-q");
  const count = document.getElementById("news-count");
  document.getElementById("news-note").textContent = P(newsNote);
  const first = news[0];
  feat.replaceChildren(
    el(
      "a",
      { class: "feat", href: href(first) },
      el(
        "span",
        { class: "feat__img" },
        el("img", {
          src: first.image,
          alt: P(first.alt),
          width: 520,
          height: 400,
          style: "view-transition-name:" + vt(first.slug),
        }),
      ),
      el(
        "span",
        { class: "feat__body" },
        el("span", { class: "nc__cat", text: P(categoryOf(first)) }),
        el("h2", { text: P(first.title) }),
        el("p", { text: P(first.summary) }),
        el("span", { class: "nc__meta", text: meta(first) }),
        el("span", {
          class: "btn btn--primary btn--go",
          text: L("Baca artikel", "Read article"),
        }),
      ),
    ),
  );
  const rest = news.slice(1);
  const state = { cat: "all", q: "", page: 1 };
  const matches = () =>
    rest.filter((a) => {
      if (state.cat !== "all" && a.cat !== state.cat) return false;
      const q = state.q.trim().toLowerCase();
      if (!q) return true;
      return (P(a.title) + " " + P(a.summary) + " " + P(categoryOf(a)))
        .toLowerCase()
        .includes(q);
    });
  const paint = () => {
    const list = matches();
    const pages = Math.max(1, Math.ceil(list.length / SIZE));
    state.page = Math.min(state.page, pages);
    const slice = list.slice((state.page - 1) * SIZE, state.page * SIZE);
    grid.replaceChildren(
      ...slice.map((a, i) =>
        card(a, i === 0 && slice.length > 1 ? "nc--wide" : ""),
      ),
    );
    empty.hidden = list.length > 0;
    count.textContent = list.length
      ? list.length + L(" artikel", " articles")
      : "";
    [...filters.children].forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.cat === state.cat)),
    );
    pager.replaceChildren();
    pager.hidden = pages < 2;
    for (let p = 1; p <= pages; p++) {
      const b = el("button", {
        class: "chip",
        type: "button",
        "aria-label": L("Halaman ", "Page ") + p,
        text: String(p),
      });
      if (p === state.page) b.setAttribute("aria-current", "page");
      b.addEventListener("click", () => {
        state.page = p;
        paint();
        grid.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      pager.appendChild(b);
    }
  };
  const cats = [{ key: "all", id: "Semua", en: "All" }, ...newsCategories];
  filters.replaceChildren(
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
        state.page = 1;
        paint();
      });
      return b;
    }),
  );
  search.oninput = () => {
    state.q = search.value;
    state.page = 1;
    paint();
  };
  document.getElementById("news-reset").onclick = () => {
    state.cat = "all";
    state.q = "";
    search.value = "";
    state.page = 1;
    paint();
  };
  paint();
}
function toc(a) {
  return el(
    "nav",
    { class: "art__toc", "aria-label": L("Daftar isi", "Table of contents") },
    el("p", {
      class: "art__toc-t",
      text: L("Daftar isi", "Table of contents"),
    }),
    el(
      "ol",
      null,
      ...a.sections.map((s, i) =>
        el("li", null, el("a", { href: "#bagian-" + i, text: P(s.h) })),
      ),
    ),
  );
}
function renderDetail() {
  const slug = new URLSearchParams(location.search).get("slug") || "";
  const a = /^[a-z0-9-]{1,80}$/.test(slug) ? findNews(slug) : null;
  const root = document.getElementById("article-root");
  const crumb = document.getElementById("crumb-current");
  if (!a) {
    document.title =
      L("Artikel tidak ditemukan", "Article not found") +
      " | Bali Global Kinder School";
    crumb.textContent = L("Artikel", "Article");
    root.replaceChildren(
      el(
        "div",
        { class: "empty" },
        el("h1", { text: L("Artikel tidak ditemukan.", "Article not found.") }),
        el("p", {
          class: "muted",
          text: L(
            "Tautan yang dibuka tidak cocok dengan artikel mana pun.",
            "The link you opened does not match any article.",
          ),
        }),
        el("a", {
          class: "btn btn--primary",
          href: "berita.html",
          text: L(
            "Kembali ke Berita dan Kegiatan",
            "Back to News and Activities",
          ),
        }),
      ),
    );
    return;
  }
  document.title = P(a.title) + " | Bali Global Kinder School";
  crumb.textContent = P(a.title);
  const body = el(
    "div",
    { class: "art__body" },
    el("p", { class: "art__intro", text: P(a.intro) }),
    ...a.sections.flatMap((s, i) => [
      el("h2", { id: "bagian-" + i, text: P(s.h) }),
      ...s.p.map((t) => el("p", { text: P(t) })),
      s.list
        ? el("ul", null, ...s.list.map((t) => el("li", { text: P(t) })))
        : null,
    ]),
    el("p", { class: "art__closing", text: P(a.closing) }),
  );
  const idx = news.indexOf(a);
  const prev = news[idx - 1];
  const next = news[idx + 1];
  const related = news
    .filter((x) => x.slug !== a.slug && x.cat === a.cat)
    .concat(news.filter((x) => x.slug !== a.slug && x.cat !== a.cat))
    .slice(0, 3);
  const url = location.href.split("#")[0];
  const wa = waLink(P(a.title) + "\n" + url);
  const status = el("span", { class: "art__status", "aria-live": "polite" });
  const copy = el("button", {
    class: "btn btn--ghost btn--sm",
    type: "button",
    text: L("Salin tautan", "Copy link"),
  });
  copy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(url);
      status.textContent = L("Tautan disalin.", "Link copied.");
    } catch (err) {
      status.textContent = L(
        "Belum dapat menyalin otomatis.",
        "Could not copy automatically.",
      );
    }
  });
  const pn = el(
    "nav",
    {
      class: "art__pn",
      "aria-label": L(
        "Artikel sebelumnya dan berikutnya",
        "Previous and next articles",
      ),
    },
    prev
      ? el(
          "a",
          { href: href(prev), rel: "prev" },
          el("span", { class: "caption", text: L("Sebelumnya", "Previous") }),
          el("b", { text: P(prev.title) }),
        )
      : el("span"),
    next
      ? el(
          "a",
          { href: href(next), rel: "next" },
          el("span", { class: "caption", text: L("Berikutnya", "Next") }),
          el("b", { text: P(next.title) }),
        )
      : el("span"),
  );
  root.replaceChildren(
    el(
      "header",
      { class: "art__head" },
      el("span", { class: "nc__cat", text: P(categoryOf(a)) }),
      el("h1", { text: P(a.title) }),
      el("p", { class: "lead", text: P(a.summary) }),
      el("p", { class: "nc__meta", text: meta(a) }),
    ),
    el(
      "div",
      { class: "art__layout" },
      el(
        "figure",
        { class: "art__fig" },
        el("img", {
          src: a.image,
          alt: P(a.alt),
          width: 520,
          height: 400,
          style: "view-transition-name:" + vt(a.slug),
        }),
        el("figcaption", {
          class: "caption",
          text: L("Ilustrasi konsep.", "Concept illustration."),
        }),
      ),
      el("div", null, a.sections.length > 2 ? toc(a) : null, body),
    ),
    el(
      "div",
      { class: "art__share" },
      el("a", {
        class: "btn btn--primary btn--sm",
        href: wa,
        target: "_blank",
        rel: "noopener",
        text: L("Bagikan via WhatsApp", "Share on WhatsApp"),
      }),
      copy,
      status,
    ),
    pn,
    el("aside", { class: "art__note" }, el("p", { text: P(newsNote) })),
    el(
      "section",
      { class: "art__related", "aria-labelledby": "rel-h" },
      el("h2", { id: "rel-h", text: L("Artikel terkait", "Related articles") }),
      el("ul", { class: "news-grid" }, ...related.map((r) => card(r))),
    ),
  );
}
export function initPage() {
  const detail = document.body.dataset.page === "berita-detail";
  const run = detail ? renderDetail : renderList;
  run();
  onLang(run);
}
