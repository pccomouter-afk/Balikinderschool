import { reduceMotion } from "./dom.js";
export function initReveal() {
  const items = [...document.querySelectorAll("[data-reveal]")];
  if (!items.length) return;
  const showAll = () => items.forEach((n) => n.classList.add("is-visible"));
  if (reduceMotion() || !("IntersectionObserver" in window)) {
    showAll();
    return;
  }
  document.documentElement.classList.add("js-reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  items.forEach((n) => {
    const d = n.dataset.reveal;
    if (d) n.style.setProperty("--reveal-delay", d + "ms");
    io.observe(n);
  });
  let moved = false;
  const mark = () => {
    moved = true;
  };
  window.addEventListener("scroll", mark, { passive: true, once: true });
  window.addEventListener("wheel", mark, { passive: true, once: true });
  window.addEventListener("touchmove", mark, { passive: true, once: true });
  window.addEventListener("keydown", mark, { once: true });
  window.setTimeout(() => {
    if (!moved) {
      io.disconnect();
      showAll();
    }
  }, 2400);
  window.addEventListener("beforeprint", () => {
    io.disconnect();
    showAll();
  });
}
