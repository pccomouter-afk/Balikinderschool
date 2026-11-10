import { detect } from "../js/chatbot/intents.js";
import { respond, mainMenu } from "../js/chatbot/responder.js";
import { chatWaLink, waMessageFor } from "../js/chatbot/wa.js";
import { knowledgeBase } from "../js/chatbot/kb.js";
import { school } from "../js/data/school.js";
const cases = [
  ["Berapa biaya sekolah?", "fees"],
  ["Bagaimana cara daftar?", "admission:how"],
  ["Apa programnya?", "programs"],
  ["Di mana lokasi sekolah?", "location"],
  ["Bagaimana cara mengunjungi sekolah?", "visit"],
  ["Apakah ada fasilitas bermain?", "facility:play"],
  ["Can I visit the school?", "visit"],
  ["How do I enroll my child?", "admission:how"],
  ["Where is BGKS located?", "location"],
  ["syarat pendaftaran apa saja", "admission:requirements"],
  ["dokumen yang perlu disiapkan", "faqItem"],
  ["kreativitas", "program:creative"],
  ["anak saya umur 3 tahun bisa masuk?", "stages"],
  ["what are your opening hours", "hours"],
  ["jam buka sekolah", "hours"],
  ["ada ayunan?", "facility:play"],
  ["pendaftaran", "admission"],
  ["jadwal", "disambig"],
  ["halo", "menu"],
  ["terima kasih", "thanks"],
  ["apakah kamu AI?", "aboutBot"],
  ["can i talk to a human", "human"],
  ["is there parking", "parking"],
  ["apakah tersedia tempat parkir", "parking"],
  ["adakah kegiatan di luar kelas", "faqItem"],
  ["kapan bayar spp", "fees"],
  ["pogram belajar", "programs"],
  ["resep nasi goreng", "fallback"],
  ["asdfgh", "fallback"],
  ["<script>alert(1)</script>", "fallback"],
  ["kalender kegiatan", "calendar"],
  ["alamat dan nomor whatsapp", "location"],
];
let fail = 0;
cases.forEach(([q, want]) => {
  const d = detect(q, null);
  const got = d.arg ? d.id + ":" + d.arg : d.id;
  const ok = got === want || (want === "faqItem" && d.id === "faqItem") || (want === "admission" && d.id === "admission");
  if (!ok) {
    fail++;
    console.log("FAIL", JSON.stringify(q), "want", want, "got", got, d.opts ? JSON.stringify(d.opts) : "");
  }
});
const ids = [
  { id: "menu" }, { id: "other" }, { id: "programs" }, { id: "program", arg: "explore" }, { id: "program", arg: "creative" },
  { id: "program", arg: "language" }, { id: "program", arg: "movement" }, { id: "stages" }, { id: "admission" },
  { id: "admission", arg: "how" }, { id: "admission", arg: "requirements" }, { id: "admission", arg: "consult" },
  { id: "fees" }, { id: "facilities" }, { id: "facility", arg: "learning" }, { id: "facility", arg: "play" },
  { id: "facility", arg: "environment" }, { id: "schoolLife" }, { id: "schoolLife", arg: "arrive" },
  { id: "schoolLife", arg: "daily" }, { id: "visit" }, { id: "visit", arg: "info" }, { id: "contact" }, { id: "location" },
  { id: "hours" }, { id: "calendar" }, { id: "news" }, { id: "about" }, { id: "faq" }, { id: "thanks" }, { id: "human" },
  { id: "aboutBot" }, { id: "parking" }, { id: "followup", arg: "fees:" }, { id: "disambig", opts: [{ id: "visit" }, { id: "calendar" }] },
  { id: "faqItem", arg: "0", q: "x" }, { id: "fallback", q: "x" },
];
["id", "en"].forEach((lang) => {
  ids.forEach((d) => {
    const r = respond(d, lang);
    const ok = r.paras.length && r.paras.every((p) => typeof p === "string" && p.length);
    const acts = r.actions.every((a) => a.label && (a.t !== "link" || a.href) && (a.t !== "choice" || a.to));
    if (!ok || !acts) {
      fail++;
      console.log("BAD RESPONSE", lang, JSON.stringify(d));
    }
  });
  if (mainMenu(lang).length !== 6) fail++;
});
const walk = (a, b, path) => {
  Object.keys(a).forEach((k) => {
    if (!(k in b)) {
      fail++;
      console.log("MISSING EN KEY", path + k);
    } else if (a[k] && typeof a[k] === "object" && !Array.isArray(a[k])) walk(a[k], b[k], path + k + ".");
  });
};
walk(knowledgeBase.id, knowledgeBase.en, "");
walk(knowledgeBase.en, knowledgeBase.id, "");
const u = chatWaLink("admission", "id", "Berapa biaya & syarat?");
if (!u || !u.startsWith("https://wa.me/" + school.whatsapp + "?text=")) { fail++; console.log("BAD WA", u); }
if (!u.includes("%26")) { fail++; console.log("WA not encoded"); }
if (chatWaLink("general", "en", "").indexOf("Hello%20BGKS") < 0) { fail++; console.log("WA EN"); }
if (school.whatsapp !== "628388621176") { fail++; console.log("number"); }
if (waMessageFor("general", "id", "x".repeat(500)).length > 400) { fail++; console.log("quote too long"); }
console.log(fail ? fail + " failure(s)" : "all intent, response, bilingual, and WhatsApp checks passed");
process.exit(fail ? 1 : 0);
