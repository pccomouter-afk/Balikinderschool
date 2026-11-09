import { faq } from "../data/faq.js";
export const norm = (s) =>
  String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
const I = (id, arg, boost, kw) => ({ id, arg: arg || "", boost, kw });
export const intents = [
  I("program", "explore", 1, ["eksplorasi", "exploration", "explore", "mengamati", "rasa ingin tahu", "curiosity"]),
  I("program", "creative", 1, ["kreativitas", "kreatif", "creativity", "creative", "menggambar", "mewarnai", "seni", "drawing", "art"]),
  I("program", "language", 1, ["bahasa dan komunikasi", "language and communication", "komunikasi", "communication", "bercerita", "storytelling", "bahasa inggris", "english", "inggris", "bilingual", "dwibahasa"]),
  I("program", "movement", 1, ["gerak", "motorik", "olahraga", "movement", "motor skills", "physical", "sport"]),
  I("stages", "", 1, ["usia", "umur", "age", "how old", "berapa tahun", "kelompok bermain", "playgroup", "tk a", "tk b", "kindergarten", "tahap", "stage", "balita", "toddler"]),
  I("programs", "", 0, ["program*", "belajar", "kurikulum", "curriculum", "kelas", "learning", "kegiatan belajar", "pelajaran"]),
  I("admission", "requirements", 1, ["syarat", "persyaratan", "dokumen", "berkas", "requirements", "requirement", "documents", "akta", "what do i need", "apa yang perlu disiapkan"]),
  I("admission", "how", 1, ["cara daftar", "cara mendaftar", "cara pendaftaran", "how to enroll", "how do i enroll", "how to register", "how to apply", "how to enrol", "langkah", "tahapan", "alur", "steps", "process", "proses"]),
  I("fees", "", 2, ["biaya", "harga", "spp", "tarif", "bayar", "pembayaran", "uang pangkal", "fee", "fees", "cost", "price", "tuition", "how much", "berapa"]),
  I("admission", "", 0, ["daftar", "mendaftar", "pendaftaran", "registrasi", "daftarkan", "enroll", "enrol", "enrollment", "enrolment", "admission", "admissions", "register", "registration", "apply", "masuk sekolah", "murid baru", "siswa baru", "new student"]),
  I("facility", "play", 2, ["area bermain", "tempat bermain", "fasilitas bermain", "play area", "playground", "ayunan", "perosotan", "swing", "slide", "seesaw", "jungkitan", "mainan", "play facilities"]),
  I("facility", "learning", 2, ["ruang belajar", "ruang kelas", "learning space", "learning spaces", "classroom", "classrooms"]),
  I("facility", "environment", 2, ["lingkungan sekolah", "school environment", "campus", "kampus", "keamanan", "aman", "safety", "security", "toilet", "kebersihan", "hygiene", "clean"]),
  I("facilities", "", 0, ["fasilitas", "facility", "facilities", "sarana", "ruang", "lingkungan", "environment", "building", "gedung"]),
  I("schoolLife", "", 1, ["kehidupan sekolah", "school life", "keseharian", "sehari hari", "daily life", "daily schedule", "jadwal harian", "hari anak", "a day at school", "sehari di sekolah"]),
  I("visit", "", 1, ["kunjung*", "berkunjung", "mengunjungi", "kunjungi", "visit", "visiting", "tour", "survey", "survei", "datang ke sekolah", "lihat sekolah", "see the school", "jadwal kunjungan", "book a visit", "booking"]),
  I("parking", "", 2, ["parkir", "parking", "tempat parkir", "antar jemput", "drop off", "pick up", "pickup"]),
  I("hours", "", 3, ["jam buka", "jam operasional", "jam kerja", "jam layanan", "opening hours", "office hours", "business hours", "operating hours", "what time open", "buka jam"]),
  I("location", "", 1, ["lokasi", "alamat", "dimana", "di mana", "peta", "maps", "map", "location", "located", "address", "where", "directions", "petunjuk arah", "arah", "rute", "route"]),
  I("contact", "", 0, ["kontak", "hubungi", "menghubungi", "telepon", "telpon", "nomor", "whatsapp", "wa", "instagram", "email", "contact", "phone", "call", "number", "reach"]),
  I("calendar", "", 1, ["kalender", "acara", "agenda", "calendar", "event", "events", "libur", "holiday", "holidays"]),
  I("news", "", 1, ["berita", "news", "pengumuman", "announcement", "announcements", "update", "kabar"]),
  I("about", "", 1, ["tentang sekolah", "tentang bgks", "about the school", "about bgks", "profil", "profile", "guru", "teacher", "teachers", "pengajar", "learn play grow", "filosofi", "philosophy", "visi", "misi"]),
  I("faq", "", 1, ["faq", "pertanyaan umum", "common questions", "frequently asked"]),
  I("human", "", 3, ["operator", "manusia", "orang asli", "bicara dengan staf", "bicara dengan orang", "petugas", "admin", "staff", "staf", "human", "real person", "talk to someone", "talk to a person", "speak to someone", "customer service"]),
  I("aboutBot", "", 3, ["kamu ai", "anda ai", "apakah ai", "apakah kamu bot", "kamu robot", "robot", "chatbot", "are you ai", "are you a bot", "are you a robot", "are you human", "is this ai", "is this a bot", "kamu siapa", "who are you", "siapa kamu"]),
  I("thanks", "", 3, ["terima kasih", "makasih", "thanks", "thank you", "thx", "trims"]),
];
const GREET = ["halo", "hai", "hallo", "hello", "hi", "hey", "selamat pagi", "selamat siang", "selamat sore", "selamat malam", "good morning", "good afternoon", "good evening", "permisi", "assalamualaikum", "om swastiastu"];
const AMBIG = [
  I("visit", "", 0, [["jadwal", 1], ["schedule", 1]]),
  I("calendar", "", 0, [["jadwal", 1], ["schedule", 1]]),
  I("schoolLife", "", 0, [["jadwal", 1], ["schedule", 1]]),
];
const FOLLOW = ["lebih lanjut", "selengkapnya", "lebih detail", "detail", "more info", "more details", "tell me more", "lagi", "lanjut", "next"];
const STOP = new Set(("yang dan di ke dari untuk apa apakah ada saya anda kami kamu itu ini dengan atau bisa dapat bagaimana berapa kapan siapa mau ingin tolong mohon the a an is are do does can i you we my your to of in on for with and or how what when where who which it this that be have has will would please about me tell saja ada adakah").split(" "));
const tokens = (s) => norm(s).split(" ").filter(Boolean);
function lev1(a, b) {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  if (a.length === b.length) return a.slice(i + 1) === b.slice(i + 1);
  if (a.length > b.length) return a.slice(i + 1) === b.slice(i);
  return a.slice(i) === b.slice(i + 1);
}
function hit(padded, toks, kw) {
  const word = norm(kw);
  if (kw.endsWith("*")) {
    const stem = word;
    return toks.some((t) => t.startsWith(stem)) ? 1 : 0;
  }
  if (padded.includes(" " + word + " ")) return 1;
  if (word.length >= 6 && !word.includes(" ")) {
    return toks.some((t) => t.length >= 6 && !STOP.has(t) && lev1(t, word)) ? 0.7 : 0;
  }
  return 0;
}
function scoreIntent(it, padded, toks) {
  let best = 0;
  let sum = 0;
  let n = 0;
  it.kw.forEach((k) => {
    const raw = Array.isArray(k) ? k[0] : k;
    const w = Array.isArray(k) ? k[1] : null;
    const h = hit(padded, toks, raw);
    if (!h) return;
    const base = w !== null ? w : norm(raw).includes(" ") ? 3 : 2;
    const v = base * h;
    sum += v;
    n++;
    if (v > best) best = v;
  });
  if (!n) return 0;
  return best + Math.min(1, (sum - best) * 0.25) + it.boost;
}
const key = (d) => d.id + ":" + d.arg;
const faqTokens = faq.map((f) => {
  const set = new Set([...tokens(f.q.id), ...tokens(f.q.en)].filter((t) => t.length > 2 && !STOP.has(t)));
  return set;
});
export function matchFaq(q) {
  const qt = tokens(q).filter((t) => t.length > 2 && !STOP.has(t));
  if (qt.length < 2) return { i: -1, strong: false };
  let best = -1;
  let bestScore = 0;
  let strong = false;
  faqTokens.forEach((set, i) => {
    let shared = 0;
    qt.forEach((t) => {
      if (set.has(t)) shared++;
    });
    const ratio = shared / Math.max(1, Math.min(qt.length, set.size));
    const s = shared + ratio;
    if (shared >= 2 && ratio >= 0.6 && s > bestScore) {
      best = i;
      bestScore = s;
      strong = shared >= 3 && ratio >= 0.75;
    }
  });
  return { i: best, strong };
}
export function detect(query, context) {
  const q = String(query || "");
  const padded = " " + norm(q) + " ";
  const toks = tokens(q);
  if (!toks.length) return { id: "fallback", q };
  const scored = [];
  intents.forEach((it) => {
    const s = scoreIntent(it, padded, toks);
    if (s >= 2) scored.push({ d: { id: it.id, arg: it.arg }, s });
  });
  const amb = AMBIG.map((it) => ({ d: { id: it.id, arg: it.arg }, s: scoreIntent(it, padded, toks) })).filter((x) => x.s > 0);
  if (!scored.length && amb.length > 1) {
    return { id: "disambig", opts: amb.map((x) => x.d), q };
  }
  scored.sort((a, b) => b.s - a.s);
  const fm = matchFaq(q);
  if (fm.i >= 0 && fm.strong && (!scored.length || scored[0].s < 4)) {
    return { id: "faqItem", arg: String(fm.i), q };
  }
  if (scored.length) {
    const top = scored[0];
    const rivals = [];
    const seen = new Set([key(top.d)]);
    for (let i = 1; i < scored.length; i++) {
      const c = scored[i];
      if (seen.has(key(c.d))) continue;
      if (c.s >= top.s * 0.85) {
        rivals.push(c.d);
        seen.add(key(c.d));
      }
    }
    if (rivals.length) return { id: "disambig", opts: [top.d, ...rivals].slice(0, 3), q };
    return { ...top.d, q };
  }
  const isGreet = toks.length <= 4 && GREET.some((g) => padded.includes(" " + norm(g) + " "));
  if (isGreet) return { id: "menu", q };
  if (fm.i >= 0) return { id: "faqItem", arg: String(fm.i), q };
  const isFollow = context && context.id && FOLLOW.some((g) => padded.includes(" " + norm(g) + " "));
  if (isFollow) return { id: "followup", arg: key(context), q };
  return { id: "fallback", q };
}
