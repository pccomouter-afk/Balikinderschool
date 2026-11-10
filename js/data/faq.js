import { P } from "../foundation/i18n.js";
const G = {
  reg: { id: "Pendaftaran", en: "Enrollment", key: "reg" },
  prog: { id: "Program dan usia", en: "Programs and ages", key: "prog" },
  fac: { id: "Fasilitas", en: "Facilities", key: "fac" },
  visit: { id: "Kontak dan kunjungan", en: "Contact and visits", key: "visit" },
  day: { id: "Jadwal dan kegiatan", en: "Schedule and activities", key: "day" },
};
export const faqGroups = Object.values(G);
export const faq = [
  {
    isDummy: true,
    g: G.reg,
    q: { id: "Bagaimana cara mendaftar?", en: "How do I enroll?" },
    a: {
      id: "Mulai dari halaman Pendaftaran: isi formulir minat, periksa ringkasannya, lalu lanjutkan ke WhatsApp dengan pesan yang sudah terisi. Tim sekolah akan menjelaskan langkah berikutnya, termasuk jadwal kunjungan dan observasi anak.",
      en: "Start on the Enrollment page: fill in the inquiry form, review the summary, then continue to WhatsApp with the message already filled in. The school team will explain the next steps, including a campus visit and a child observation.",
    },
  },
  {
    isDummy: true,
    g: G.reg,
    q: {
      id: "Apa saja tahapan pendaftaran?",
      en: "What are the enrollment steps?",
    },
    a: {
      id: "Contoh alur: (1) mengisi formulir minat, (2) berkonsultasi dengan tim sekolah, (3) berkunjung dan melihat kelas, (4) sesi pengenalan anak, (5) melengkapi dokumen, (6) mulai masa adaptasi. Urutan resmi dikonfirmasi sekolah.",
      en: "A sample flow: (1) fill in the inquiry form, (2) talk with the school team, (3) visit and see the classes, (4) a get-to-know session for your child, (5) complete the documents, (6) begin the adjustment period. The official order is confirmed by the school.",
    },
  },
  {
    isDummy: true,
    g: G.reg,
    q: {
      id: "Dokumen apa yang perlu disiapkan?",
      en: "Which documents should I prepare?",
    },
    a: {
      id: "Contoh dokumen yang umum diminta sekolah anak usia dini: salinan akta kelahiran anak, kartu keluarga, pas foto, dan catatan imunisasi. Daftar resmi disampaikan sekolah saat proses berjalan.",
      en: "Documents commonly requested by early childhood schools include a copy of the child's birth certificate, the family card, passport photos, and immunization records. The official list is provided by the school during the process.",
    },
  },
  {
    isDummy: true,
    g: G.reg,
    q: {
      id: "Apakah biaya ditampilkan di situs ini?",
      en: "Are fees shown on this site?",
    },
    a: {
      id: "Tidak. Rincian biaya disampaikan langsung oleh sekolah sesuai kelompok belajar yang dipilih. Anda dapat menanyakannya lewat WhatsApp tanpa komitmen apa pun.",
      en: "No. Fee details are shared directly by the school according to the learning group you choose. You can ask on WhatsApp without any commitment.",
    },
  },
  {
    isDummy: true,
    g: G.prog,
    q: {
      id: "Program apa saja yang tersedia?",
      en: "What programs are available?",
    },
    a: {
      id: "Kegiatan belajar dikelompokkan dalam empat pengalaman: Eksplorasi, Kreativitas, Bahasa dan komunikasi, serta Gerak dan bermain. Setiap pengalaman dijelaskan di halaman Program Belajar lengkap dengan contoh kegiatan.",
      en: "Learning is organized into four experiences: Exploration, Creativity, Language and communication, and Movement and play. Each is described on the Learning Programs page with example activities.",
    },
  },
  {
    isDummy: true,
    g: G.prog,
    q: { id: "Berapa usia anak yang diterima?", en: "What age do you accept?" },
    a: {
      id: "Contoh pembagian kelompok: Kelompok Bermain sekitar 2 sampai 3 tahun, TK A sekitar 4 sampai 5 tahun, dan TK B sekitar 5 sampai 6 tahun. Penempatan akhir mempertimbangkan kesiapan masing-masing anak.",
      en: "A sample grouping: Playgroup around 2 to 3 years, Kindergarten A around 4 to 5 years, and Kindergarten B around 5 to 6 years. Final placement considers each child's readiness.",
    },
  },
  {
    isDummy: true,
    g: G.prog,
    q: {
      id: "Kurikulum apa yang digunakan?",
      en: "Which curriculum do you use?",
    },
    a: {
      id: "Pembelajaran berpusat pada bermain dan pengalaman langsung dengan semboyan Learn, Play, Grow. Uraian kurikulum resmi dapat diminta dari sekolah.",
      en: "Learning centers on play and hands-on experience under the motto Learn, Play, Grow. The official curriculum description can be requested from the school.",
    },
  },
  {
    isDummy: true,
    g: G.prog,
    q: {
      id: "Apakah ada kegiatan bahasa Inggris?",
      en: "Is there English language activity?",
    },
    a: {
      id: "Contoh: anak mengenal kosakata dasar Inggris lewat lagu, cerita bergambar, dan permainan, berdampingan dengan Bahasa Indonesia. Porsi dan metode resminya dijelaskan oleh sekolah.",
      en: "For example, children pick up basic English vocabulary through songs, picture stories, and games alongside Indonesian. The official share and method are explained by the school.",
    },
  },
  {
    isDummy: true,
    g: G.fac,
    q: {
      id: "Apakah gambar permainan di situs ini adalah fasilitas sekolah?",
      en: "Are the game pictures on this site the school's facilities?",
    },
    a: {
      id: "Gambar di bagian Dunia Bermain adalah ilustrasi untuk menjelaskan manfaat setiap permainan bagi anak. Untuk melihat area bermain yang sebenarnya, atur kunjungan lewat halaman Jadwalkan Kunjungan.",
      en: "The pictures in the Play World section are illustrations that explain what each game does for children. To see the real play areas, arrange a visit through the Schedule a Visit page.",
    },
  },
  {
    isDummy: true,
    g: G.fac,
    q: {
      id: "Apa yang sebaiknya saya lihat saat berkunjung?",
      en: "What should I look at during a visit?",
    },
    a: {
      id: "Halaman Fasilitas memuat daftar pertanyaan siap pakai tentang ruang kelas, kebersihan, keamanan, dan area bermain. Daftar itu dapat dicentang, disalin, dibagikan lewat WhatsApp, atau diunduh sebagai PDF.",
      en: "The Facilities page has a ready-made question list about classrooms, cleanliness, safety, and play areas. You can tick items, copy the list, share it on WhatsApp, or download it as a PDF.",
    },
  },
  {
    isDummy: true,
    g: G.visit,
    q: {
      id: "Bagaimana cara menghubungi sekolah?",
      en: "How do I contact the school?",
    },
    a: {
      id: "Cara tercepat adalah WhatsApp di 08388621176. Sekolah juga dapat dihubungi lewat Instagram resmi @baliglobalkinderschool.",
      en: "The quickest way is WhatsApp at 08388621176. You can also reach the school through the official Instagram @baliglobalkinderschool.",
    },
  },
  {
    isDummy: true,
    g: G.visit,
    q: {
      id: "Apakah orang tua bisa berkunjung ke sekolah?",
      en: "Can parents visit the school?",
    },
    a: {
      id: "Bisa. Buka halaman Jadwalkan Kunjungan, pilih tanggal dan slot, lalu lanjutkan ke WhatsApp. Sekolah akan mengonfirmasi waktu yang sesuai.",
      en: "Yes. Open the Schedule a Visit page, pick a date and slot, then continue to WhatsApp. The school will confirm a suitable time.",
    },
  },
  {
    isDummy: true,
    g: G.visit,
    q: { id: "Di mana lokasi sekolah?", en: "Where is the school located?" },
    a: {
      id: "Jl. Tibung Sari No.1X, Dalung, Kec. Kuta Utara, Kabupaten Badung, Bali 80361. Halaman Kontak memuat peta dan tombol petunjuk arah.",
      en: "Jl. Tibung Sari No.1X, Dalung, Kuta Utara, Badung Regency, Bali 80361. The Contact page has a map and a directions button.",
    },
  },
  {
    isDummy: true,
    g: G.visit,
    q: { id: "Apakah tersedia tempat parkir?", en: "Is parking available?" },
    a: {
      id: "Contoh informasi demonstrasi: orang tua dapat memarkir kendaraan di area sekitar sekolah dan memakai titik antar jemput yang ditentukan. Konfirmasikan kondisi terbaru kepada sekolah sebelum datang.",
      en: "Sample demo information: parents can park in the area near the school and use the designated drop-off point. Please confirm current conditions with the school before you come.",
    },
  },
  {
    isDummy: true,
    g: G.day,
    q: {
      id: "Bagaimana keseharian anak di sekolah?",
      en: "What does a child's day look like?",
    },
    a: {
      id: "Hari anak mengalir dari datang dan disambut, belajar, bermain, hingga pulang. Gambaran umumnya dapat dilihat di halaman Kehidupan Sekolah, dan contoh jadwal ada di halaman Program Belajar.",
      en: "A child's day flows from arrival and welcome, to learning, play, and going home. The overview is on the School Life page, and a sample schedule is on the Learning Programs page.",
    },
  },
  {
    isDummy: true,
    g: G.day,
    q: {
      id: "Apakah ada kegiatan di luar kelas?",
      en: "Are there activities outside the classroom?",
    },
    a: {
      id: "Contoh: anak bermain di halaman, mengamati tanaman, dan melakukan permainan gerak secara bergantian dengan pendampingan guru. Jadwal pastinya dikonfirmasi sekolah.",
      en: "For example, children play in the yard, observe plants, and do movement games in turns with a teacher's guidance. The exact schedule is confirmed by the school.",
    },
  },
];
export const faqHomeIds = [0, 4, 5, 11, 10];
export const faqHome = faqHomeIds.map((i) => faq[i]);
export const flatFaq = (items) => items.map((f) => ({ q: P(f.q), a: P(f.a) }));
