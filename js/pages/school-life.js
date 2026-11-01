import { siteUrl } from "../foundation/paths.js";
const STAGES = [
  {
    tone: "yellow",
    time: "Awal hari",
    t: "Datang",
    d: "Anak tiba, disambut, dan bersiap memulai hari.",
    main: [
      "assets/illustrations/visit-path.svg",
      "Ilustrasi konsep: jalan setapak menuju sebuah penanda lokasi",
    ],
    side: [
      "assets/illustrations/program-bahasa.svg",
      "Ilustrasi konsep: gelembung percakapan dan buku",
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
      "assets/illustrations/program-eksplorasi.svg",
      "Ilustrasi konsep: kaca pembesar di atas daun",
    ],
    side: [
      "assets/illustrations/program-kreativitas.svg",
      "Ilustrasi konsep: palet warna dan kuas",
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
      "assets/illustrations/program-gerak.svg",
      "Ilustrasi konsep: bola dan kerucut di atas rumput",
    ],
    side: [
      "assets/illustrations/play-balok.svg",
      "Ilustrasi konsep: susunan balok mainan",
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
      "assets/illustrations/school-life.svg",
      "Ilustrasi konsep: bangku, bunga, dan matahari di halaman",
    ],
    side: [
      "assets/illustrations/play-tempat-duduk.svg",
      "Ilustrasi konsep: bangku halaman",
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
  const main = root.querySelector("#day-main"),
    side = root.querySelector("#day-side");
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
    side.src = siteUrl(s.side[0]);
    side.alt = s.side[1];
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
