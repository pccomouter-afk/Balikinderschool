import { el } from "../foundation/dom.js";
import { P, L, t, onLang } from "../foundation/i18n.js";
import { waLink } from "../data/school.js";
import { buildPdf, downloadBlob } from "../components/pdf.js";
const QUESTIONS = [
  "Bagaimana kondisi ruang kelas dan pencahayaannya?",
  "Apa saja area bermain yang tersedia di dalam dan luar ruangan?",
  "Bagaimana kebersihan dan kenyamanan toilet anak?",
  "Bagaimana pengaturan keamanan pintu masuk dan penjemputan?",
  "Di mana anak beristirahat atau makan bersama?",
  "Apakah ada area teduh untuk bermain di luar?",
  "Bagaimana pengawasan anak saat bermain?",
  "Perlengkapan apa yang disediakan sekolah dan apa yang dibawa dari rumah?",
];
const ZONES = {
  belajar: {
    name: "Ruang belajar",
    text: "Terang, bersih, dan memberi anak ruang bergerak.",
    q: [0, 2],
  },
  bermain: {
    name: "Area bermain",
    text: "Aman, teduh, dan sesuai usia anak.",
    q: [1, 5, 6],
  },
  aman: {
    name: "Keamanan",
    text: "Pengaturan penjemputan dan pengawasan anak.",
    q: [3, 6],
  },
  nyaman: {
    name: "Kenyamanan",
    text: "Toilet, tempat istirahat, dan area makan bersama.",
    q: [2, 4, 7],
  },
};
const GALLERY = [
  {
    image: "assets/illustrations/school-life.svg",
    id: "Halaman dan area luar",
    en: "Yard and outdoor area",
  },
  {
    image: "assets/illustrations/play-balok.svg",
    id: "Sudut balok dan permainan susun",
    en: "Block and building corner",
  },
  {
    image: "assets/illustrations/play-taman.svg",
    id: "Taman kecil untuk mengamati",
    en: "Small garden for observing",
  },
  {
    image: "assets/illustrations/program-kreativitas.svg",
    id: "Meja seni dan kreativitas",
    en: "Art and creativity table",
  },
  {
    image: "assets/illustrations/program-bahasa.svg",
    id: "Sudut cerita dan buku",
    en: "Story and book corner",
  },
  {
    image: "assets/illustrations/visit-path.svg",
    id: "Jalur masuk dan titik antar jemput",
    en: "Entrance path and drop-off point",
  },
];
const stamp = () => new Date().toISOString().slice(0, 10);
function renderGalleryDemo(host) {
  host.replaceChildren(
    ...GALLERY.map((g) => {
      const fig = el(
        "figure",
        { class: "fgal__item" },
        el("img", {
          src: g.image,
          alt: P(g),
          width: 520,
          height: 400,
          loading: "lazy",
        }),
        el("figcaption", { class: "caption", text: P(g) }),
      );
      return fig;
    }),
  );
}
export function initPage() {
  initPlan();
  const host = document.getElementById("facility-gallery");
  const section = document.getElementById("facility-gallery-section");
  if (host && section) {
    renderGalleryDemo(host);
    section.hidden = false;
    onLang(() => renderGalleryDemo(host));
  }
  const list = document.getElementById("visit-list");
  const count = document.getElementById("visit-count");
  const status = document.getElementById("visit-status");
  const render = () => {
    const checked = [...list.querySelectorAll("input")].map((b) => b.checked);
    list.replaceChildren();
    QUESTIONS.forEach((q, i) => {
      const li = document.createElement("li");
      const label = document.createElement("label");
      const box = document.createElement("input");
      box.type = "checkbox";
      box.id = "vq-" + i;
      box.checked = !!checked[i];
      const span = document.createElement("span");
      span.textContent = q;
      label.append(box, span);
      li.appendChild(label);
      list.appendChild(li);
    });
    paint();
  };
  const paint = () => {
    count.textContent =
      list.querySelectorAll("input:checked").length +
      L(" dari ", " of ") +
      QUESTIONS.length +
      L(" pertanyaan dipilih", " questions selected");
  };
  const picked = () => {
    const sel = [...list.querySelectorAll("input")]
      .map((b, i) => (b.checked ? QUESTIONS[i] : null))
      .filter(Boolean);
    return sel.length ? sel : QUESTIONS;
  };
  const textList = () =>
    t("Pertanyaan untuk kunjungan ke Bali Global Kinder School:") +
    "\n" +
    picked()
      .map((q, i) => i + 1 + ". " + t(q))
      .join("\n");
  list.addEventListener("change", paint);
  document.getElementById("visit-copy").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(textList());
      status.textContent = t("Daftar pertanyaan sudah disalin.");
    } catch (err) {
      status.textContent = t(
        "Belum dapat disalin otomatis. Pilih teks pertanyaan lalu salin manual.",
      );
    }
  });
  const wa = document.getElementById("visit-wa");
  if (wa)
    wa.addEventListener("click", () => {
      wa.href = waLink(textList());
    });
  const pdf = document.getElementById("visit-pdf");
  if (pdf)
    pdf.addEventListener("click", () => {
      const items = picked().map((q, i) => i + 1 + ". " + t(q));
      const blob = buildPdf(
        L("Daftar Pertanyaan Kunjungan", "Visit Question Checklist") +
          " - Bali Global Kinder School",
        items,
        L(
          "Dibuat dari website BGKS pada ",
          "Generated from the BGKS website on ",
        ) + stamp(),
      );
      downloadBlob(
        blob,
        L("daftar-kunjungan-bgks.pdf", "bgks-visit-checklist.pdf"),
      );
      status.textContent = L("PDF diunduh.", "PDF downloaded.");
    });
  render();
  onLang(render);
}

function initPlan() {
  const btns = [...document.querySelectorAll(".zone")];
  const title = document.getElementById("plan-title"),
    text = document.getElementById("plan-text"),
    qs = document.getElementById("plan-qs");
  if (!btns.length) return;
  const pick = (k) => {
    const z = ZONES[k];
    if (!z) return;
    btns.forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.zone === k)),
    );
    title.textContent = z.name;
    text.textContent = z.text;
    qs.replaceChildren(
      ...z.q.map((i) => {
        const li = document.createElement("li");
        li.textContent = QUESTIONS[i];
        return li;
      }),
    );
  };
  btns.forEach((b) => b.addEventListener("click", () => pick(b.dataset.zone)));
  pick("belajar");
}
