const KEY = "bgks-intro-seen";
const LINES = ["Bali Global", "Kinder School"];
const MIN_MS = 3400;
const REDUCED_MS = 700;
const SCENE_WAIT_MS = 1600;
const SLOW_MS = 3200;
const MAX_MS = 6000;
const FONT_WAIT_MS = 1500;
const EXIT_MS = 1700;
const COPY = {
  id: {
    loading: "Memuat Bali Global Kinder School",
    slow: "Masih memuat, mohon tunggu sebentar",
    done: "Halaman siap",
  },
  en: {
    loading: "Loading Bali Global Kinder School",
    slow: "Still loading, one moment",
    done: "Page ready",
  },
};
const root = document.documentElement;
const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
const language = () => {
  try {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "id") return q;
    return localStorage.getItem("bgks-lang") === "en" ? "en" : "id";
  } catch (err) {
    return "id";
  }
};
const shouldRun = () => {
  try {
    if (sessionStorage.getItem(KEY)) return false;
    sessionStorage.setItem(KEY, "1");
    return true;
  } catch (err) {
    return false;
  }
};
const lightweight = () => {
  const link = navigator.connection;
  if (!link) return false;
  return !!link.saveData || /2g$/.test(link.effectiveType || "");
};
const node = (tag, className, text) => {
  const n = document.createElement(tag);
  if (className) n.className = className;
  if (text) n.textContent = text;
  return n;
};
const buildTitle = () => {
  const title = node("p", "entry__title");
  LINES.forEach((line, i) => {
    const mask = node("span", "entry__line");
    mask.style.setProperty("--i", String(i));
    mask.append(node("span", "", line));
    title.append(mask);
  });
  return title;
};
const loadScene = async (host, onLost) => {
  const mod = await import("./intro-scene.js");
  return mod.createIntroScene(host, onLost);
};
export function startIntro() {
  if (!shouldRun()) {
    root.classList.remove("has-intro", "intro-lock");
    return { ready() {} };
  }
  const text = COPY[language()];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const status = node("p", "sr-only", text.loading);
  const slow = node("p", "entry__slow", text.slow);
  slow.hidden = true;
  const bg = node("div", "entry__bg");
  bg.setAttribute("aria-hidden", "true");
  bg.append(
    node("span", "entry__blob entry__blob--a"),
    node("span", "entry__blob entry__blob--b"),
  );
  const stage = node("div", "entry__stage");
  stage.append(node("div", "entry__flat"));
  const copy = node("div", "entry__copy");
  copy.append(
    node("div", "entry__logo"),
    buildTitle(),
    node("p", "entry__tag", "LEARN \u00b7 PLAY \u00b7 GROW"),
  );
  const inner = node("div", "entry__inner");
  inner.setAttribute("aria-hidden", "true");
  inner.append(stage, copy);
  const overlay = node("div", "entry");
  overlay.setAttribute("role", "status");
  overlay.setAttribute("aria-live", "polite");
  overlay.setAttribute("aria-busy", "true");
  overlay.classList.toggle("is-reduced", reduce);
  overlay.append(status, bg, inner, slow, node("div", "entry__edge"));
  document.body.append(overlay);
  const shielded = [...document.body.children].filter((n) => n !== overlay);
  shielded.forEach((n) => n.setAttribute("inert", ""));
  root.classList.remove("has-intro");
  let finished = false;
  let scene = null;
  let markReady = () => {};
  const pageReady = new Promise((resolve) => {
    markReady = resolve;
  });
  const showFlat = () => {
    overlay.classList.remove("has-scene");
    overlay.classList.add("is-flat");
  };
  const onLost = () => {
    if (!scene) return;
    scene.dispose();
    scene = null;
    showFlat();
  };
  const begin = async () => {
    if (reduce || lightweight()) {
      showFlat();
      overlay.classList.add("is-live");
      return;
    }
    const loading = loadScene(stage, onLost).catch(() => null);
    const first = await Promise.race([
      loading,
      wait(SCENE_WAIT_MS).then(() => undefined),
    ]);
    if (finished) {
      if (first) first.dispose();
      return;
    }
    if (first) {
      scene = first;
      overlay.classList.add("has-scene");
      scene.start();
    } else {
      showFlat();
      loading.then((late) => {
        if (late) late.dispose();
      });
    }
    overlay.classList.add("is-live");
  };
  const finish = () => {
    if (finished) return;
    finished = true;
    window.clearTimeout(slowTimer);
    window.clearTimeout(maxTimer);
    status.textContent = text.done;
    overlay.setAttribute("aria-busy", "false");
    shielded.forEach((n) => n.removeAttribute("inert"));
    root.classList.remove("intro-lock");
    overlay.classList.add("is-leaving");
    window.setTimeout(
      () => {
        overlay.remove();
        if (scene) scene.dispose();
        scene = null;
      },
      reduce ? 400 : EXIT_MS,
    );
  };
  const slowTimer = window.setTimeout(() => {
    if (!finished) slow.hidden = false;
  }, SLOW_MS);
  const maxTimer = window.setTimeout(finish, MAX_MS);
  const fonts = document.fonts
    ? Promise.race([document.fonts.ready, wait(FONT_WAIT_MS)])
    : Promise.resolve();
  const played = begin()
    .catch(() => {
      showFlat();
      overlay.classList.add("is-live");
    })
    .then(() => wait(reduce ? REDUCED_MS : MIN_MS));
  Promise.all([played, fonts, pageReady]).then(finish);
  return { ready: markReady };
}
