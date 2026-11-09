import { faqHome, flatFaq } from "../data/faq.js";
import { onLang } from "../foundation/i18n.js";
import { renderAccordion } from "../components/accordion.js";
import { initEnquiryForm } from "../components/enquiry-form.js";
export function initPage() {
  const list = document.getElementById("faq-list");
  const drawFaq = () => renderAccordion(list, flatFaq(faqHome));
  if (list) {
    drawFaq();
    onLang(drawFaq);
  }
  initEnquiryForm();
  const steps = [...document.querySelectorAll(".trail__step")];
  const result = document.getElementById("enquiry-result");
  const mark = () => {
    const ready = result && !result.hidden;
    steps.forEach((s, i) => {
      const n = i + 1;
      s.classList.toggle("is-done", n === 1 ? false : ready && n === 2);
      if ((ready && n === 3) || (!ready && n === 2))
        s.setAttribute("aria-current", "step");
      else s.removeAttribute("aria-current");
    });
  };
  if (result)
    new MutationObserver(mark).observe(result, {
      attributes: true,
      attributeFilter: ["hidden"],
    });
  mark();
}
