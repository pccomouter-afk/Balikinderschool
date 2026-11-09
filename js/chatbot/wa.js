import { school, waLink } from "../data/school.js";
import { chatConfig } from "./config.js";
const T = {
  general: [
    "Halo BGKS, saya menghubungi melalui asisten website. Saya ingin bertanya mengenai informasi sekolah.",
    "Hello BGKS, I am contacting you through the website assistant. I would like to ask about school information.",
  ],
  programs: [
    "Halo BGKS, saya ingin mendapatkan informasi lebih lanjut mengenai program belajar.",
    "Hello BGKS, I would like more information about the learning programs.",
  ],
  admission: [
    "Halo BGKS, saya ingin mengetahui proses pendaftaran siswa baru.",
    "Hello BGKS, I would like to know about the new student enrollment process.",
  ],
  visit: [
    "Halo BGKS, saya ingin bertanya tentang jadwal kunjungan ke sekolah.",
    "Hello BGKS, I would like to ask about scheduling a visit to the school.",
  ],
  facilities: [
    "Halo BGKS, saya ingin mengetahui lebih lanjut tentang fasilitas sekolah.",
    "Hello BGKS, I would like to know more about the school facilities.",
  ],
  schoolLife: [
    "Halo BGKS, saya ingin mengetahui lebih lanjut tentang kegiatan dan keseharian anak di sekolah.",
    "Hello BGKS, I would like to know more about children's activities and daily life at school.",
  ],
  fees: [
    "Halo BGKS, saya ingin menanyakan informasi biaya sekolah.",
    "Hello BGKS, I would like to ask about school fees.",
  ],
};
const QUOTE = ["Pertanyaan saya: ", "My question: "];
export const waTopics = Object.keys(T);
export const waNumberValid = () => /^[1-9]\d{7,14}$/.test(school.whatsapp || "");
export function waMessageFor(topic, lang, question) {
  const pair = T[topic] || T.general;
  const i = lang === "en" ? 1 : 0;
  let text = pair[i];
  const q = (question || "").replace(/\s+/g, " ").trim().slice(0, chatConfig.quoteMax);
  if (q) text += " " + QUOTE[i] + q;
  return text;
}
export function chatWaLink(topic, lang, question) {
  if (!waNumberValid()) return null;
  return waLink(waMessageFor(topic, lang, question));
}
