import { L } from "../foundation/i18n.js";
export const school = {
  name: "Bali Global Kinder School",
  instagram: "https://www.instagram.com/baliglobalkinderschool/",
  whatsapp: "628388621176",
  phoneLocal: "08388621176",
  email: "",
  hours: "",
  address:
    "Jl. Tibung Sari No.1X, Dalung, Kec. Kuta Utara, Kabupaten Badung, Bali 80361",
  mapsUrl: "https://maps.app.goo.gl/M5HRECDPm7rVgFMC7",
  analyticsId: "",
};
const M = {
  index: [
    "Halo BGKS, saya ingin mengetahui lebih lanjut tentang sekolah dan program belajar yang tersedia.",
    "Hello BGKS, I would like to learn more about the school and its learning programs.",
  ],
  tentang: [
    "Halo BGKS, saya ingin mengetahui lebih lanjut tentang sekolah dan pendekatan belajarnya.",
    "Hello BGKS, I would like to learn more about the school and its learning approach.",
  ],
  "program-belajar": [
    "Halo BGKS, saya ingin bertanya mengenai program belajar, kelompok usia, dan kegiatan pembelajaran.",
    "Hello BGKS, I would like to ask about the learning programs, age groups, and learning activities.",
  ],
  "dunia-bermain": [
    "Halo BGKS, saya ingin mengetahui lebih lanjut tentang pendekatan belajar melalui bermain.",
    "Hello BGKS, I would like to learn more about learning through play.",
  ],
  pendaftaran: [
    "Halo BGKS, saya ingin mendapatkan informasi mengenai proses pendaftaran siswa baru.",
    "Hello BGKS, I would like information about the new student enrollment process.",
  ],
  biaya: [
    "Halo BGKS, saya ingin mendapatkan informasi lebih lanjut mengenai biaya program belajar dan fasilitas yang termasuk.",
    "Hello BGKS, I would like to know more about the program fees and included benefits.",
  ],
  faq: [
    "Halo BGKS, saya ingin bertanya lebih lanjut mengenai informasi sekolah.",
    "Hello BGKS, I would like to ask more about the school.",
  ],
  fasilitas: [
    "Halo BGKS, saya ingin mengetahui fasilitas dan lingkungan belajar yang tersedia di sekolah.",
    "Hello BGKS, I would like to know about the facilities and learning environment at the school.",
  ],
  "kehidupan-sekolah": [
    "Halo BGKS, saya ingin mengetahui lebih lanjut tentang kegiatan dan keseharian anak di sekolah.",
    "Hello BGKS, I would like to know more about children's activities and daily life at school.",
  ],
  kunjungan: [
    "Halo BGKS, saya ingin bertanya mengenai kemungkinan menjadwalkan kunjungan ke sekolah.",
    "Hello BGKS, I would like to ask about scheduling a visit to the school.",
  ],
  kontak: [
    "Halo BGKS, saya ingin menghubungi pihak sekolah dan mendapatkan informasi lebih lanjut.",
    "Hello BGKS, I would like to contact the school and get more information.",
  ],
  berita: [
    "Halo BGKS, saya ingin bertanya lebih lanjut mengenai informasi yang tersedia di website.",
    "Hello BGKS, I would like to ask more about the information on the website.",
  ],
  kalender: [
    "Halo BGKS, saya ingin bertanya mengenai kalender kegiatan sekolah.",
    "Hello BGKS, I would like to ask about the school activity calendar.",
  ],
};
M["berita-detail"] = M.berita;
M["kebijakan-privasi"] = M.kontak;
M["404"] = M.index;
export const waMessage = (key) => {
  const m = M[key] || M.index;
  return L(m[0], m[1]);
};
export const mapEmbedUrl = () =>
  "https://www.google.com/maps?q=" +
  encodeURIComponent(school.address) +
  "&output=embed&hl=" +
  L("id", "en");
export const directionsUrl = () => school.mapsUrl;
export function waLink(message) {
  if (!school.whatsapp) return null;
  return (
    "https://wa.me/" + school.whatsapp + "?text=" + encodeURIComponent(message)
  );
}
export const waForPage = (key) => waLink(waMessage(key));
export function trackWhatsapp(page) {
  if (!school.analyticsId || typeof window.gtag !== "function") return;
  window.gtag("event", "click_whatsapp", { page });
}
