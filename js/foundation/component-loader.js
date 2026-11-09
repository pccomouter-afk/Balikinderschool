import { root } from "./paths.js";
function anchorToRoot(host) {
  host.querySelectorAll("[src],[href]").forEach((node) => {
    ["src", "href"].forEach((attr) => {
      const v = node.getAttribute(attr);
      if (v && !v.startsWith("#") && !/^[a-z][a-z0-9+.-]*:/i.test(v))
        node.setAttribute(attr, new URL(v, root).href);
    });
  });
}
export async function loadComponent(selector, path) {
  const host = document.querySelector(selector);
  if (!host) return false;
  try {
    const res = await fetch(new URL(path, root));
    if (!res.ok) throw new Error(String(res.status));
    host.innerHTML = await res.text();
    anchorToRoot(host);
    return true;
  } catch (err) {
    host.innerHTML =
      '<p class="load-error">Bagian ini belum dapat dimuat. Buka situs melalui server lokal (misalnya Live Server) dari folder BaliGlobalKinderSchool.</p>';
    return false;
  }
}
