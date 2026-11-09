import { en } from "../i18n/en.js";
const KEY = "bgks-lang";
const LANGS = ["id", "en"];
const ATTRS = ["alt", "aria-label", "title", "placeholder"];
const SKIP = new Set(["SCRIPT", "STYLE", "TEXTAREA", "NOSCRIPT", "CODE"]);
const norm = (s) => s.replace(/\s+/g, " ").trim();
const originals = new WeakMap();
let current = "id";
let observer = null;
const read = () => {
  try {
    const q = new URLSearchParams(location.search).get("lang");
    if (LANGS.includes(q)) {
      localStorage.setItem(KEY, q);
      return q;
    }
    const s = localStorage.getItem(KEY);
    if (LANGS.includes(s)) return s;
  } catch (err) {
    return "id";
  }
  return "id";
};
export const getLang = () => current;
export const L = (id, enText) => (current === "en" ? enText : id);
export function t(id) {
  if (current !== "en" || typeof id !== "string") return id;
  return en[norm(id)] || id;
}
function lookup(source) {
  const key = norm(source);
  return en[key] || null;
}
function textNode(node) {
  const parent = node.parentNode;
  if (!parent || SKIP.has(parent.nodeName)) return;
  if (parent.closest && parent.closest('[translate="no"]')) return;
  let rec = originals.get(node);
  if (current === "en") {
    const base = rec ? rec.id : node.data;
    const hit = lookup(base);
    if (!hit) return;
    if (!rec) {
      rec = { id: base, out: "" };
      originals.set(node, rec);
    }
    const lead = base.match(/^\s*/)[0];
    const trail = base.match(/\s*$/)[0];
    const out = lead + hit + trail;
    rec.out = out;
    if (node.data !== out) node.data = out;
  } else if (rec && node.data === rec.out) {
    node.data = rec.id;
    originals.delete(node);
  }
}
function attrs(node) {
  if (node.nodeType !== 1) return;
  if (node.closest('[translate="no"]')) return;
  ATTRS.forEach((a) => {
    if (!node.hasAttribute(a)) return;
    const store = "data-i18n-" + a;
    const out = "data-i18n-out-" + a;
    const val = node.getAttribute(a);
    const owned = node.hasAttribute(store) && val === node.getAttribute(out);
    if (current === "en") {
      const base = owned ? node.getAttribute(store) : val;
      const hit = lookup(base);
      if (!hit) return;
      node.setAttribute(store, base);
      node.setAttribute(out, hit);
      if (val !== hit) node.setAttribute(a, hit);
    } else if (owned) {
      node.setAttribute(a, node.getAttribute(store));
      node.removeAttribute(store);
      node.removeAttribute(out);
    }
  });
}
function explicit(node) {
  if (node.nodeType !== 1) return;
  const holders = node.matches && node.matches("[data-en]") ? [node] : [];
  holders.push(...node.querySelectorAll("[data-en]"));
  holders.forEach((h) => {
    if (!h.hasAttribute("data-id")) h.setAttribute("data-id", h.textContent);
    h.textContent =
      current === "en" ? h.getAttribute("data-en") : h.getAttribute("data-id");
  });
}
function walk(root) {
  if (root.nodeType === 3) {
    textNode(root);
    return;
  }
  if (root.nodeType !== 1 && root.nodeType !== 11) return;
  if (root.nodeType === 1) {
    if (SKIP.has(root.nodeName)) return;
    attrs(root);
  }
  const tw = document.createTreeWalker(
    root,
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
  );
  let n = tw.nextNode();
  while (n) {
    if (n.nodeType === 3) textNode(n);
    else if (!SKIP.has(n.nodeName)) attrs(n);
    n = tw.nextNode();
  }
}
function head() {
  const title = document.querySelector("title");
  if (title) {
    if (!title.dataset.id) title.dataset.id = title.textContent;
    const hit = current === "en" ? lookup(title.dataset.id) : null;
    document.title = hit || title.dataset.id;
  }
  document
    .querySelectorAll(
      'meta[name="description"],meta[property="og:title"],meta[property="og:description"],meta[name="twitter:title"],meta[name="twitter:description"]',
    )
    .forEach((m) => {
      if (!m.dataset.id) m.dataset.id = m.getAttribute("content");
      const hit = current === "en" ? lookup(m.dataset.id) : null;
      m.setAttribute("content", hit || m.dataset.id);
    });
  const loc = document.querySelector('meta[property="og:locale"]');
  if (loc) loc.setAttribute("content", current === "en" ? "en_US" : "id_ID");
  document.documentElement.lang = current;
}
function mark() {
  document.querySelectorAll("[data-lang-set]").forEach((b) => {
    const on = b.dataset.langSet === current;
    b.setAttribute("aria-checked", String(on));
  });
  document.querySelectorAll("[data-lang-code]").forEach((n) => {
    n.textContent = current.toUpperCase();
  });
  document.querySelectorAll("[data-lang-flag]").forEach((n) => {
    n.setAttribute("href", "#flag-" + current);
  });
}
export function applyAll() {
  if (observer) observer.disconnect();
  head();
  walk(document.body);
  explicit(document.body);
  mark();
  if (observer) watch();
}
function watch() {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ATTRS,
  });
}
export function setLang(lang) {
  if (!LANGS.includes(lang) || lang === current) return;
  current = lang;
  try {
    localStorage.setItem(KEY, lang);
  } catch (err) {}
  applyAll();
  document.dispatchEvent(new CustomEvent("bgks:lang", { detail: { lang } }));
}
export function onLang(fn) {
  document.addEventListener("bgks:lang", (e) => fn(e.detail.lang));
}
export function initI18n() {
  current = read();
  observer = new MutationObserver((list) => {
    if (current !== "en") return;
    observer.disconnect();
    list.forEach((m) => {
      if (m.type === "attributes") {
        attrs(m.target);
        return;
      }
      m.addedNodes.forEach((n) => {
        walk(n);
        explicit(n);
      });
    });
    watch();
  });
  applyAll();
  watch();
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-lang-set]");
    if (b) {
      e.preventDefault();
      setLang(b.dataset.langSet);
    }
  });
}
export const P = (value) => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  return value[current] || value.id || "";
};
