import { PACKAGES } from './packages';

/* ── Armada ──
 * priceDalamKota / priceLuarKota = harga per hari sewa armada.
 * TODO: nilai luar kota masih duplikat dari harga lama, akan di-set manual.
 */
export const ARMADA_OPTIONS = [
  { id: 'hiace',               name: 'Hiace 14 Seat',               capacity: '14 Seat',                 passengerSeat: 14, type: 'Minibus',          minPax: 14, priceDalamKota: 1500000, priceLuarKota: 1500000, isBus: false },
  { id: 'medium-bus-35',       name: 'Medium Bus 35 Seat',           capacity: '35 Seat',                passengerSeat: 35, type: 'Bus Sedang',        minPax: 35, priceDalamKota: 2100000, priceLuarKota: 2500000, isBus: true  },
  { id: 'medium-bus-35-sr3',   name: 'Medium Bus 35 Seat SR3 2024',  capacity: '35 Seat',                passengerSeat: 35, type: 'Bus Sedang',        minPax: 35, priceDalamKota: 4000000, priceLuarKota: 4000000, isBus: true  },
  { id: 'medium-bus-18-luxury',name: 'Medium Bus 18 Seat Luxury',    capacity: '18 Seat',                passengerSeat: 18, type: 'Bus Sedang Luxury', minPax: 18, priceDalamKota: 4500000, priceLuarKota: 4500000, isBus: true  },
  { id: 'big-bus-jb3',         name: 'Big Bus JB3 50 Seat',          capacity: '50 Seat',                passengerSeat: 50, type: 'Bus Besar',         minPax: 50, priceDalamKota: 3300000, priceLuarKota: 4000000, isBus: true  },
  { id: 'big-bus-jb5',         name: 'Big Bus JB5 50 Seat',          capacity: '50 Seat',                passengerSeat: 50, type: 'Bus Besar',         minPax: 50, priceDalamKota: 6000000, priceLuarKota: 6000000, isBus: true  },
  { id: 'luxury-bus-36',       name: 'Luxury Bus 36 Seat',           capacity: '36 Seat',                passengerSeat: 36, type: 'Bus Luxury',        minPax: 36, priceDalamKota: 7000000, priceLuarKota: 7000000, isBus: true  },
];

/* ── Penginapan ── */
export const PENGINAPAN_OPTIONS = [
  { id: 'bintang-1', label: 'Bintang 1: Penginapan / Losmen', stars: 1, pricePerNight: 300000 },
  { id: 'bintang-2', label: 'Bintang 2: Hotel Budget',         stars: 2, pricePerNight: 300000 },
  { id: 'bintang-3', label: 'Bintang 3: Hotel Standar',        stars: 3, pricePerNight: 500000 },
  { id: 'bintang-4', label: 'Bintang 4: Hotel Premium',        stars: 4, pricePerNight: 600000 },
  { id: 'bintang-5', label: 'Bintang 5: Hotel Mewah',          stars: 5, pricePerNight: 850000 },
];

/* ── Lokasi Wisata (dari paket) ──
 * zone menentukan harga armada yang dipakai (dalam kota / luar kota).
 */
const LOKASI_META = {
  'pangandaran-citumang': { minPax: 18, pricePerPax: 100000, zone: 'luar-kota' },
  'ujung-genteng':        { minPax: 13, pricePerPax: 10000, zone: 'luar-kota' },
  'pangalengan-rafting':  { minPax: 13, pricePerPax: 185000, zone: 'dalam-kota' },
  'trip-ciwidey':         { minPax: 13, pricePerPax: 50000, zone: 'dalam-kota' },
};

// Jumlah hari sewa armada mengikuti durasi paket, contoh "2 hari 1 malam" → 2 hari.
const parseArmadaDays = (duration) => {
  const match = /(\d+)\s*hari/i.exec(duration ?? '');
  return match ? parseInt(match[1], 10) : 1;
};

export const LOKASI_OPTIONS = PACKAGES.map((p) => ({
  id: p.id,
  name: p.title,
  location: p.meta.location,
  duration: p.meta.duration,
  minPax: LOKASI_META[p.id]?.minPax ?? 13,
  pricePerPax: LOKASI_META[p.id]?.pricePerPax ?? 450000,
  zone: LOKASI_META[p.id]?.zone ?? 'luar-kota',
  armadaDays: parseArmadaDays(p.meta.duration),
  pricingTiers: p.pricingTiers ?? [],
}));

/* ── Makan ── */
export const MAKAN_OPTIONS = [
  { id: 'sarapan', label: 'Sarapan', pricePerPax: 20000 },
  { id: 'makan-siang', label: 'Makan Siang', pricePerPax: 30000 },
  { id: 'makan-malam', label: 'Makan Malam', pricePerPax: 35000 },
];

/* ── Kegiatan ── */
export const KEGIATAN_OPTIONS = [
  { id: 'snorkling', label: 'Snorkling', pricePerPax: 50000, description: '50k/orang', lokasi: ['pangandaran-citumang'] },
  { id: 'banana-boat', label: 'Banana Boat', pricePerPax: 50000, description: '50k/orang', lokasi: ['pangandaran-citumang'] },
  { id: 'tornado', label: 'Tornado', pricePerPax: 75000, description: '75k/orang', lokasi: ['pangandaran-citumang'] },
  { id: 'uvo-boat', label: 'Uvo Boat', pricePerPax: 75000, description: '75k/orang', lokasi: ['pangandaran-citumang'] },
  { id: 'nusa-kambangan', label: 'Nusa Kambangan', pricePerPax: 800000, description: '800/orang', lokasi: ['pangandaran-citumang'] },
  { id: 'atv-sepeda', label: 'ATV / Sepeda', pricePerPax: 100000, description: '100k/jam', lokasi: ['pangandaran-citumang'] },
  { id: 'surfing', label: 'Surfing', pricePerPax: 100000, description: '100k/hari', lokasi: ['pangandaran-citumang'] },
];

/* ── Asuransi Perjalanan (wajib) ── */
export const ASURANSI = {
  id: 'asuransi',
  label: 'Asuransi Perjalanan',
  pricePerPax: 25000,
  description: 'Asuransi bersifat wajib untuk setiap peserta',
};

/* ── Tour Guide (opsional) ── */
export const TOUR_GUIDE = {
  id: 'tour-guide',
  label: 'Tour Guide',
  price: 200000,
  description: 'Harga untuk 1 orang tour guide',
};

/* ── Variabel Tambahan (checkbox) ── */
// perPax: true  → price × jumlah orang
// (default)     → flat cost per trip
export const ADDITIONAL_OPTIONS = [
  { id: 'tol', label: 'Tol', price: 250000, infoOnly: true, description: 'Biaya tol PP (exclude dari harga armada)' },
  { id: 'parkir', label: 'Parkir', price: 50000, infoOnly: true, description: 'Biaya parkir di lokasi wisata (exclude dari harga armada)' },
  { id: 'tips-supir', label: 'Tips Supir', price: 100000, infoOnly: true, description: 'Tips driver (exclude dari harga armada)' },
  { id: 'tips-kondektur', label: 'Tips Kondektur', price: 75000, busOnly: true, infoOnly: true, description: 'Tips kondektur bus (exclude dari harga armada)' },
  { id: 'kendek', label: 'Kernet (Kendek)', price: 150000, busOnly: true, infoOnly: true, description: 'Kernet pendamping untuk bus' },
  { id: 'tour-leader', label: 'Tour Leader', price: 300000, infoOnly: true, description: 'Pemandu wisata profesional (makan TL sudah disediakan)' },
];
