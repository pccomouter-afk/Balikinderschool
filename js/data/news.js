export const newsCategories = [
  {
    key: "school",
    id: "Pengumuman dan Kegiatan Sekolah",
    en: "School Announcements and Activities",
  },
  { key: "parents", id: "Artikel untuk Orang Tua", en: "Articles for Parents" },
];
export const newsNote = {
  id: "Konten di halaman ini adalah data demonstrasi untuk prototipe website. Pengumuman dan kegiatan akan diganti dengan informasi resmi sekolah.",
  en: "Content on this page is demonstration data for the website prototype. Announcements and activities will be replaced with the school's official information.",
};
const A = { id: "Tim Redaksi BGKS", en: "BGKS Editorial Team" };
export const news = [
  {
    isDummy: true,
    slug: "pekan-pengenalan-sekolah",
    cat: "school",
    date: "2026-10-12",
    author: A,
    image: "assets/images/berita/12_oktober_2026.jpg",
    minutes: 3,
    alt: {
      id: "Ilustrasi bangku, bunga, dan matahari di halaman sekolah",
      en: "Illustration of a bench, flowers, and the sun in the school yard",
    },
    title: {
      id: "Pekan Pengenalan Sekolah untuk calon orang tua",
      en: "School Introduction Week for prospective parents",
    },
    summary: {
      id: "Contoh pengumuman: orang tua diajak berkeliling kelas, bertemu guru, dan mencoba kegiatan singkat bersama anak.",
      en: "Sample announcement: parents are invited to tour the classrooms, meet the teachers, and try a short activity with their child.",
    },
    intro: {
      id: "Pekan Pengenalan Sekolah adalah kesempatan bagi orang tua untuk melihat suasana belajar secara langsung sebelum memutuskan.",
      en: "School Introduction Week lets parents see the learning atmosphere first-hand before they decide.",
    },
    sections: [
      {
        h: { id: "Apa yang bisa dilakukan", en: "What you can do" },
        p: [
          {
            id: "Orang tua dapat berkeliling kelas, berbincang dengan guru, dan mengamati cara anak bermain dalam kelompok kecil.",
            en: "Parents can walk through the classrooms, chat with teachers, and watch how children play in small groups.",
          },
        ],
        list: [
          {
            id: "Berkeliling kelas dan halaman",
            en: "Tour the classrooms and yard",
          },
          {
            id: "Bertemu guru dan tim sekolah",
            en: "Meet the teachers and school team",
          },
          {
            id: "Mencoba kegiatan singkat bersama anak",
            en: "Try a short activity with your child",
          },
        ],
      },
      {
        h: { id: "Cara mengikuti", en: "How to join" },
        p: [
          {
            id: "Pilih tanggal dan slot waktu pada halaman Jadwalkan Kunjungan, lalu lanjutkan ke WhatsApp untuk konfirmasi.",
            en: "Pick a date and time slot on the Schedule a Visit page, then continue to WhatsApp for confirmation.",
          },
        ],
      },
    ],
    closing: {
      id: "Tanggal dan slot pada prototipe ini adalah contoh dan dikonfirmasi ulang oleh sekolah.",
      en: "Dates and slots in this prototype are examples and are reconfirmed by the school.",
    },
  },
  {
    isDummy: true,
    slug: "hari-bermain-di-halaman",
    cat: "school",
    date: "2026-09-26",
    author: A,
    image: "assets/images/berita/26_sep_2026.jpg",
    minutes: 3,
    alt: {
      id: "Ilustrasi taman dengan pohon, bangku, dan kupu-kupu",
      en: "Illustration of a garden with trees, a bench, and a butterfly",
    },
    title: {
      id: "Hari Bermain di Halaman: mengamati tanaman dan serangga",
      en: "Yard Play Day: observing plants and insects",
    },
    summary: {
      id: "Contoh kegiatan: anak mengamati daun, tanah, dan serangga kecil, lalu menceritakan temuannya kepada teman.",
      en: "Sample activity: children observe leaves, soil, and tiny insects, then tell their friends what they found.",
    },
    intro: {
      id: "Pada Hari Bermain di Halaman, kelas berpindah ke luar ruangan untuk belajar dari alam sekitar.",
      en: "On Yard Play Day, class moves outdoors to learn from the nature around them.",
    },
    sections: [
      {
        h: { id: "Mengamati dan bertanya", en: "Observing and asking" },
        p: [
          {
            id: "Anak membawa kaca pembesar sederhana dan mencari benda kecil yang menarik. Guru mengajukan pertanyaan terbuka agar anak berpikir.",
            en: "Children carry simple magnifying glasses and look for interesting small things. Teachers ask open questions to get them thinking.",
          },
        ],
      },
      {
        h: { id: "Bercerita bersama", en: "Sharing stories" },
        p: [
          {
            id: "Setelah mengamati, anak duduk melingkar dan menceritakan apa yang mereka temukan.",
            en: "After observing, children sit in a circle and tell what they found.",
          },
        ],
        list: [
          {
            id: "Menyebutkan warna dan bentuk",
            en: "Naming colors and shapes",
          },
          {
            id: "Menunggu giliran berbicara",
            en: "Waiting for a turn to speak",
          },
        ],
      },
    ],
    closing: {
      id: "Kegiatan ini contoh demonstrasi dan bukan laporan kegiatan resmi.",
      en: "This activity is a demonstration example and not an official activity report.",
    },
  },
  {
    isDummy: true,
    slug: "mendukung-rasa-ingin-tahu-anak",
    cat: "parents",
    date: "2026-09-10",
    author: A,
    image: "assets/images/berita/10_sep_2026.jpg",
    minutes: 4,
    alt: {
      id: "Ilustrasi kaca pembesar di atas daun dan kupu-kupu",
      en: "Illustration of a magnifying glass over a leaf and a butterfly",
    },
    title: {
      id: "Mendukung rasa ingin tahu anak lewat aktivitas sederhana",
      en: "Supporting your child's curiosity with simple activities",
    },
    summary: {
      id: "Rasa ingin tahu tumbuh dari pengalaman kecil sehari-hari. Berikut cara mendampingi anak tanpa alat khusus.",
      en: "Curiosity grows from small everyday experiences. Here is how to support your child without special tools.",
    },
    intro: {
      id: "Anak usia dini bertanya, menyentuh, dan mencoba hampir tanpa henti. Itulah cara mereka memahami dunia, dan orang dewasa dapat membantu menjaganya tetap menyala.",
      en: "Young children ask, touch, and try almost without stopping. That is how they make sense of the world, and adults can help keep it going.",
    },
    sections: [
      {
        h: {
          id: "Mulai dari yang ada di sekitar",
          en: "Start with what is around you",
        },
        p: [
          {
            id: "Daun yang jatuh, semut di tembok, atau air yang mengalir sudah cukup menjadi bahan belajar. Ajak anak mengamati dulu sebelum menjelaskan apa pun.",
            en: "A fallen leaf, ants on a wall, or running water are enough to learn from. Let your child observe first before you explain anything.",
          },
        ],
        list: [
          {
            id: "Berhenti sejenak saat anak menunjuk sesuatu",
            en: "Pause when your child points at something",
          },
          {
            id: "Sebutkan apa yang kamu lihat bersama-sama",
            en: "Name what you see together",
          },
          {
            id: "Biarkan anak menyentuh benda yang aman",
            en: "Let your child touch safe objects",
          },
        ],
      },
      {
        h: {
          id: "Jawab dengan pertanyaan balik",
          en: "Answer with a question",
        },
        p: [
          {
            id: "Saat anak bertanya mengapa, tidak harus langsung menjawab. Pertanyaan balik seperti menurutmu kenapa mengajak anak menyusun dugaannya sendiri.",
            en: "When your child asks why, you do not have to answer right away. A question back, such as what do you think, invites them to form their own guess.",
          },
          {
            id: "Bila belum tahu jawabannya, katakan dengan jujur lalu cari tahu bersama.",
            en: "If you do not know the answer, say so honestly and find out together.",
          },
        ],
      },
      {
        h: {
          id: "Beri waktu yang tidak terburu-buru",
          en: "Give unhurried time",
        },
        p: [
          {
            id: "Rasa ingin tahu membutuhkan ruang. Beberapa menit mengamati lebih bernilai daripada daftar kegiatan yang padat.",
            en: "Curiosity needs room. A few minutes of watching is worth more than a packed list of activities.",
          },
        ],
      },
    ],
    closing: {
      id: "Pilih satu kebiasaan kecil, lalu ulangi dalam beberapa hari.",
      en: "Pick one small habit and repeat it over a few days.",
    },
  },
  {
    isDummy: true,
    slug: "belajar-lewat-bermain",
    cat: "parents",
    date: "2026-08-28",
    author: A,
    image: "assets/images/berita/28_agust_2026.jpg",
    minutes: 5,
    alt: {
      id: "Ilustrasi susunan balok mainan berwarna",
      en: "Illustration of stacked colorful toy blocks",
    },
    title: {
      id: "Cara memanfaatkan permainan sebagai sarana belajar",
      en: "How to use play as a way to learn",
    },
    summary: {
      id: "Bermain bukan lawan dari belajar. Ketahui apa yang dilatih anak saat berlari, menyusun balok, dan menunggu giliran.",
      en: "Play is not the opposite of learning. See what children practice when they run, stack blocks, and wait for a turn.",
    },
    intro: {
      id: "Bagi anak usia dini, bermain adalah pekerjaan utama. Di dalamnya ada latihan tubuh, pikiran, dan hubungan dengan teman.",
      en: "For young children, play is their main work. It trains the body, the mind, and relationships with friends.",
    },
    sections: [
      {
        h: {
          id: "Bermain aktif melatih tubuh",
          en: "Active play trains the body",
        },
        p: [
          {
            id: "Berlari, memanjat, dan meluncur melatih keseimbangan, kekuatan, dan koordinasi.",
            en: "Running, climbing, and sliding build balance, strength, and coordination.",
          },
        ],
      },
      {
        h: {
          id: "Bermain menyusun melatih pikiran",
          en: "Building play trains the mind",
        },
        p: [
          {
            id: "Menyusun balok atau membuat jalan dari kardus mengajak anak berpikir ruang. Robohnya menara adalah kesempatan mencoba lagi.",
            en: "Stacking blocks or making a road from cardboard gets children thinking in space. A fallen tower is a chance to try again.",
          },
        ],
        list: [
          {
            id: "Sediakan bahan terbuka seperti balok dan kardus",
            en: "Offer open-ended materials such as blocks and cardboard",
          },
          {
            id: "Tanyakan apa yang sedang dibuat",
            en: "Ask what is being made",
          },
        ],
      },
      {
        h: {
          id: "Bermain bersama melatih hubungan",
          en: "Playing together builds relationships",
        },
        p: [
          {
            id: "Menunggu giliran dan berbagi mainan adalah latihan mengelola perasaan.",
            en: "Waiting for a turn and sharing toys are practice in managing feelings.",
          },
        ],
      },
    ],
    closing: {
      id: "Permainan yang baik tidak selalu mahal. Waktu dan perhatian sering menjadi bahan terpenting.",
      en: "Good play does not have to be expensive. Time and attention are often the most important ingredients.",
    },
  },
  {
    isDummy: true,
    slug: "membaca-bersama-anak",
    cat: "parents",
    date: "2026-08-14",
    author: A,
    image: "assets/images/berita/14_agust_2026.jpg",
    minutes: 4,
    alt: {
      id: "Ilustrasi dua gelembung percakapan dan buku terbuka",
      en: "Illustration of two speech bubbles and an open book",
    },
    title: {
      id: "Membangun kebiasaan membaca bersama anak",
      en: "Building a reading habit with your child",
    },
    summary: {
      id: "Sepuluh menit yang konsisten lebih berguna daripada satu jam yang jarang. Mulailah dengan buku bergambar.",
      en: "Ten consistent minutes are worth more than a rare hour. Start with picture books.",
    },
    intro: {
      id: "Membaca bersama memperkenalkan kata baru, melatih fokus, dan memberi anak waktu dekat dengan orang dewasa.",
      en: "Reading together introduces new words, builds focus, and gives children close time with an adult.",
    },
    sections: [
      {
        h: {
          id: "Pilih waktu yang sama setiap hari",
          en: "Pick the same time every day",
        },
        p: [
          {
            id: "Kebiasaan lebih mudah terbentuk bila terikat pada momen tertentu, misalnya sebelum tidur. Cukup sepuluh menit.",
            en: "Habits form more easily when tied to a certain moment, such as bedtime. Ten minutes is enough.",
          },
        ],
      },
      {
        h: {
          id: "Biarkan anak memilih buku",
          en: "Let your child choose the book",
        },
        p: [
          {
            id: "Tidak masalah bila anak meminta buku yang sama berulang kali. Pengulangan membantu anak mengenali pola kata dan cerita.",
            en: "It is fine if your child asks for the same book again and again. Repetition helps them recognize patterns in words and stories.",
          },
        ],
      },
      {
        h: {
          id: "Ajak anak ikut bercerita",
          en: "Invite your child into the story",
        },
        p: [
          {
            id: "Berhenti di tengah halaman dan tanyakan apa yang mungkin terjadi berikutnya.",
            en: "Stop mid-page and ask what might happen next.",
          },
        ],
        list: [
          {
            id: "Baca dengan suara yang hidup",
            en: "Read with a lively voice",
          },
          {
            id: "Akhiri sebelum anak bosan",
            en: "Stop before your child gets bored",
          },
        ],
      },
    ],
    closing: {
      id: "Bila suatu hari terlewat, mulai lagi esok hari tanpa rasa bersalah.",
      en: "If you miss a day, start again tomorrow without guilt.",
    },
  },
  {
    isDummy: true,
    slug: "ide-kegiatan-kreatif-di-rumah",
    cat: "parents",
    date: "2026-07-30",
    author: A,
    image: "assets/images/berita/30_juli_2026.jpg",
    minutes: 3,
    alt: {
      id: "Ilustrasi palet warna, kuas, dan krayon",
      en: "Illustration of a color palette, brush, and crayons",
    },
    title: {
      id: "Ide kegiatan kreatif di rumah dengan bahan seadanya",
      en: "Creative activity ideas at home with simple materials",
    },
    summary: {
      id: "Kertas bekas, krayon, dan bahan dapur sudah cukup. Berikut beberapa ide untuk akhir pekan.",
      en: "Scrap paper, crayons, and kitchen items are enough. Here are a few ideas for the weekend.",
    },
    intro: {
      id: "Kegiatan kreatif tidak harus rapi dan tidak harus menghasilkan karya yang bagus. Prosesnya yang paling penting bagi anak.",
      en: "Creative activities do not need to be tidy or produce a great result. The process matters most to children.",
    },
    sections: [
      {
        h: { id: "Menggambar bebas", en: "Free drawing" },
        p: [
          {
            id: "Sediakan kertas bekas dan krayon, lalu biarkan anak menggambar apa saja. Cukup tanyakan ceritanya.",
            en: "Provide scrap paper and crayons, then let your child draw anything. Simply ask about the story.",
          },
        ],
      },
      {
        h: { id: "Bermain warna dengan air", en: "Playing with watercolor" },
        p: [
          {
            id: "Cat air yang diencerkan, kuas besar, dan alas koran dapat menjadi kegiatan yang menyenangkan.",
            en: "Diluted watercolors, a big brush, and a newspaper mat make a fun activity.",
          },
        ],
      },
      {
        h: {
          id: "Menyusun dari bahan bekas",
          en: "Building from recycled items",
        },
        p: [
          {
            id: "Kardus kecil, tutup botol, dan gulungan tisu dapat disusun menjadi kendaraan atau rumah. Awasi anak saat memakai gunting dan lem.",
            en: "Small boxes, bottle caps, and tissue rolls can become vehicles or houses. Supervise your child with scissors and glue.",
          },
        ],
        list: [
          {
            id: "Siapkan wadah untuk bahan",
            en: "Prepare a container for materials",
          },
          {
            id: "Simpan hasil karya untuk dilihat bersama",
            en: "Keep the artwork to look at together",
          },
        ],
      },
    ],
    closing: {
      id: "Tawarkan, jangan paksa. Anak yang memilih sendiri biasanya bertahan lebih lama.",
      en: "Offer, do not force. Children who choose for themselves usually stay with it longer.",
    },
  },
];
export const findNews = (slug) => news.find((a) => a.slug === slug) || null;
export const categoryOf = (a) => newsCategories.find((c) => c.key === a.cat);
