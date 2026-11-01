import { school, mapEmbedUrl, directionsUrl } from "../data/school.js";
import { onLang } from "../foundation/i18n.js";
export function initPage() {
  document.querySelectorAll('[data-school="address"]').forEach((n) => {
    n.textContent = school.address;
  });
  document.querySelectorAll('[data-school="directions"]').forEach((n) => {
    n.href = directionsUrl();
  });
  const frame = document.getElementById("map-frame");
  const set = () => {
    if (frame) frame.src = mapEmbedUrl();
  };
  set();
  onLang(set);
}
