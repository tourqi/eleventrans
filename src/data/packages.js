export const PACKAGES = [
  /* ───────────────────── 1. Pangandaran + Citumang ───────────────────── */
  {
    id: 'pangandaran-citumang',
    slug: 'pangandaran-citumang',
    title: 'Trip Pangandaran + Citumang',
    tagline: 'Pantai, Body Rafting & Keseruan 2 Hari 1 Malam',
    excerpt:
      'Nikmati keindahan pantai Pangandaran dan sensasi body rafting di Citumang. Tersedia mulai paket Silver hingga Platinum+ dengan pilihan armada dan hotel sesuai budget.',
    overview: [
      'Pangandaran dan Citumang adalah kombinasi sempurna untuk liburan singkat yang berkesan. Hari pertama kamu akan menjelajahi pantai Pangandaran yang ikonik, menikmati sunset, dan istirahat di penginapan pilihan.',
      'Hari kedua, bersiaplah untuk petualangan body rafting di sungai Citumang — air jernih kehijauan di tengah hutan tropis. Sensasi yang tidak akan kamu lupakan!',
      'Dengan beragam pilihan paket dari Silver sampai Platinum+, kamu bisa pilih level kenyamanan sesuai keinginan. Semua sudah termasuk transportasi, makan, dan tiket wisata.',
    ],
    itinerary: [
      { time: 'Hari 1 — 06:00', title: 'Keberangkatan dari Bandung', description: 'Meeting point dan berangkat menuju Pangandaran. Perjalanan kurang lebih 5 jam dengan istirahat di rest area.' },
      { time: 'Hari 1 — 12:00', title: 'Tiba & Makan Siang', description: 'Sampai di Pangandaran, langsung makan siang di restoran lokal.' },
      { time: 'Hari 1 — 14:00', title: 'Explore Pantai Pangandaran', description: 'Jelajahi pantai, bermain air, atau bersantai menikmati angin laut.' },
      { time: 'Hari 1 — 18:00', title: 'Makan Malam & Check-in', description: 'Makan malam seafood khas Pangandaran, lalu check-in dan istirahat.' },
      { time: 'Hari 2 — 07:00', title: 'Sarapan', description: 'Sarapan di penginapan/hotel.' },
      { time: 'Hari 2 — 08:30', title: 'Body Rafting Citumang 🌊', description: 'Petualangan utama! Body rafting menyusuri sungai Citumang yang jernih di tengah hutan.' },
      { time: 'Hari 2 — 12:00', title: 'Makan Siang & Persiapan Pulang', description: 'Makan siang, bersiap-siap, dan mulai perjalanan kembali ke Bandung.' },
      { time: 'Hari 2 — 18:00', title: 'Tiba di Bandung', description: 'Sampai di Bandung dengan kenangan tak terlupakan! 👋' },
    ],
    activities: [
      'Explore Pantai Pangandaran',
      'Body Rafting Citumang',
      'Sunset Watching',
      'Foto & Dokumentasi',
    ],
    menu: [
      'Sarapan 2x',
      'Makan Siang 2x',
      'Makan Malam 1x',
    ],
    highlights: [
      'Transportasi PP dari Bandung',
      'Penginapan / Hotel sesuai paket',
      'Makan 5x selama trip',
      'Tiket masuk wisata',
      'Tour Leader berpengalaman',
      'Tips driver sudah termasuk',
      'Toll & parkir sudah termasuk',
    ],
    pricingTiers: [
      { tier: 'Silver', hotel: 'Penginapan', vehicle: 'Medium Bus 35 Seat', price: 600000, minPax: 35 },
      { tier: 'Gold', hotel: 'Hotel ⭐⭐/⭐⭐⭐', vehicle: 'Medium Bus 35 Seat SR3 2024', price: 670000, minPax: 35 },
      { tier: 'Premium', hotel: 'Hotel ⭐⭐⭐⭐/⭐⭐⭐⭐⭐', vehicle: 'Medium Bus 18 Seat Luxury', price: 1200000, minPax: 18 },
      { tier: 'Silver', hotel: 'Penginapan', vehicle: 'Big Bus JB3 50 Seat', price: 600000, minPax: 50 },
      { tier: 'Gold', hotel: 'Hotel ⭐⭐/⭐⭐⭐', vehicle: 'Big Bus JB3 50 Seat', price: 670000, minPax: 50 },
      { tier: 'Gold+', hotel: 'Hotel ⭐⭐/⭐⭐⭐', vehicle: 'Big Bus JB5 50 Seat', price: 700000, minPax: 50 },
      { tier: 'Platinum', hotel: 'Hotel ⭐⭐⭐⭐/⭐⭐⭐⭐⭐', vehicle: 'Big Bus JB5 50 Seat', price: 800000, minPax: 50 },
      { tier: 'Platinum+', hotel: 'Hotel ⭐⭐⭐⭐/⭐⭐⭐⭐⭐', vehicle: 'Luxury Bus 36 Seat', price: 850000, minPax: 36 },
    ],
    priceFrom: 600000,
    priceCurrency: 'IDR',
    priceUnit: '/orang',
    priceNote: 'Harga tergantung paket & jumlah peserta. Hubungi kami untuk penawaran terbaik.',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800',
      'https://images.unsplash.com/photo-1468413253725-0d5181091126?w=800',
    ],
    ctaPrefill:
      'Halo Eleven Trans! 👋 Saya tertarik dengan paket Trip Pangandaran + Citumang. Bisa minta info lengkap & harga? Terima kasih!',
    meta: {
      duration: '2 hari 1 malam',
      groupSize: 'Min. 18 orang',
      difficulty: 'Mudah — Menengah',
      location: 'Pangandaran, Jawa Barat',
      includes: 'Transportasi, hotel, makan 5x, tiket wisata',
    },
    relatedService: 'adventure-trip',
    featured: true,
  },

  /* ───────────────────── 2. Ujung Genteng ───────────────────── */
  {
    id: 'ujung-genteng',
    slug: 'ujung-genteng',
    title: 'Trip Ujung Genteng',
    tagline: 'Pantai Tersembunyi, Penyu & Air Terjun Cikaso',
    excerpt:
      'Jelajahi keindahan tersembunyi Ujung Genteng — pantai pasir putih, penangkaran penyu Pangumbahan, Bukit Teletubies, dan air terjun Cikaso yang memukau.',
    overview: [
      'Ujung Genteng adalah surga tersembunyi di ujung selatan Sukabumi. Jauh dari keramaian, destinasi ini menawarkan pantai-pantai yang masih alami, ombak besar, dan pemandangan yang bikin speechless.',
      'Dalam trip ini, kamu akan mengunjungi beberapa spot terbaik: Pantai Ujung Genteng, Penangkaran Penyu Pangumbahan, Bukit Teletubies, Pantai Tenda Biru, Pantai Minajaya, hingga Air Terjun Cikaso yang megah.',
      'Makan seafood segar langsung dari laut, menginap di penginapan tepi pantai, dan menikmati sunrise yang tak akan kamu lupakan. Cocok banget untuk healing trip!',
    ],
    itinerary: [
      { time: 'Hari 1 — 05:00', title: 'Keberangkatan', description: 'Berangkat dari Bandung menuju Ujung Genteng dengan Hiace nyaman.' },
      { time: 'Hari 1 — 12:00', title: 'Tiba & Makan Siang', description: 'Sampai di Ujung Genteng, makan siang dan check-in penginapan.' },
      { time: 'Hari 1 — 14:00', title: 'Explore Pantai & Bukit Teletubies 🏖️', description: 'Jelajahi Pantai Ujung Genteng, Bukit Teletubies, dan Pantai Tenda Biru.' },
      { time: 'Hari 1 — 18:00', title: 'Makan Malam Seafood 🦐', description: 'Nikmati makan malam seafood segar khas pesisir selatan.' },
      { time: 'Hari 1 — 20:00', title: 'Penangkaran Penyu Pangumbahan 🐢', description: 'Kunjungan malam ke penangkaran penyu — saksikan penyu bertelur (musiman).' },
      { time: 'Hari 2 — 07:00', title: 'Sarapan & Check-out', description: 'Sarapan, bersiap untuk explore hari kedua.' },
      { time: 'Hari 2 — 09:00', title: 'Pantai Minajaya & Air Terjun Cikaso 🌊', description: 'Kunjungi Pantai Minajaya dan naik perahu menuju Air Terjun Cikaso yang spektakuler.' },
      { time: 'Hari 2 — 12:00', title: 'Makan Siang', description: 'Makan siang sebelum lanjut explore.' },
      { time: 'Hari 3 — 07:00', title: 'Sarapan & Explore Terakhir', description: 'Sarapan dan explore terakhir sebelum pulang.' },
      { time: 'Hari 3 — 12:00', title: 'Makan Siang & Pulang', description: 'Makan siang, lalu perjalanan kembali ke Bandung.' },
    ],
    activities: [
      'Explore Pantai Ujung Genteng',
      'Penangkaran Penyu Pangumbahan',
      'Bukit Teletubies',
      'Pantai Tenda Biru',
      'Pantai Minajaya',
      'Air Terjun Cikaso + Perahu',
    ],
    menu: [
      'Sarapan 3x',
      'Makan Siang 3x',
      'Makan Malam 1x',
      'Seafood 1x',
    ],
    highlights: [
      'Hiace 14 Seat (13 seat penumpang)',
      'Tips driver sudah termasuk',
      'Tour Leader berpengalaman',
      'Semua tiket masuk wisata termasuk',
      'Perahu Air Terjun Cikaso termasuk',
      'Toll & parkir termasuk',
      'Penginapan',
      'Makan 8x selama trip',
    ],
    priceFrom: 1000000,
    priceCurrency: 'IDR',
    priceUnit: '/orang',
    priceNote: 'Minimal 13 pax. Menggunakan Hiace 14 Seat.',
    images: [
      'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1200',
      'https://images.unsplash.com/photo-1505881502353-a1986add3762?w=800',
      'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800',
      'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800',
    ],
    ctaPrefill:
      'Halo Eleven Trans! 👋 Saya tertarik dengan paket Trip Ujung Genteng. Bisa minta info lengkap & harga? Terima kasih!',
    meta: {
      duration: '3 hari 2 malam',
      groupSize: 'Min. 13 orang',
      difficulty: 'Mudah',
      location: 'Ujung Genteng, Sukabumi',
      includes: 'Transportasi, penginapan, makan 8x, tiket wisata',
    },
    relatedService: 'adventure-trip',
    featured: true,
  },

  /* ───────────────────── 3. Pangalengan (Rafting Situ Cileunca) ───────────────────── */
  {
    id: 'pangalengan-rafting',
    slug: 'pangalengan-rafting',
    title: 'Pangalengan — Rafting Situ Cileunca',
    tagline: 'Rafting Seru + Team Building + Makan Siang',
    excerpt:
      'Rasakan serunya arung jeram di Situ Cileunca Pangalengan lengkap dengan games, team building, snack, dan makan siang. Cocok untuk outing dan gathering!',
    overview: [
      'Pangalengan di dataran tinggi Bandung Selatan menawarkan udara sejuk dan sungai yang menantang untuk arung jeram. Rafting di Situ Cileunca adalah pilihan tepat untuk team building yang seru dan menyegarkan.',
      'Paket ini sudah termasuk rafting, games/team building, snack, dan makan siang. Tinggal datang, seru-seruan, dan pulang dengan kenangan yang luar biasa!',
    ],
    itinerary: [
      { time: '06:00', title: 'Keberangkatan dari Bandung', description: 'Meeting point dan berangkat dengan Hiace menuju Pangalengan.' },
      { time: '08:00', title: 'Tiba di Basecamp', description: 'Tiba di lokasi, persiapan, dan briefing safety dari guide.' },
      { time: '08:30', title: 'Rafting Start! 🚣', description: 'Arung jeram menyusuri aliran Situ Cileunca. Seru, menantang, dan aman!' },
      { time: '10:30', title: 'Snack Time', description: 'Istirahat dan nikmati snack yang sudah disiapkan.' },
      { time: '11:00', title: 'Games & Team Building 🎯', description: 'Aneka games seru untuk mempererat kekompakan tim.' },
      { time: '12:30', title: 'Makan Siang', description: 'Makan siang bersama di lokasi.' },
      { time: '14:00', title: 'Perjalanan Pulang', description: 'Kembali ke Bandung. Capek tapi happy! 👋' },
    ],
    activities: [
      'Arung Jeram Situ Cileunca',
      'Games & Team Building',
      'Snack & Makan Siang',
    ],
    menu: [
      'Snack',
      'Makan Siang 1x',
    ],
    highlights: [
      'Hiace 14 Seat (13 seat penumpang)',
      'Tips driver + makan driver termasuk',
      'Tour Leader berpengalaman',
      'Paket Rafting lengkap dengan peralatan',
      'Games / Team Building',
      'Snack & makan siang',
      'Toll & parkir termasuk',
    ],
    priceFrom: 450000,
    priceCurrency: 'IDR',
    priceUnit: '/orang',
    priceNote: 'Minimal 13 pax. Menggunakan Hiace 14 Seat.',
    images: [
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
    ],
    ctaPrefill:
      'Halo Eleven Trans! 👋 Saya tertarik dengan paket Rafting Pangalengan (Situ Cileunca). Bisa minta info lengkap & harga? Terima kasih!',
    meta: {
      duration: '1 hari (full day)',
      groupSize: 'Min. 13 orang',
      difficulty: 'Menengah',
      location: 'Pangalengan, Bandung Selatan',
      includes: 'Transportasi, rafting, games, snack, makan siang',
    },
    relatedService: 'adventure-trip',
    featured: false,
  },

  /* ───────────────────── 4. Ciwidey ───────────────────── */
  {
    id: 'trip-ciwidey',
    slug: 'trip-ciwidey',
    title: 'Trip Ciwidey',
    tagline: 'Kawah Putih, Situ Patenggang & Pemandian Air Panas',
    excerpt:
      'Jelajahi keindahan Ciwidey dalam satu hari — Kawah Putih, Situ Patenggang, Rengganis Suspension Bridge, Kebun Teh Rancabali, dan berendam di kolam air panas Ciwalini.',
    overview: [
      'Ciwidey adalah destinasi favorit wisatawan yang ingin menikmati keindahan alam dataran tinggi Bandung Selatan. Udara sejuk, pemandangan hijau, dan pesona kawah vulkanik — semua ada di sini.',
      'Dalam satu hari, kamu akan mengunjungi Kawah Putih dengan danau berwarna tosca yang ikonik, naik ontang-anting, lalu menyeberangi Rengganis Suspension Bridge di Situ Patenggang. Jangan lupa mampir ke Kebun Teh Rancabali dan tutup hari dengan berendam di kolam air panas Ciwalini. Relaksasi total!',
    ],
    itinerary: [
      { time: '07:00', title: 'Keberangkatan dari Bandung', description: 'Dijemput di meeting point, berangkat menuju Ciwidey.' },
      { time: '09:00', title: 'Kawah Putih + Ontang-Anting 🌋', description: 'Menikmati keindahan Kawah Putih dan naik ontang-anting (kereta wisata).' },
      { time: '11:00', title: 'Situ Patenggang & Suspension Bridge 🌉', description: 'Explore Situ Patenggang dan melintas Rengganis Suspension Bridge yang mendebarkan.' },
      { time: '12:30', title: 'Makan Siang', description: 'Makan siang di restoran lokal dengan menu khas Sunda.' },
      { time: '14:00', title: 'Kebun Teh Rancabali 🍵', description: 'Berjalan-jalan di hamparan kebun teh hijau yang menyejukkan mata.' },
      { time: '15:30', title: 'Kolam Air Panas Ciwalini ♨️', description: 'Berendam di kolam air panas alami. Relaksasi sempurna setelah seharian explore!' },
      { time: '17:00', title: 'Perjalanan Pulang', description: 'Kembali ke Bandung dengan badan segar dan hati senang.' },
    ],
    activities: [
      'Kawah Putih + Ontang-Anting',
      'Situ Patenggang',
      'Rengganis Suspension Bridge',
      'Kebun Teh Rancabali',
      'Kolam Air Panas Ciwalini',
    ],
    menu: [
      'Makan Siang 1x',
    ],
    highlights: [
      'Hiace 14 Seat (13 seat penumpang)',
      'Tips driver + makan driver termasuk',
      'Tour Leader berpengalaman',
      'Tiket masuk Kawah Putih + Ontang-Anting',
      'Tiket Situ Patenggang & Rengganis Suspension Bridge',
      'Tiket masuk Kebun Teh Rancabali',
      'Tiket kolam air panas Ciwalini',
      'Toll & parkir termasuk',
      'Makan siang 1x',
    ],
    priceFrom: 450000,
    priceCurrency: 'IDR',
    priceUnit: '/orang',
    priceNote: 'Minimal 13 pax. Menggunakan Hiace 14 Seat.',
    images: [
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
    ],
    ctaPrefill:
      'Halo Eleven Trans! 👋 Saya tertarik dengan paket Trip Ciwidey. Bisa minta info lengkap & harga? Terima kasih!',
    meta: {
      duration: '1 hari (full day)',
      groupSize: 'Min. 13 orang',
      difficulty: 'Mudah',
      location: 'Ciwidey, Bandung Selatan',
      includes: 'Transportasi, tiket wisata, makan siang',
    },
    relatedService: 'private-trip',
    featured: false,
  },
];

export function getPackageBySlug(slug) {
  return PACKAGES.find((p) => p.slug === slug);
}

export function getFeaturedPackages() {
  return PACKAGES.filter((p) => p.featured);
}
