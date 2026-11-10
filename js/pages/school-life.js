import { siteUrl } from "../foundation/paths.js";
const STAGES = [
  {
    tone: "yellow",
    time: "Awal hari",
    t: "Datang",
    d: "Anak tiba, disambut, dan bersiap memulai hari.",
    main: [
      "assets/images/kehidupan_sekolah/kunjungan_pertama.jpg",
      "Foto anak-anak disambut saat tiba di sekolah",
    ],
    points: [
      "Menyapa guru dan teman",
      "Menyimpan tas dan perlengkapan",
      "Berpisah dengan orang tua dengan tenang",
    ],
  },
  {
    tone: "blue",
    time: "Bagian belajar",
    t: "Belajar",
    d: "Mengamati, bertanya, dan mencoba lewat pengalaman sederhana.",
    main: [
      "assets/images/kehidupan_sekolah/belajar.jpg",
      "Foto anak-anak belajar di kelas",
    ],
    points: [
      "Mengamati benda di sekitar",
      "Mencoba warna dan bahan",
      "Bercerita dan mendengarkan",
    ],
  },
  {
    tone: "green",
    time: "Bagian bermain",
    t: "Bermain",
    d: "Bermain bersama melatih berbagi dan menunggu giliran.",
    main: [
      "assets/images/kehidupan_sekolah/bermain.jpg",
      "Foto anak-anak bermain bersama",
    ],
    points: [
      "Bergerak dengan bebas",
      "Menunggu giliran",
      "Menyusun sesuatu bersama teman",
    ],
  },
  {
    tone: "coral",
    time: "Akhir hari",
    t: "Pulang",
    d: "Merapikan barang dan bersiap pulang bersama keluarga.",
    main: [
      "assets/images/kehidupan_sekolah/pulang.jpg",
      "Foto anak-anak bersiap pulang",
    ],
    points: [
      "Merapikan barang sendiri",
      "Bercerita tentang hari ini",
      "Bersiap pulang bersama keluarga",
    ],
  },
];
export function initPage() {
  const root = document.getElementById("day");
  if (!root) return;
  const steps = [...root.querySelectorAll(".day__step")];
  const stage = root.querySelector(".day__stage");
  const main = root.querySelector("#day-main");
  const time = root.querySelector("#day-time"),
    title = root.querySelector("#day-title"),
    text = root.querySelector("#day-text"),
    points = root.querySelector("#day-points");
  const set = (i) => {
    const s = STAGES[i];
    steps.forEach((b, k) => b.setAttribute("aria-pressed", String(k === i)));
    stage.dataset.tone = s.tone;
    main.src = siteUrl(s.main[0]);
    main.alt = s.main[1];
    time.textContent = s.time;
    title.textContent = s.t;
    text.textContent = s.d;
    points.replaceChildren(
      ...s.points.map((p) => {
        const li = document.createElement("li");
        li.textContent = p;
        return li;
      }),
    );
    stage.classList.remove("is-swap");
    void stage.offsetWidth;
    stage.classList.add("is-swap");
  };
  steps.forEach((b, i) => b.addEventListener("click", () => set(i)));
  set(0);
}
