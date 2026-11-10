const pg = {
  program: "pages/program-belajar.html",
  admission: "pages/pendaftaran.html",
  facilities: "pages/fasilitas.html",
  life: "pages/kehidupan-sekolah.html",
  visit: "pages/jadwalkan-kunjungan.html",
  contact: "pages/kontak.html",
  faq: "pages/faq.html",
  about: "pages/tentang.html",
  calendar: "pages/kalender.html",
  news: "pages/berita.html",
  play: "pages/dunia-bermain.html",
};
export const pages = pg;
const id = {
  ui: {
    title: "BGKS Assistant",
    subtitle: "Asisten informasi Bali Global Kinder School",
    help: "Bagaimana kami dapat membantu Anda hari ini?",
    launcher: "Tanya BGKS",
    launcherLabel: "Buka BGKS Assistant",
    dialogLabel: "BGKS Assistant",
    close: "Tutup percakapan",
    reset: "Mulai percakapan baru",
    placeholder: "Tulis pertanyaan Anda...",
    inputLabel: "Pertanyaan Anda",
    send: "Kirim pertanyaan",
    log: "Percakapan",
    typing: "Asisten sedang menyiapkan jawaban",
    tooLong: "Pesan terlalu panjang. Maksimal {n} karakter.",
    hint: "Jawaban otomatis berdasarkan informasi di website ini.",
    wa: "Chat WhatsApp",
    userSaid: "Anda",
    botSaid: "BGKS Assistant",
    dummyNote:
      "Ini informasi contoh. Konfirmasi final tetap dari pihak sekolah.",
    noWa: "Nomor WhatsApp belum dikonfigurasi. Anda dapat menghubungi sekolah lewat Instagram resmi.",
    instagram: "Instagram resmi",
    loadError: "Asisten belum dapat dimuat.",
  },
  greeting: [
    "Halo! Selamat datang di BGKS.",
    "Saya dapat membantu Anda mengenal program belajar, kehidupan sekolah, fasilitas, dan informasi pendaftaran.",
    "Apa yang ingin Anda ketahui?",
  ],
  menu: {
    programs: "Program Belajar",
    admission: "Informasi Pendaftaran",
    facilities: "Fasilitas Sekolah",
    visit: "Jadwalkan Kunjungan",
    contact: "Lokasi dan Kontak",
    other: "Tanya Pertanyaan Lain",
  },
  back: "Menu utama",
  menuAgain: "Ada hal lain yang ingin Anda ketahui?",
  other: {
    text: [
      "Silakan tulis pertanyaan Anda di kolom bawah. Saya akan mencocokkannya dengan informasi di website BGKS.",
    ],
    examples: [
      "Berapa biaya sekolah?",
      "Bagaimana cara daftar?",
      "Di mana lokasi sekolah?",
    ],
  },
  programs: {
    text: [
      "Senang Anda ingin mengenal program belajar BGKS. Saya dapat membantu menjelaskan beberapa area pengalaman belajar.",
    ],
    options: {
      explore: "Eksplorasi",
      creative: "Kreativitas",
      language: "Bahasa dan Komunikasi",
      movement: "Gerak dan Bermain",
    },
    items: {
      explore: {
        title: "Eksplorasi",
        text: "Anak mengamati, bertanya, dan mencoba untuk mengenal dunia di sekitarnya. Rasa ingin tahu menjadi pintu masuk untuk belajar hal baru.",
        bullets: [
          "Mengamati daun dan serangga kecil",
          "Mencoba benda yang tenggelam dan mengapung",
          "Bertanya tentang hal yang baru dilihat",
        ],
        href: pg.program + "#eksplorasi",
      },
      creative: {
        title: "Kreativitas",
        text: "Warna, bentuk, dan bahan sederhana menjadi cara anak mengekspresikan ide dan perasaannya tanpa takut salah.",
        bullets: [
          "Menggambar dan mewarnai bebas",
          "Menempel dan melipat kertas",
          "Bermain peran dengan benda sehari-hari",
        ],
        href: pg.program + "#kreativitas",
      },
      language: {
        title: "Bahasa dan Komunikasi",
        text: "Bercerita, mendengarkan, dan bertanya membantu anak menyampaikan pikirannya dengan percaya diri.",
        bullets: [
          "Mendengarkan dan menceritakan kembali cerita",
          "Bernyanyi dan berbalas tanya jawab",
          "Mengenal huruf lewat permainan",
        ],
        href: pg.program + "#bahasa",
      },
      movement: {
        title: "Gerak dan Bermain",
        text: "Bergerak bebas melatih otot, keseimbangan, dan kemampuan bekerja sama dengan teman.",
        bullets: [
          "Melompat, berlari, dan menyeimbangkan badan",
          "Permainan kelompok sederhana",
          "Melempar dan menangkap bola",
        ],
        href: pg.program + "#gerak",
      },
    },
    itemNote: "Contoh kegiatan yang umum. Kegiatan terbaru dikonfirmasi sekolah.",
    seeAll: "Lihat Program Belajar",
    ask: "Tanyakan Program",
    stages: {
      text: "Setiap tahap memakai empat pengalaman belajar yang sama, dengan kedalaman yang disesuaikan usia anak.",
      bullets: [
        "Kelompok Bermain: mengenal teman dan guru, rutinitas sederhana, serta bermain sensorik dan bergerak bebas.",
        "TK A: bercerita, mengenal huruf dan bunyi, mencoba warna dan bentuk, serta bermain bersama kelompok kecil.",
        "TK B: menyiapkan kemandirian dan kepercayaan diri untuk melangkah ke sekolah dasar lewat proyek sederhana.",
      ],
    },
  },
  admission: {
    text: [
      "Tentu! Saya dapat membantu Anda memahami langkah awal untuk mengenal proses pendaftaran di BGKS.",
    ],
    options: {
      requirements: "Persyaratan",
      info: "Informasi program",
      how: "Cara mendaftar",
      consult: "Konsultasi via WhatsApp",
    },
    how: {
      text: "Website menyiapkan alur awal berikut. Urutan resmi tetap dikonfirmasi pihak sekolah.",
      bullets: [
        "Kenali sekolah lewat halaman Tentang Sekolah dan Program Belajar.",
        "Isi formulir minat untuk menyusun pesan pendaftaran.",
        "Kirim pesan lewat WhatsApp atau Instagram resmi.",
        "Ikuti arahan sekolah untuk biaya, jadwal kunjungan, dan dokumen.",
      ],
      note: "Formulir di website hanya menyusun pesan. Data tidak disimpan di website.",
    },
    requirements: {
      text: "Daftar resmi persyaratan disampaikan sekolah saat proses berjalan.",
      fallbackBullets: [
        "Salinan akta kelahiran anak",
        "Kartu keluarga",
        "Pas foto",
        "Catatan imunisasi",
      ],
    },
    infoBtn: "Info Pendaftaran",
    consultText: "Untuk konsultasi, Anda dapat menghubungi tim BGKS lewat WhatsApp. Pesan akan terisi otomatis dan Anda menekan Kirim sendiri di aplikasi WhatsApp.",
  },
  fees: {
    text: "Rincian biaya tidak ditampilkan di website. Biaya disampaikan langsung oleh sekolah sesuai kelompok belajar yang dipilih.",
    note: "Anda dapat menanyakannya lewat WhatsApp tanpa komitmen apa pun.",
  },
  age: {
    text: "Penempatan kelompok belajar mengikuti usia dan kesiapan anak, dan dikonfirmasi oleh sekolah.",
    hint: "Contoh pembagian kelompok",
  },
  facilities: {
    text: [
      "Anda dapat mengenal lingkungan belajar dan berbagai area yang disiapkan untuk mendukung pengalaman anak.",
    ],
    options: {
      learning: "Ruang Belajar",
      play: "Area Bermain",
      environment: "Lingkungan Sekolah",
      all: "Lihat Semua Fasilitas",
    },
    items: {
      learning: {
        title: "Ruang Belajar",
        text: "Terang, bersih, dan memberi anak ruang bergerak.",
        bullets: [
          "Bagaimana kondisi ruang kelas dan pencahayaannya?",
          "Di mana anak beristirahat atau makan bersama?",
        ],
        lead: "Pertanyaan yang bisa Anda ajukan saat berkunjung:",
      },
      play: {
        title: "Area Bermain",
        text: "Aman, teduh, dan sesuai usia anak.",
        bullets: [
          "Apa saja area bermain di dalam dan luar ruangan?",
          "Apakah ada area teduh untuk bermain di luar?",
          "Bagaimana pengawasan anak saat bermain?",
        ],
        lead: "Pertanyaan yang bisa Anda ajukan saat berkunjung:",
        extra: "Gambar di Dunia Bermain adalah ilustrasi konsep, bukan dokumentasi fasilitas sekolah.",
      },
      environment: {
        title: "Lingkungan Sekolah",
        text: "Pengaturan penjemputan, pengawasan anak, serta kenyamanan toilet dan area istirahat.",
        bullets: [
          "Bagaimana pengaturan keamanan pintu masuk dan penjemputan?",
          "Bagaimana kebersihan dan kenyamanan toilet anak?",
        ],
        lead: "Pertanyaan yang bisa Anda ajukan saat berkunjung:",
        extra: "Foto resmi sekolah akan menggantikan ilustrasi di website.",
      },
    },
    seeAll: "Lihat Fasilitas",
    ask: "Tanyakan Fasilitas",
  },
  schoolLife: {
    text: [
      "Berikut gambaran pengalaman anak di sekolah. Ini penjelasan umum, bukan jadwal resmi.",
    ],
    options: {
      arrive: "Datang",
      learn: "Belajar",
      play: "Bermain",
      daily: "Pengalaman sehari-hari",
    },
    items: {
      arrive: {
        title: "Datang",
        text: "Hari anak dimulai dengan disambut guru dan teman. Rutinitas yang tenang membantu anak merasa aman.",
      },
      learn: {
        title: "Belajar",
        text: "Anak belajar lewat empat pengalaman: Eksplorasi, Kreativitas, Bahasa dan komunikasi, serta Gerak dan bermain.",
      },
      play: {
        title: "Bermain",
        text: "Bermain adalah cara anak belajar bekerja sama, bergerak, dan mengekspresikan diri.",
      },
      daily: {
        title: "Pengalaman sehari-hari",
        text: "Halaman Kehidupan Sekolah merangkum empat hal yang dicari dari keseharian anak: rasa ingin tahu, kebersamaan, kemandirian, dan ekspresi.",
      },
    },
    note: "Urutan ini bukan jadwal resmi. Jadwal pasti dikonfirmasi sekolah.",
    seeAll: "Lihat Kehidupan Sekolah",
    ask: "Tanyakan Kegiatan",
  },
  visit: {
    text: [
      "Kami senang Anda tertarik mengenal lingkungan BGKS lebih dekat.",
    ],
    options: {
      info: "Lihat Informasi Kunjungan",
      contact: "Hubungi Sekolah",
    },
    info: {
      text: "Di halaman Jadwalkan Kunjungan Anda memilih tanggal dan slot, lalu melanjutkan ke WhatsApp. Sekolah akan mengonfirmasi waktu yang sesuai.",
      note: "Slot di website adalah contoh dan belum terhubung ke sistem pemesanan. Jadwal baru berlaku setelah dikonfirmasi sekolah.",
    },
    open: "Buka Halaman Jadwalkan Kunjungan",
    ask: "Tanya Jadwal Kunjungan",
  },
  contact: {
    text: [
      "Berikut lokasi dan kontak BGKS yang tersedia di website.",
    ],
    address: "Alamat",
    phone: "WhatsApp dan telepon",
    directions: "Petunjuk Arah",
    page: "Halaman Kontak",
    hoursMissing: "Jam layanan belum dicantumkan di website. Silakan tanyakan lewat WhatsApp.",
  },
  hours: {
    text: "Jam operasional belum dicantumkan di website. Silakan tanyakan langsung ke sekolah lewat WhatsApp.",
  },
  calendar: {
    text: "Halaman Kalender memuat contoh agenda dan acara sekolah dengan navigasi bulan. Agenda resmi dikonfirmasi sekolah.",
    open: "Buka Kalender",
  },
  news: {
    text: "Berita dan kegiatan sekolah dikumpulkan di halaman Berita. Isinya masih contoh sampai data resmi tersedia.",
    open: "Buka Berita",
  },
  about: {
    text: "Mulai dari halaman Tentang Sekolah untuk membaca profil sekolah dan filosofi Learn, Play, Grow.",
    note: "Profil tim pendidik di website masih contoh. Data resmi dikonfirmasi sekolah.",
    open: "Buka Tentang Sekolah",
  },
  faq: {
    text: "Pertanyaan umum orang tua dikelompokkan di halaman FAQ dan dapat dicari serta difilter.",
    open: "Buka FAQ",
  },
  thanks: {
    text: "Sama-sama! Senang bisa membantu.",
  },
  human: {
    text: "Saya asisten otomatis yang menjawab dari informasi di website, bukan manusia, dan tidak ada operator yang membaca percakapan ini. Untuk berbicara dengan tim BGKS, silakan lewat WhatsApp.",
  },
  aboutBot: {
    text: "Saya asisten informasi berbasis aturan, bukan AI. Saya mencocokkan pertanyaan Anda dengan informasi yang sudah disiapkan dari website BGKS.",
  },
  followup: {
    text: "Untuk informasi yang lebih rinci, Anda dapat membuka halaman terkait atau bertanya langsung ke tim BGKS.",
    open: "Buka Halaman Terkait",
  },
  disambig: {
    text: "Pertanyaan Anda bisa berkaitan dengan beberapa topik. Topik mana yang Anda maksud?",
  },
  faqItem: {
    lead: "Berikut jawaban dari FAQ BGKS:",
  },
  fallback: {
    text: "Maaf, saya belum dapat menemukan jawaban yang tepat untuk pertanyaan tersebut. Anda dapat memilih topik di bawah ini atau menghubungi tim BGKS melalui WhatsApp.",
    options: {
      programs: "Program",
      admission: "Pendaftaran",
      contact: "Kontak",
    },
  },
};
const en = {
  ui: {
    title: "BGKS Assistant",
    subtitle: "Your school information assistant",
    help: "How can we help your family today?",
    launcher: "Ask BGKS",
    launcherLabel: "Open BGKS Assistant",
    dialogLabel: "BGKS Assistant",
    close: "Close conversation",
    reset: "Start a new conversation",
    placeholder: "Type your question...",
    inputLabel: "Your question",
    send: "Send question",
    log: "Conversation",
    typing: "The assistant is preparing an answer",
    tooLong: "Message is too long. Maximum {n} characters.",
    hint: "Automatic answers based on the information on this website.",
    wa: "Chat on WhatsApp",
    userSaid: "You",
    botSaid: "BGKS Assistant",
    dummyNote:
      "This is sample information. Final confirmation comes from the school.",
    noWa: "The WhatsApp number is not configured. You can reach the school through the official Instagram.",
    instagram: "Official Instagram",
    loadError: "The assistant could not be loaded.",
  },
  greeting: [
    "Hello! Welcome to BGKS.",
    "I can help you explore our learning programs, school life, facilities, and admission information.",
    "What would you like to know?",
  ],
  menu: {
    programs: "Learning Programs",
    admission: "Admission Information",
    facilities: "School Facilities",
    visit: "Schedule a Visit",
    contact: "Location and Contact",
    other: "Ask Another Question",
  },
  back: "Main menu",
  menuAgain: "Is there anything else you would like to know?",
  other: {
    text: [
      "Please type your question in the box below. I will match it with the information on the BGKS website.",
    ],
    examples: [
      "How much is tuition?",
      "How do I enroll my child?",
      "Where is BGKS located?",
    ],
  },
  programs: {
    text: [
      "Glad you want to learn about BGKS programs. I can walk you through a few areas of learning experience.",
    ],
    options: {
      explore: "Exploration",
      creative: "Creativity",
      language: "Language and Communication",
      movement: "Movement and Play",
    },
    items: {
      explore: {
        title: "Exploration",
        text: "Children observe, ask, and try things to get to know the world around them. Curiosity is the way in to learning something new.",
        bullets: [
          "Observing leaves and tiny insects",
          "Trying objects that sink and float",
          "Asking about what they just saw",
        ],
        href: pg.program + "#eksplorasi",
      },
      creative: {
        title: "Creativity",
        text: "Colors, shapes, and simple materials let children express ideas and feelings without fear of getting it wrong.",
        bullets: [
          "Free drawing and coloring",
          "Pasting and folding paper",
          "Role play with everyday objects",
        ],
        href: pg.program + "#kreativitas",
      },
      language: {
        title: "Language and Communication",
        text: "Storytelling, listening, and asking questions help children share their thoughts with confidence.",
        bullets: [
          "Listening to and retelling stories",
          "Singing and answering questions in turn",
          "Getting to know letters through games",
        ],
        href: pg.program + "#bahasa",
      },
      movement: {
        title: "Movement and Play",
        text: "Moving freely builds muscles, balance, and the ability to cooperate with friends.",
        bullets: [
          "Jumping, running, and balancing",
          "Simple group games",
          "Throwing and catching a ball",
        ],
        href: pg.program + "#gerak",
      },
    },
    itemNote: "Common example activities. Current details are confirmed by the school.",
    seeAll: "View Learning Programs",
    ask: "Ask About Programs",
    stages: {
      text: "Every stage uses the same four learning experiences, with depth adjusted to the child's age.",
      bullets: [
        "Playgroup: getting to know friends and teachers, simple routines, sensory play, and free movement.",
        "Kindergarten A: storytelling, letters and sounds, trying colors and shapes, and playing in small groups.",
        "Kindergarten B: building independence and confidence for primary school through simple projects.",
      ],
    },
  },
  admission: {
    text: [
      "Of course! I can help you understand the first steps of the BGKS enrollment process.",
    ],
    options: {
      requirements: "Requirements",
      info: "Program information",
      how: "How to enroll",
      consult: "Consult via WhatsApp",
    },
    how: {
      text: "The website prepares the following first steps. The official order is still confirmed by the school.",
      bullets: [
        "Get to know the school through the About and Learning Programs pages.",
        "Fill in the inquiry form to compose an enrollment message.",
        "Send the message through WhatsApp or the official Instagram.",
        "Follow the school's guidance on fees, visit schedule, and documents.",
      ],
      note: "The website form only composes a message. No data is stored on the website.",
    },
    requirements: {
      text: "The official list of requirements is provided by the school during the process.",
      fallbackBullets: [
        "A copy of the child's birth certificate",
        "Family card",
        "Passport photos",
        "Immunization records",
      ],
    },
    infoBtn: "Enrollment Info",
    consultText: "For a consultation, you can contact the BGKS team on WhatsApp. The message is filled in for you and you press Send yourself in the WhatsApp app.",
  },
  fees: {
    text: "Fee details are not shown on the website. The school shares fees directly according to the learning group you choose.",
    note: "You can ask on WhatsApp without any commitment.",
  },
  age: {
    text: "Group placement follows the child's age and readiness, and is confirmed by the school.",
    hint: "Sample group division",
  },
  facilities: {
    text: [
      "You can explore the learning environment and the areas prepared to support your child's experience.",
    ],
    options: {
      learning: "Learning Spaces",
      play: "Play Areas",
      environment: "School Environment",
      all: "View All Facilities",
    },
    items: {
      learning: {
        title: "Learning Spaces",
        text: "Bright, clean, and with room for children to move.",
        bullets: [
          "What are the classrooms and lighting like?",
          "Where do children rest or eat together?",
        ],
        lead: "Questions you can ask during a visit:",
      },
      play: {
        title: "Play Areas",
        text: "Safe, shaded, and suited to the child's age.",
        bullets: [
          "Which indoor and outdoor play areas are there?",
          "Is there a shaded area for outdoor play?",
          "How are children supervised while playing?",
        ],
        lead: "Questions you can ask during a visit:",
        extra: "The pictures in Play World are concept illustrations, not documentation of school facilities.",
      },
      environment: {
        title: "School Environment",
        text: "Pick-up arrangements, child supervision, and the comfort of toilets and rest areas.",
        bullets: [
          "How are entrance security and pick-up arranged?",
          "How clean and comfortable are the children's toilets?",
        ],
        lead: "Questions you can ask during a visit:",
        extra: "Official school photos will replace the illustrations on the website.",
      },
    },
    seeAll: "View Facilities",
    ask: "Ask About Facilities",
  },
  schoolLife: {
    text: [
      "Here is an overview of a child's experience at school. This is a general description, not an official schedule.",
    ],
    options: {
      arrive: "Arrival",
      learn: "Learning",
      play: "Playing",
      daily: "Everyday experience",
    },
    items: {
      arrive: {
        title: "Arrival",
        text: "The day begins with a welcome from teachers and friends. A calm routine helps children feel safe.",
      },
      learn: {
        title: "Learning",
        text: "Children learn through four experiences: Exploration, Creativity, Language and communication, and Movement and play.",
      },
      play: {
        title: "Playing",
        text: "Play is how children learn to cooperate, move, and express themselves.",
      },
      daily: {
        title: "Everyday experience",
        text: "The School Life page sums up four things to look for in a child's day: curiosity, togetherness, independence, and expression.",
      },
    },
    note: "This order is not an official schedule. Exact times are confirmed by the school.",
    seeAll: "View School Life",
    ask: "Ask About Activities",
  },
  visit: {
    text: [
      "We are glad you are interested in getting to know the BGKS environment up close.",
    ],
    options: {
      info: "See Visit Information",
      contact: "Contact the School",
    },
    info: {
      text: "On the Schedule a Visit page you choose a date and slot, then continue to WhatsApp. The school will confirm a suitable time.",
      note: "Slots on the website are samples and are not connected to a booking system. A visit only counts once the school confirms it.",
    },
    open: "Open Schedule a Visit Page",
    ask: "Ask About Visits",
  },
  contact: {
    text: [
      "Here are the BGKS location and contact details available on the website.",
    ],
    address: "Address",
    phone: "WhatsApp and phone",
    directions: "Get Directions",
    page: "Contact Page",
    hoursMissing: "Service hours are not listed on the website yet. Please ask on WhatsApp.",
  },
  hours: {
    text: "Opening hours are not listed on the website yet. Please ask the school directly on WhatsApp.",
  },
  calendar: {
    text: "The Calendar page lists sample school agendas and events with month navigation. Official agendas are confirmed by the school.",
    open: "Open Calendar",
  },
  news: {
    text: "School news and activities are collected on the News page. The content is still sample until official data is available.",
    open: "Open News",
  },
  about: {
    text: "Start with the About the School page to read the school profile and the Learn, Play, Grow philosophy.",
    note: "Teacher profiles on the website are still samples. Official data is confirmed by the school.",
    open: "Open About the School",
  },
  faq: {
    text: "Common parent questions are grouped on the FAQ page, where you can search and filter them.",
    open: "Open FAQ",
  },
  thanks: {
    text: "You are welcome! Glad to help.",
  },
  human: {
    text: "I am an automatic assistant that answers from the information on this website. I am not a person, and no operator is reading this conversation. To talk to the BGKS team, please use WhatsApp.",
  },
  aboutBot: {
    text: "I am a rule-based information assistant, not AI. I match your question with prepared information from the BGKS website.",
  },
  followup: {
    text: "For more detail, you can open the related page or ask the BGKS team directly.",
    open: "Open Related Page",
  },
  disambig: {
    text: "Your question could relate to several topics. Which topic do you mean?",
  },
  faqItem: {
    lead: "Here is the answer from the BGKS FAQ:",
  },
  fallback: {
    text: "I'm sorry, I couldn't find an accurate answer to that question. You can choose one of the topics below or contact the BGKS team through WhatsApp.",
    options: {
      programs: "Programs",
      admission: "Admission",
      contact: "Contact",
    },
  },
};
export const knowledgeBase = { id, en };
