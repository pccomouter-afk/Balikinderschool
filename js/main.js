import { loadComponent } from "./foundation/component-loader.js";
import { initReveal } from "./foundation/reveal.js";
import {
  school,
  directionsUrl,
  waForPage,
  trackWhatsapp,
} from "./data/school.js";
import { initI18n, onLang, applyAll } from "./foundation/i18n.js";
import { inlineSvgs } from "./components/inline-svg.js";
import { initStages } from "./components/stage.js";
import { startIntro } from "./components/intro.js";
const intro = startIntro();
const page = document.body.dataset.page;
const pageModules = {
  "jadwalkan-kunjungan": "./pages/visit.js",
  kalender: "./pages/calendar.js",
  index: "./pages/home.js",
  tentang: "./pages/about.js",
  ["program-belajar"]: "./pages/program.js",
  ["dunia-bermain"]: "./pages/play.js",
  pendaftaran: "./pages/register.js",
  faq: "./pages/faq.js",
  berita: "./pages/news.js",
  ["berita-detail"]: "./pages/news.js",
  fasilitas: "./pages/facilities.js",
  ["kehidupan-sekolah"]: "./pages/school-life.js",
  kontak: "./pages/contact.js",
};
const hasScene = !!document.querySelector("[data-float3d]");
if (hasScene) import("./components/float3d.js").then((m) => m.initFloat3d());
initStages();
const svgReady = inlineSvgs();
const [navOk, , chatOk] = await Promise.all([
  loadComponent("#navbar-root", "components/navbar.html"),
  loadComponent("#footer-root", "components/footer.html"),
  loadComponent("#chatbot-root", "components/chatbot.html"),
]);
initI18n();
document.querySelectorAll('[data-school="address"]').forEach((n) => {
  n.textContent = school.address;
});
document.querySelectorAll('[data-school="directions"]').forEach((n) => {
  n.href = directionsUrl();
});
const bindWa = () => {
  document.querySelectorAll("[data-wa]").forEach((a) => {
    const key = a.dataset.wa || page;
    const href = waForPage(key);
    if (!href) return;
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    a.hidden = false;
    if (!a.dataset.waBound) {
      a.dataset.waBound = "1";
      a.addEventListener("click", () => trackWhatsapp(key));
    }
  });
};
bindWa();
onLang(bindWa);
document.querySelectorAll("[data-year]").forEach((n) => {
  n.textContent = String(new Date().getFullYear());
});
document.querySelectorAll('[data-school="phone"]').forEach((n) => {
  n.textContent = school.phoneLocal;
  n.href = "tel:" + school.phoneLocal;
});
if (navOk) (await import("./components/navbar.js")).initNavbar(page);
if (chatOk) (await import("./components/chatbot.js")).initChatbot();
(await import("./components/section-data.js")).initDataSections();
await svgReady;
if (pageModules[page]) (await import(pageModules[page])).initPage();
(await import("./components/draw-line.js")).initDrawLines();
initReveal();
applyAll();
intro.ready();
