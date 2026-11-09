import { pricing } from "../data/pricing.js";
import { renderPricing } from "../components/pricing.js";
export function initPage() {
  const pricingHost = document.querySelector("[data-pricing]");
  if (pricingHost) renderPricing(pricingHost, pricing);
  const tiles = [...document.querySelectorAll(".pm[data-target]")];
  if (!tiles.length || !("IntersectionObserver" in window)) return;
  const rows = tiles
    .map((t) => document.getElementById(t.dataset.target))
    .filter(Boolean);
  const io = new IntersectionObserver(
    (es) => {
      es.forEach((e) => {
        if (e.isIntersecting)
          tiles.forEach((t) =>
            t.classList.toggle("is-current", t.dataset.target === e.target.id),
          );
      });
    },
    { rootMargin: "-40% 0px -50% 0px" },
  );
  rows.forEach((r) => io.observe(r));
}
