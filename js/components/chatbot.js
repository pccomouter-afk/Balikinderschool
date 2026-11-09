import { school, trackWhatsapp } from "../data/school.js";
import { resolveRoot } from "../foundation/paths.js";
import { getLang, onLang } from "../foundation/i18n.js";
import { chatConfig } from "../chatbot/config.js";
import { knowledgeBase } from "../chatbot/kb.js";
import { detect } from "../chatbot/intents.js";
import { respond } from "../chatbot/responder.js";
import { chatWaLink } from "../chatbot/wa.js";
import { createState } from "../chatbot/state.js";
import { icons } from "../chatbot/icons.js";
const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = () => window.matchMedia("(pointer: fine)").matches;
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
};
let started = false;
export function initChatbot() {
  const root = document.getElementById("chat");
  if (!root || started) return;
  started = true;
  const $ = (id) => document.getElementById(id);
  const panel = $("chat-panel");
  const toggle = $("chat-toggle");
  const log = $("chat-log");
  const form = $("chat-form");
  const input = $("chat-input");
  const send = $("chat-send");
  const errorBox = $("chat-error");
  const state = createState();
  const kb = () => knowledgeBase[getLang()] || knowledgeBase.id;
  let hideTimer = 0;
  let typingTimer = 0;
  let token = 0;
  let chain = Promise.resolve();
  let vvBound = false;
  const isOpen = () => panel.classList.contains("is-open");
  const setIcon = (node, name) => {
    node.innerHTML = icons[name];
  };
  setIcon(root.querySelector(".chat__toggle-icon--open"), "launcher");
  setIcon(root.querySelector(".chat__toggle-icon--close"), "chevron");
  setIcon($("chat-reset"), "refresh");
  setIcon($("chat-close"), "close");
  setIcon(send, "send");
  const labels = () => {
    const u = kb().ui;
    $("chat-title").textContent = u.title;
    $("chat-sub").textContent = u.subtitle;
    $("chat-toggle-label").textContent = u.launcher;
    toggle.setAttribute("aria-label", u.launcherLabel);
    panel.setAttribute("aria-label", u.dialogLabel);
    $("chat-close").setAttribute("aria-label", u.close);
    $("chat-close").title = u.close;
    $("chat-reset").setAttribute("aria-label", u.reset);
    $("chat-reset").title = u.reset;
    $("chat-label").textContent = u.inputLabel;
    input.placeholder = u.placeholder;
    send.setAttribute("aria-label", u.send);
    $("chat-hint").textContent = u.hint;
    log.setAttribute("aria-label", u.log);
  };
  const showError = (msg) => {
    errorBox.hidden = !msg;
    errorBox.textContent = msg || "";
    input.setAttribute("aria-invalid", msg ? "true" : "false");
  };
  const actionNode = (a) => {
    const u = kb().ui;
    if (a.t === "link") {
      const href = resolveRoot(a.href);
      const n = el("a", "chat__act chat__act--link");
      n.href = href;
      if (/^https?:/.test(href) && href.indexOf(location.origin) !== 0) {
        n.target = "_blank";
        n.rel = "noopener";
      }
      n.append(el("span", "", a.label));
      const i = el("span", "chat__ico");
      setIcon(i, "link");
      n.append(i);
      return n;
    }
    if (a.t === "wa") {
      const href = chatWaLink(a.topic, getLang(), a.q);
      if (!href) {
        const n = el("a", "chat__act chat__act--link");
        n.href = school.instagram;
        n.target = "_blank";
        n.rel = "noopener";
        n.append(el("span", "", u.instagram));
        return n;
      }
      const n = el("a", "chat__act chat__act--wa");
      n.href = href;
      n.target = "_blank";
      n.rel = "noopener";
      const i = el("span", "chat__ico");
      setIcon(i, "wa");
      n.append(i, el("span", "", a.label));
      n.addEventListener("click", () => trackWhatsapp("chatbot-" + a.topic));
      return n;
    }
    const n = el("button", "chat__act chat__act--choice");
    n.type = "button";
    n.dataset.chatAct = "1";
    n._act = a;
    if (a.icon && icons[a.icon]) {
      const i = el("span", "chat__ico");
      setIcon(i, a.icon);
      n.append(i);
    }
    n.append(el("span", "", a.label));
    return n;
  };
  const botNode = (d) => {
    const lang = getLang();
    const r = respond(d, lang);
    const m = el("div", "chat__msg chat__msg--bot");
    m.append(el("span", "sr-only", kb().ui.botSaid + ": "));
    r.paras.forEach((p) => m.append(el("p", "chat__p", p)));
    if (r.bullets.length) {
      const ul = el("ul", "chat__list");
      r.bullets.forEach((b) => ul.append(el("li", "", b)));
      m.append(ul);
    }
    if (r.note) m.append(el("p", "chat__note", r.note));
    if (r.actions.length) {
      const box = el("div", "chat__acts" + (r.layout === "grid" ? " chat__acts--grid" : ""));
      r.actions.forEach((a) => box.append(actionNode(a)));
      m.append(box);
    }
    return m;
  };
  const userNode = (text) => {
    const m = el("div", "chat__msg chat__msg--user");
    m.append(el("span", "sr-only", kb().ui.userSaid + ": "), document.createTextNode(text));
    return m;
  };
  const nodeFor = (m) => (m.who === "user" ? userNode(m.text) : botNode(m.d));
  const toEnd = () => {
    log.scrollTo({ top: log.scrollHeight, behavior: reduce() ? "auto" : "smooth" });
  };
  const toMessage = (n) => {
    const top = Math.max(0, n.offsetTop - 12);
    const max = log.scrollHeight - log.clientHeight;
    const fits = n.offsetHeight <= log.clientHeight - 24;
    log.scrollTo({ top: fits ? max : Math.min(top, max), behavior: reduce() ? "auto" : "smooth" });
  };
  const renderAll = () => {
    log.setAttribute("aria-live", "off");
    log.replaceChildren(...state.list().map(nodeFor));
    window.setTimeout(() => log.setAttribute("aria-live", "polite"), 60);
  };
  const typingNode = () => {
    const m = el("div", "chat__msg chat__msg--bot chat__msg--typing");
    m.setAttribute("role", "status");
    m.setAttribute("aria-label", kb().ui.typing);
    for (let i = 0; i < 3; i++) {
      const d = el("span", "chat__dot");
      d.setAttribute("aria-hidden", "true");
      m.append(d);
    }
    return m;
  };
  const addUser = (text) => {
    const m = { who: "user", text };
    state.push(m);
    const n = userNode(text);
    log.append(n);
    toEnd();
  };
  const addBot = (d) => {
    const mine = token;
    chain = chain.then(
      () =>
        new Promise((resolve) => {
          if (mine !== token) return resolve();
          const t = typingNode();
          log.append(t);
          toEnd();
          const wait = reduce() ? 0 : chatConfig.typingMs;
          typingTimer = window.setTimeout(() => {
            t.remove();
            if (mine === token) {
              state.push({ who: "bot", d });
              const n = botNode(d);
              log.append(n);
              toMessage(n);
            }
            resolve();
          }, wait);
        }),
    );
  };
  const ask = (raw) => {
    const text = String(raw || "").replace(/\s+/g, " ").trim();
    if (!text) return false;
    if (text.length > chatConfig.maxLength) {
      showError(kb().ui.tooLong.replace("{n}", String(chatConfig.maxLength)));
      return false;
    }
    showError("");
    addUser(text);
    addBot(detect(text, state.lastBot()));
    return true;
  };
  const choose = (a) => {
    if (a.t === "ask") {
      ask(a.q);
      return;
    }
    const d = { id: a.to.id, arg: a.to.arg || "" };
    addUser(a.label);
    addBot(d);
    if (d.id === "other") window.setTimeout(() => input.focus({ preventScroll: true }), 0);
  };
  const fit = () => {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 112) + "px";
  };
  const sync = () => {
    send.disabled = !input.value.trim();
    if (input.value.length <= chatConfig.maxLength && !errorBox.hidden) showError("");
    fit();
  };
  const adjust = () => {
    const vv = window.visualViewport;
    if (!vv) return;
    const kbH = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
    root.style.setProperty("--chat-kb", kbH + "px");
    root.style.setProperty("--chat-vh", vv.height + "px");
  };
  const bindViewport = (on) => {
    const vv = window.visualViewport;
    if (!vv) return;
    if (on && !vvBound) {
      vv.addEventListener("resize", adjust);
      vv.addEventListener("scroll", adjust);
      vvBound = true;
      adjust();
    } else if (!on && vvBound) {
      vv.removeEventListener("resize", adjust);
      vv.removeEventListener("scroll", adjust);
      vvBound = false;
      root.style.removeProperty("--chat-kb");
      root.style.removeProperty("--chat-vh");
    }
  };
  const setOpen = (open) => {
    window.clearTimeout(hideTimer);
    toggle.setAttribute("aria-expanded", String(open));
    root.classList.toggle("is-open", open);
    if (open) {
      panel.hidden = false;
      void panel.offsetWidth;
      panel.classList.add("is-open");
      bindViewport(true);
      log.scrollTop = log.scrollHeight;
      if (fine()) input.focus({ preventScroll: true });
      else panel.focus({ preventScroll: true });
    } else {
      panel.classList.remove("is-open");
      bindViewport(false);
      hideTimer = window.setTimeout(
        () => {
          panel.hidden = true;
        },
        reduce() ? 0 : 220,
      );
    }
  };
  const reset = () => {
    token++;
    window.clearTimeout(typingTimer);
    chain = Promise.resolve();
    state.reset();
    state.push({ who: "bot", d: { id: "menu" } });
    showError("");
    input.value = "";
    sync();
    renderAll();
    log.scrollTop = 0;
    if (fine()) input.focus({ preventScroll: true });
  };
  if (!state.list().length) state.push({ who: "bot", d: { id: "menu" } });
  labels();
  renderAll();
  sync();
  toggle.addEventListener("click", () => setOpen(!isOpen()));
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches)
    window.setTimeout(() => root.classList.add("is-compact"), 6000);
  $("chat-close").addEventListener("click", () => {
    setOpen(false);
    toggle.focus();
  });
  $("chat-reset").addEventListener("click", reset);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });
  log.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-chat-act]");
    if (b && b._act) choose(b._act);
  });
  input.addEventListener("input", sync);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      form.requestSubmit();
    }
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (ask(input.value)) {
      input.value = "";
      sync();
    }
  });
  onLang(() => {
    token++;
    window.clearTimeout(typingTimer);
    chain = Promise.resolve();
    labels();
    if (errorBox.hidden === false) showError(kb().ui.tooLong.replace("{n}", String(chatConfig.maxLength)));
    renderAll();
    log.scrollTop = log.scrollHeight;
  });
}
