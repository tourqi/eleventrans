import {
  Compass,
  Users,
  Mountain,
  Building2,
} from 'lucide-react';

export const SERVICES = [
  {
    id: 'private-trip',
    slug: 'private-trip',
    title: 'Private Trip',
    tagline: 'Liburan Eksklusif Sesuai Gaya Kamu',
    short: 'Perjalanan wisata privat yang dirancang khusus untuk kamu dan grup kecilmu. Fleksibel, personal, penuh pengalaman.',
    description:
      'Bayangkan perjalanan tanpa antri, tanpa terburu-buru — hanya kamu, orang-orang terdekat, dan pengalaman terbaik. Private Trip dari Eleven Trans Holiday dirancang untuk memberi kamu kebebasan penuh: pilih destinasi, atur jadwal, nikmati perjalanan tanpa kompromi.',
    benefits: [
      'Itinerary 100% custom sesuai keinginan',
      'Kendaraan & driver privat',
      'Panduan lokal berpengalaman',
      'Fleksibel ubah rencana kapanpun',
      'Cocok untuk pasangan, keluarga kecil, atau sahabat',
    ],
    targets: ['Keluarga', 'Pasangan', 'Grup kecil (2-10 orang)'],
    icon: 'Compass',
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600',
    ],
  },
  {
    id: 'family-gathering',
    slug: 'family-gathering',
    title: 'Family Gathering',
    tagline: 'Momen Kebersamaan yang Tak Terlupakan',
    short: 'Acara gathering keluarga besar atau perusahaan dengan konsep seru, games, dan bonding yang memorable.',
    description:
      'Family Gathering bukan sekadar kumpul-kumpul — ini tentang membangun kenangan. Kami merancang konsep acara dari A-Z: venue, games, makan bersama, hingga dokumentasi. Semua dirancang agar setiap orang pulang dengan senyuman dan cerita.',
    benefits: [
      'Konsep acara kreatif & terencana',
      'MC & crew profesional',
      'Games interaktif untuk semua umur',
      'Venue pilihan terbaik',
      'Dokumentasi lengkap',
    ],
    targets: ['Perusahaan', 'Keluarga besar', 'Komunitas'],
    icon: 'Users',
    heroImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600',
    ],
  },
  {
    id: 'adventure-trip',
    slug: 'adventure-trip',
    title: 'Adventure Trip',
    tagline: 'Pacu Adrenalin, Bangun Kebersamaan',
    short: 'Rafting, hiking, team building — petualangan seru yang menantang dan memperkuat tim.',
    description:
      'Mau rafting di sungai yang menantang? Atau team building yang bikin tim makin solid? Adventure Trip kami dirancang untuk menciptakan momen yang mendebarkan sekaligus mempererat hubungan. Keselamatan tetap nomor satu — keseruan tetap maksimal.',
    benefits: [
      'Aktivitas outdoor terencana & aman',
      'Pemandu bersertifikat',
      'Peralatan lengkap disediakan',
      'Cocok untuk team building perusahaan',
      'Paket termasuk makan & transportasi',
    ],
    targets: ['Tim perusahaan', 'Komunitas', 'Sekolah & kampus'],
    icon: 'Mountain',
    heroImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600',
    ],
  },
  {
    id: 'industrial-visit',
    slug: 'industrial-visit',
    title: 'Industrial Visit',
    tagline: 'Belajar Langsung dari Sumbernya',
    short: 'Kunjungan industri edukatif ke perusahaan & pabrik untuk mahasiswa dan institusi.',
    description:
      'Industrial Visit dari Eleven Trans Holiday menghadirkan pengalaman belajar di luar kelas. Kunjungi perusahaan-perusahaan top, lihat proses produksi nyata, dan dapatkan wawasan langsung dari para profesional. Semua diatur oleh kami — kamu tinggal datang dan belajar.',
    benefits: [
      'Akses ke perusahaan & pabrik ternama',
      'Sesi tanya jawab dengan profesional',
      'Transportasi & logistik terurus',
      'Sertifikat kunjungan',
      'Dokumentasi kegiatan',
    ],
    targets: ['Mahasiswa', 'Sekolah', 'Organisasi kampus'],
    icon: 'Building2',
    heroImage: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600',
    ],
  },
];

export const SERVICE_ICONS = {
  Compass,
  Users,
  Mountain,
  Building2,
};

export function getServiceBySlug(slug) {
  return SERVICES.find((s) => s.slug === slug);
}
