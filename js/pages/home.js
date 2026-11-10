import { faqHome, flatFaq } from "../data/faq.js";
import { onLang } from "../foundation/i18n.js";
import { playground } from "../data/playground.js";
import { renderAccordion } from "../components/accordion.js";
import { renderPlaygroundHome } from "../components/playground-home.js";
import { initMascot } from "../components/mascot.js";
import { initShowcase } from "../components/showcase.js";
export function initPage() {
  const faqList = document.getElementById("faq-list");
  const drawFaq = () => renderAccordion(faqList, flatFaq(faqHome));
  drawFaq();
  onLang(drawFaq);
  renderPlaygroundHome(document.getElementById("playground-root"), playground, {
    link: { href: "pages/dunia-bermain.html", label: "Buka Dunia Bermain" },
  });
  initMascot(document.querySelector("[data-mascot]"));
  initShowcase(document.querySelector("[data-showcase]"));
}
