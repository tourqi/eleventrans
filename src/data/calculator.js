import { FLEET } from './fleet';
import { PACKAGES } from './packages';

/* ── Armada ── */
export const ARMADA_OPTIONS = FLEET.map((v) => ({
  id: v.id,
  name: v.name,
  capacity: v.capacity,
  type: v.type,
  // Harga sewa per hari (dummy — sesuaikan dengan harga riil)
  price: {
    hiace: 1800000,
    'elf-long': 2200000,
    'bus-medium': 3500000,
    'bus-big': 5500000,
    avanza: 750000,
  }[v.id],
  isBus: ['bus-medium', 'bus-big'].includes(v.id),
}));

/* ── Penginapan ── */
export const PENGINAPAN_OPTIONS = [
  { id: 'bintang-1', label: 'Bintang 1 — Penginapan / Losmen', stars: 1, pricePerNight: 150000 },
  { id: 'bintang-2', label: 'Bintang 2 — Hotel Budget', stars: 2, pricePerNight: 300000 },
  { id: 'bintang-3', label: 'Bintang 3 — Hotel Standar', stars: 3, pricePerNight: 500000 },
  { id: 'bintang-4', label: 'Bintang 4 — Hotel Premium', stars: 4, pricePerNight: 850000 },
  { id: 'bintang-5', label: 'Bintang 5 — Hotel Mewah', stars: 5, pricePerNight: 1500000 },
];

/* ── Lokasi Wisata (dari paket) ── */
export const LOKASI_OPTIONS = PACKAGES.map((p) => ({
  id: p.id,
  name: p.title,
  location: p.meta.location,
  duration: p.meta.duration,
  // Estimasi biaya destinasi (tiket masuk, dll) per orang — dummy
  pricePerPax: {
    'pangandaran-citumang': 75000,
    'ujung-genteng': 100000,
    'pangalengan-rafting': 50000,
    'trip-ciwidey': 85000,
  }[p.id] || 75000,
}));

/* ── Paket Makan ── */
export const MAKAN_OPTIONS = [
  { id: 'makan-1', label: 'Paket Hemat — Nasi Box Sederhana', pricePerPax: 25000, description: '1x makan nasi box standar' },
  { id: 'makan-2', label: 'Paket Standar — Nasi Box + Snack', pricePerPax: 45000, description: '1x nasi box + 1x snack box' },
  { id: 'makan-3', label: 'Paket Lengkap — 2x Makan + Snack', pricePerPax: 75000, description: '2x nasi box + 1x snack' },
  { id: 'makan-4', label: 'Paket Premium — Prasmanan', pricePerPax: 100000, description: 'Prasmanan / buffet di restoran' },
  { id: 'makan-5', label: 'Paket VIP — Seafood / Special Menu', pricePerPax: 150000, description: 'Menu spesial seafood / fine dining' },
];

/* ── Kegiatan ── */
export const KEGIATAN_OPTIONS = [
  { id: 'body-rafting', label: 'Body Rafting', pricePerPax: 85000, lokasi: ['pangandaran-citumang'] },
  { id: 'rafting', label: 'Rafting / Arung Jeram', pricePerPax: 150000, lokasi: ['pangalengan-rafting'] },
  { id: 'fun-games', label: 'Fun Games & Team Building', pricePerPax: 35000, lokasi: ['pangandaran-citumang', 'ujung-genteng', 'pangalengan-rafting', 'trip-ciwidey'] },
  { id: 'outbound', label: 'Outbound Games', pricePerPax: 50000, lokasi: ['pangalengan-rafting', 'trip-ciwidey'] },
  { id: 'campfire', label: 'Api Unggun / Campfire Night', pricePerPax: 25000, lokasi: ['pangandaran-citumang', 'ujung-genteng'] },
];

/* ── Variabel Tambahan (checkbox) ── */
export const ADDITIONAL_OPTIONS = [
  { id: 'tol', label: 'Tol', price: 250000, perTrip: true, description: 'Biaya tol PP' },
  { id: 'parkir', label: 'Parkir', price: 50000, perTrip: true, description: 'Biaya parkir di lokasi wisata' },
  { id: 'tips-supir', label: 'Tips Supir', price: 100000, perTrip: true, description: 'Tips / uang makan driver' },
  { id: 'kendek', label: 'Kernet (Kendek)', price: 150000, perTrip: true, busOnly: true, description: 'Kernet pendamping untuk bus' },
  { id: 'tiket-masuk', label: 'Tiket Masuk Wisata', price: 50000, perPax: true, description: 'Tiket masuk objek wisata utama' },
  { id: 'tour-leader', label: 'Tour Leader', price: 300000, perTrip: true, busOrRequest: true, description: 'Pemandu wisata profesional' },
  { id: 'makan-tl', label: 'Makan Tour Leader', price: 75000, perTrip: true, description: 'Biaya makan tour leader' },
  { id: 'asuransi', label: 'Asuransi Perjalanan', price: 15000, perPax: true, description: 'Asuransi kecelakaan perjalanan' },
  { id: 'local-guide', label: 'Local Guide (Opsional)', price: 200000, perTrip: true, description: 'Pemandu wisata lokal di destinasi' },
];
