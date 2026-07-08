import { PACKAGES } from './packages';

/* ── Armada ── */
export const ARMADA_OPTIONS = [
  { id: 'hiace',               name: 'Hiace 14 Seat',               capacity: '14 Seat (13 penumpang)', passengerSeat: 13, type: 'Minibus',          minPax: 13, price: 1800000, isBus: false },
  { id: 'medium-bus-35',       name: 'Medium Bus 35 Seat',           capacity: '35 Seat',                passengerSeat: 35, type: 'Bus Sedang',        minPax: 35, price: 3500000, isBus: true  },
  { id: 'medium-bus-35-sr3',   name: 'Medium Bus 35 Seat SR3 2024',  capacity: '35 Seat',                passengerSeat: 35, type: 'Bus Sedang',        minPax: 35, price: 4000000, isBus: true  },
  { id: 'medium-bus-18-luxury',name: 'Medium Bus 18 Seat Luxury',    capacity: '18 Seat',                passengerSeat: 18, type: 'Bus Sedang Luxury', minPax: 18, price: 4500000, isBus: true  },
  { id: 'big-bus-jb3',         name: 'Big Bus JB3 50 Seat',          capacity: '50 Seat',                passengerSeat: 50, type: 'Bus Besar',         minPax: 50, price: 5500000, isBus: true  },
  { id: 'big-bus-jb5',         name: 'Big Bus JB5 50 Seat',          capacity: '50 Seat',                passengerSeat: 50, type: 'Bus Besar',         minPax: 50, price: 6000000, isBus: true  },
  { id: 'luxury-bus-36',       name: 'Luxury Bus 36 Seat',           capacity: '36 Seat',                passengerSeat: 36, type: 'Bus Luxury',        minPax: 36, price: 7000000, isBus: true  },
];

/* ── Penginapan ── */
export const PENGINAPAN_OPTIONS = [
  { id: 'bintang-1', label: 'Bintang 1: Penginapan / Losmen', stars: 1, pricePerNight: 150000 },
  { id: 'bintang-2', label: 'Bintang 2: Hotel Budget',         stars: 2, pricePerNight: 350000 },
  { id: 'bintang-3', label: 'Bintang 3: Hotel Standar',        stars: 3, pricePerNight: 350000 },
  { id: 'bintang-4', label: 'Bintang 4: Hotel Premium',        stars: 4, pricePerNight: 850000 },
  { id: 'bintang-5', label: 'Bintang 5: Hotel Mewah',          stars: 5, pricePerNight: 850000 },
];

/* ── Lokasi Wisata (dari paket) ── */
const LOKASI_META = {
  'pangandaran-citumang': { minPax: 18, pricePerPax: 600000 },
  'ujung-genteng':        { minPax: 13, pricePerPax: 1000000 },
  'pangalengan-rafting':  { minPax: 13, pricePerPax: 450000 },
  'trip-ciwidey':         { minPax: 13, pricePerPax: 450000 },
};

export const LOKASI_OPTIONS = PACKAGES.map((p) => ({
  id: p.id,
  name: p.title,
  location: p.meta.location,
  duration: p.meta.duration,
  minPax: LOKASI_META[p.id]?.minPax ?? 13,
  pricePerPax: LOKASI_META[p.id]?.pricePerPax ?? 450000,
  pricingTiers: p.pricingTiers ?? [],
}));

/* ── Paket Makan ── */
export const MAKAN_OPTIONS = [
  { id: 'makan-1', label: 'Paket Hemat: Nasi Box Sederhana', pricePerPax: 25000, description: '1x makan nasi box standar' },
  { id: 'makan-2', label: 'Paket Standar: Nasi Box + Snack', pricePerPax: 45000, description: '1x nasi box + 1x snack box' },
  { id: 'makan-3', label: 'Paket Lengkap: 2x Makan + Snack', pricePerPax: 75000, description: '2x nasi box + 1x snack' },
  { id: 'makan-4', label: 'Paket Premium: Prasmanan', pricePerPax: 100000, description: 'Prasmanan / buffet di restoran' },
  { id: 'makan-5', label: 'Paket VIP: Seafood / Special Menu', pricePerPax: 150000, description: 'Menu spesial seafood / fine dining' },
];

/* ── Kegiatan ── */
export const KEGIATAN_OPTIONS = [
  { id: 'rafting', label: 'Rafting / Arung Jeram', pricePerPax: 150000, lokasi: ['pangalengan-rafting'] },
  { id: 'fun-games', label: 'Fun Games & Team Building', pricePerPax: 35000, lokasi: ['pangandaran-citumang', 'ujung-genteng', 'pangalengan-rafting', 'trip-ciwidey'] },
  { id: 'outbound', label: 'Outbound Games', pricePerPax: 50000, lokasi: ['pangalengan-rafting', 'trip-ciwidey'] },
  { id: 'campfire', label: 'Api Unggun / Campfire Night', pricePerPax: 25000, lokasi: ['pangandaran-citumang', 'ujung-genteng'] },
];

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
