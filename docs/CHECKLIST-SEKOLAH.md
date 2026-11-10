# Checklist data dan aset dari BGKS

Konten demonstrasi ditandai isDummy:true di js/data (teachers, testimonials, news, faq). Ganti sebelum publikasi resmi.

## Identitas dan legal
- Logo resolusi tinggi, visi dan misi, profil resmi, sejarah, NPSN dan izin, profil kepala sekolah (js/data/school.js dan pages/tentang.html)

## Guru dan testimoni
- Foto, nama resmi, jabatan, deskripsi, izin publikasi (js/data/teachers.js)
- Kutipan asli orang tua dan izin publikasi (js/data/testimonials.js)

## Foto sekolah
- Gerbang, ruang belajar, area bermain, kegiatan, area antar jemput (js/data/gallery.js, js/data/facilities.js)

## Informasi operasional
- Jam layanan dan jadwal kunjungan resmi (school.hours)
- Email (school.email), kelompok usia dan rentang usia resmi (pages/program-belajar.html, js/data/faq.js)
- Program resmi, jadwal, biaya jika boleh dipublikasikan, kurikulum, rasio guru dan murid, prosedur pendaftaran

## Digital
- Domain produksi, lalu jalankan: node scripts/generate-sitemap.mjs https://domain-resmi.id
- Canonical dan URL gambar OG absolut (belum dipasang karena domain belum ada)
- Google Analytics ID (school.analyticsId, event click_whatsapp sudah siap)
- Akun booking (Cal.com atau Calendly), backend formulir, CMS: belum ada, belum diaktifkan
