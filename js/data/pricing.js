export const pricing = {
  isDemoData: true,
  currency: "IDR",
  locale: "id-ID",
  note: {
    id: "Simulasi biaya untuk prototype",
    en: "Sample pricing for demonstration",
  },
  oneTimeLabel: { id: "Sekali bayar", en: "One-time" },
  monthlyLabel: { id: "Bulanan", en: "Monthly" },
  plans: [
    {
      id: "kelompok-bermain",
      name: { id: "Kelompok Bermain", en: "Playgroup" },
      age: { id: "Usia sekitar 2 sampai 3 tahun", en: "Ages about 2 to 3" },
      summary: {
        id: "Mengenal teman dan guru, rutinitas sederhana, serta bermain sensorik dan bergerak bebas.",
        en: "Getting to know friends and teachers, simple routines, and sensory play with free movement.",
      },
      schedule: {
        id: "3 hari per minggu, 3 jam per hari",
        en: "3 days a week, 3 hours a day",
      },
      registrationFee: 1500000,
      supplyFee: 450000,
      monthlyFee: 1100000,
      paymentTerm: {
        id: "Dibayar per bulan, paling lambat tanggal 10",
        en: "Paid monthly, due by the 10th",
      },
      access: {
        guided: "included",
        creative: "included",
        play: "included",
        facilities: "included",
        teachers: "included",
        materials: "oneTime",
        reports: "included",
        extra: "optional",
      },
    },
    {
      id: "tk-a",
      name: { id: "TK A", en: "Kindergarten A" },
      age: { id: "Usia sekitar 4 sampai 5 tahun", en: "Ages about 4 to 5" },
      summary: {
        id: "Bercerita, mengenal huruf dan bunyi, mencoba warna dan bentuk, serta bermain bersama kelompok kecil.",
        en: "Storytelling, learning letters and sounds, trying colors and shapes, and playing in small groups.",
      },
      schedule: {
        id: "5 hari per minggu, 3,5 jam per hari",
        en: "5 days a week, 3.5 hours a day",
      },
      registrationFee: 1500000,
      supplyFee: 550000,
      monthlyFee: 1350000,
      paymentTerm: {
        id: "Dibayar per bulan, paling lambat tanggal 10",
        en: "Paid monthly, due by the 10th",
      },
      access: {
        guided: "included",
        creative: "included",
        play: "included",
        facilities: "included",
        teachers: "included",
        materials: "oneTime",
        reports: "included",
        extra: "optional",
      },
    },
    {
      id: "tk-b",
      name: { id: "TK B", en: "Kindergarten B" },
      age: { id: "Usia sekitar 5 sampai 6 tahun", en: "Ages about 5 to 6" },
      summary: {
        id: "Menyiapkan kemandirian dan kepercayaan diri untuk melangkah ke sekolah dasar lewat proyek sederhana.",
        en: "Building independence and confidence for the move to primary school through simple projects.",
      },
      schedule: {
        id: "5 hari per minggu, 4 jam per hari",
        en: "5 days a week, 4 hours a day",
      },
      registrationFee: 1500000,
      supplyFee: 600000,
      monthlyFee: 1500000,
      paymentTerm: {
        id: "Dibayar per bulan, paling lambat tanggal 10",
        en: "Paid monthly, due by the 10th",
      },
      access: {
        guided: "included",
        creative: "included",
        play: "included",
        facilities: "included",
        teachers: "included",
        materials: "oneTime",
        reports: "included",
        extra: "included",
      },
    },
  ],
  features: [
    {
      key: "guided",
      name: { id: "Kegiatan belajar terarah", en: "Guided learning activities" },
      desc: {
        id: "Sesi harian yang dipandu guru sesuai tahap usia.",
        en: "Daily teacher-led sessions matched to each age stage.",
      },
    },
    {
      key: "creative",
      name: { id: "Eksplorasi dan kreativitas", en: "Exploration and creativity" },
      desc: {
        id: "Mengamati, mencoba, melukis, dan membuat karya sederhana.",
        en: "Observing, experimenting, painting, and making simple creations.",
      },
    },
    {
      key: "play",
      name: { id: "Pengalaman bermain", en: "Play experiences" },
      desc: {
        id: "Bermain bebas dan bermain bersama teman setiap hari.",
        en: "Free play and group play with friends every day.",
      },
    },
    {
      key: "facilities",
      name: { id: "Sarana belajar sekolah", en: "School learning spaces" },
      desc: {
        id: "Ruang kelas dan area bermain yang tersedia untuk kelompok usianya.",
        en: "Classrooms and play areas available to the age group.",
      },
    },
    {
      key: "teachers",
      name: { id: "Pendampingan pendidik", en: "Teacher guidance" },
      desc: {
        id: "Guru mendampingi anak selama kegiatan berlangsung.",
        en: "Teachers accompany children throughout each activity.",
      },
    },
    {
      key: "materials",
      name: { id: "Materi dan alat belajar", en: "Learning materials and supplies" },
      desc: {
        id: "Paket perlengkapan belajar yang dibayar sekali di awal.",
        en: "A learning supply pack paid once at the start.",
      },
    },
    {
      key: "reports",
      name: { id: "Kabar perkembangan anak", en: "Progress updates" },
      desc: {
        id: "Komunikasi berkala antara guru dan orang tua.",
        en: "Regular communication between teachers and parents.",
      },
    },
    {
      key: "extra",
      name: { id: "Kegiatan tambahan", en: "Extra activities" },
      desc: {
        id: "Kegiatan di luar jam utama, seperti proyek kesiapan sekolah dasar.",
        en: "Activities outside core hours, such as primary school readiness projects.",
      },
    },
  ],
  faq: [
    {
      q: {
        id: "Apakah angka biaya ini resmi?",
        en: "Are these fees official?",
      },
      a: {
        id: "Bukan. Angka pada halaman ini hanya simulasi untuk prototype. Biaya resmi dikonfirmasi langsung oleh pihak sekolah.",
        en: "No. The figures on this page are a simulation for the prototype. Official fees are confirmed directly by the school.",
      },
    },
    {
      q: {
        id: "Apa bedanya biaya sekali bayar dan bulanan?",
        en: "What is the difference between one-time and monthly fees?",
      },
      a: {
        id: "Biaya pendaftaran dan paket perlengkapan dibayar sekali di awal. Biaya program dibayar setiap bulan selama anak mengikuti program.",
        en: "The registration fee and supply pack are paid once at the start. The program fee is paid every month while your child attends.",
      },
    },
    {
      q: {
        id: "Bagaimana cara menanyakan rincian biaya?",
        en: "How can I ask about the fee details?",
      },
      a: {
        id: "Pilih tombol Tanya Detail Biaya untuk membuka pesan WhatsApp yang sudah disiapkan, lalu kirim sendiri kepada pihak sekolah.",
        en: "Use the Ask About Fees button to open a prepared WhatsApp message, then send it to the school yourself.",
      },
    },
  ],
};
