import { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator as CalcIcon,
  Bus,
  Hotel,
  MapPin,
  UtensilsCrossed,
  Activity,
  Users,
  Send,
  CalendarDays,
  Info,
} from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/sections/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import {
  ARMADA_OPTIONS,
  PENGINAPAN_OPTIONS,
  LOKASI_OPTIONS,
  MAKAN_OPTIONS,
  KEGIATAN_OPTIONS,
  ADDITIONAL_OPTIONS,
  ASURANSI,
  TOUR_GUIDE,
} from '../data/calculator';
import { formatRupiah, buildWhatsAppLink } from '../utils/helpers';
import { useLanguage } from '../contexts/LanguageContext';

/* ── tiny helpers ── */
const card = 'bg-white rounded-2xl shadow-md p-6 md:p-8';
const label = 'block text-sm font-semibold text-gray-700 mb-2';
const select =
  'w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition';

export default function CalculatorPage() {
  const { t, td } = useLanguage();
  /* ── state ── */
  const [tanggalKegiatan, setTanggalKegiatan] = useState('');
  const [tanggalAkhir, setTanggalAkhir] = useState('');
  const [armada, setArmada] = useState('');
  const [jumlahArmada, setJumlahArmada] = useState(1);
  const [penginapan, setPenginapan] = useState('');
  const [jumlahMalam, setJumlahMalam] = useState(1);
  const [jumlahKamar, setJumlahKamar] = useState(1);
  const [lokasi, setLokasi] = useState('');
  const [makanSelections, setMakanSelections] = useState({});
  const [kegiatan, setKegiatan] = useState([]);
  const [jumlahOrang, setJumlahOrang] = useState(1);
  const [additional, setAdditional] = useState([]);
  const [tourGuide, setTourGuide] = useState(false);
  const [calculated, setCalculated] = useState(false);

  /* ── derived ── */
  const selectedArmada = ARMADA_OPTIONS.find((a) => a.id === armada);
  const selectedPenginapan = PENGINAPAN_OPTIONS.find((p) => p.id === penginapan);
  const selectedLokasi = LOKASI_OPTIONS.find((l) => l.id === lokasi);

  const isBus = selectedArmada?.isBus ?? false;

  const MAX_ORANG_PER_KAMAR = 4;
  const minKamarDibutuhkan = Math.ceil(jumlahOrang / MAX_ORANG_PER_KAMAR);
  const kamarKurang = penginapan && jumlahOrang > 1 && jumlahKamar < minKamarDibutuhkan;

  const kapasitasArmada = selectedArmada ? selectedArmada.passengerSeat * jumlahArmada : 0;
  const minArmadaDibutuhkan = selectedArmada ? Math.ceil(jumlahOrang / selectedArmada.passengerSeat) : 1;
  const armadaKurang = selectedArmada && jumlahOrang > kapasitasArmada;

  // Filter kegiatan by selected lokasi
  const availableKegiatan = useMemo(
    () =>
      lokasi
        ? KEGIATAN_OPTIONS.filter((k) => k.lokasi.includes(lokasi))
        : KEGIATAN_OPTIONS,
    [lokasi],
  );

  /* ── calculation ── */
  const breakdown = useMemo(() => {
    const pax = Math.max(jumlahOrang, 1);
    const malam = Math.max(jumlahMalam, 0);
    const items = [];

    if (selectedArmada) {
      const unit = Math.max(jumlahArmada, 1);
      const hari = selectedLokasi?.armadaDays ?? 1;
      const zone = selectedLokasi?.zone ?? 'luar-kota';
      const hargaPerHari = zone === 'dalam-kota' ? selectedArmada.priceDalamKota : selectedArmada.priceLuarKota;
      items.push({
        label: `Armada: ${selectedArmada.name} (${unit} unit × ${hari} hari)`,
        amount: hargaPerHari * unit * hari,
      });
    }
    if (selectedPenginapan && malam > 0) {
      const kamar = Math.max(jumlahKamar, 1);
      const hotelTotal = selectedPenginapan.pricePerNight * malam * kamar;
      items.push({
        label: `Penginapan: ${selectedPenginapan.label} (${malam} malam, ${kamar} kamar)`,
        amount: hotelTotal,
      });
    }
    if (selectedLokasi) {
      items.push({
        label: `Lokasi: ${selectedLokasi.name}`,
        amount: selectedLokasi.pricePerPax * pax,
      });
    }
    MAKAN_OPTIONS.forEach((m) => {
      const freq = makanSelections[m.id];
      if (!freq) return;
      items.push({
        label: `Makan: ${m.label} (${freq}x)`,
        amount: m.pricePerPax * pax * freq,
      });
    });

    kegiatan.forEach((kid) => {
      const k = KEGIATAN_OPTIONS.find((x) => x.id === kid);
      if (k) items.push({ label: `Kegiatan: ${k.label}`, amount: k.pricePerPax * pax });
    });

    additional.forEach((aid) => {
      const opt = ADDITIONAL_OPTIONS.find((x) => x.id === aid);
      if (!opt) return;
      if (opt.busOnly && !isBus) return;
      const amount = opt.perPax ? opt.price * pax : opt.price;
      items.push({ label: opt.label, amount });
    });

    items.push({ label: `${ASURANSI.label} (wajib)`, amount: ASURANSI.pricePerPax * pax });

    if (tourGuide) {
      items.push({ label: TOUR_GUIDE.label, amount: TOUR_GUIDE.price });
    }

    const subtotal = items.reduce((sum, i) => sum + i.amount, 0);
    const MARKUP_RATE = 0.3;
    const ROUND_TO = 1000;
    const total = Math.round((subtotal * (1 + MARKUP_RATE)) / ROUND_TO) * ROUND_TO;
    const perPax = pax > 0 ? Math.ceil(total / pax) : 0;
    return { items, total, perPax, pax };
  }, [
    selectedArmada,
    selectedPenginapan,
    jumlahMalam,
    jumlahKamar,
    selectedLokasi,
    makanSelections,
    kegiatan,
    additional,
    tourGuide,
    jumlahOrang,
    jumlahArmada,
    isBus,
  ]);

  // Setiap kali pilihan berubah, sembunyikan estimasi sampai tombol "Hitung" ditekan lagi.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setCalculated(false);
  }, [breakdown]);

  /* ── toggle helpers ── */
  const toggleKegiatan = (id) =>
    setKegiatan((prev) =>
      prev.includes(id) ? prev.filter((k) => k !== id) : [...prev, id],
    );

  const toggleAdditional = (id) =>
    setAdditional((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );

  const toggleMakan = (id) =>
    setMakanSelections((prev) => {
      if (prev[id]) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: 1 };
    });

  const setMakanFreq = (id, freq) =>
    setMakanSelections((prev) => ({ ...prev, [id]: freq }));

  /* ── WhatsApp summary ── */
  const waMessage = useMemo(() => {
    let msg = `Halo Eleven Trans Holiday! 👋\nSaya ingin estimasi biaya:\n\n`;
    if (tanggalKegiatan) {
      const tglMulai = new Date(tanggalKegiatan).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
      if (tanggalAkhir) {
        const tglAkhir = new Date(tanggalAkhir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        msg += `📅 Tanggal Rencana: ${tglMulai} s/d ${tglAkhir}\n`;
      } else {
        msg += `📅 Tanggal Rencana: ${tglMulai}\n`;
      }
    }
    if (selectedArmada) msg += `🚐 Armada: ${selectedArmada.name} (${jumlahArmada} unit)\n`;
    if (selectedPenginapan) msg += `🏨 Penginapan: ${selectedPenginapan.label} (${jumlahMalam} malam, ${jumlahKamar} kamar)\n`;
    if (selectedLokasi) msg += `📍 Lokasi: ${selectedLokasi.name}\n`;
    const makanNames = MAKAN_OPTIONS.filter((m) => makanSelections[m.id]).map(
      (m) => `${m.label} ${makanSelections[m.id]}x`,
    );
    if (makanNames.length) msg += `🍽️ Makan: ${makanNames.join(', ')}\n`;
    if (kegiatan.length) {
      const names = kegiatan.map((id) => KEGIATAN_OPTIONS.find((k) => k.id === id)?.label).filter(Boolean);
      msg += `🎯 Kegiatan: ${names.join(', ')}\n`;
    }
    msg += `🛡️ Asuransi Perjalanan: wajib\n`;
    if (tourGuide) msg += `🧭 Tour Guide: 1 orang\n`;
    msg += `👥 Jumlah: ${jumlahOrang} orang\n`;
    msg += `\n💰 Estimasi Total: ${formatRupiah(breakdown.total)}\n`;
    msg += `💰 Per Orang: ${formatRupiah(breakdown.perPax)}\n`;
    msg += `\nMohon info lebih lanjut. Terima kasih!`;
    return msg;
  }, [selectedArmada, selectedPenginapan, jumlahMalam, jumlahKamar, selectedLokasi, makanSelections, kegiatan, tourGuide, jumlahOrang, breakdown, tanggalKegiatan, tanggalAkhir]);

  /* ── render ── */
  return (
    <>
      <SEO
        title={t('calc.eyebrow')}
        description={t('seo.calculator')}
        path="/calculator"
      />

      <PageHero>
        <span className="text-accent-300 font-semibold text-xs uppercase tracking-wider">
          {t('calc.eyebrow')}
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4 text-white">
          {t('calc.title')}
        </h1>
        <p className="text-base text-white/80">
          {t('calc.desc')}
        </p>
      </PageHero>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* ────────── LEFT — Form ────────── */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tanggal Rencana Kegiatan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={card}
              >
                <div className="flex items-center gap-3 mb-4">
                  <CalendarDays className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-gray-900">{t('calc.dateTitle')}</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={label}>{t('calc.dateLabel')}</label>
                    <input
                      type="date"
                      value={tanggalKegiatan}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => {
                        setTanggalKegiatan(e.target.value);
                        if (tanggalAkhir && e.target.value > tanggalAkhir) setTanggalAkhir('');
                      }}
                      className={select}
                    />
                  </div>
                  <div>
                    <label className={label}>{t('calc.dateEndLabel')}</label>
                    <input
                      type="date"
                      value={tanggalAkhir}
                      min={tanggalKegiatan || new Date().toISOString().split('T')[0]}
                      onChange={(e) => setTanggalAkhir(e.target.value)}
                      className={select}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Lokasi Wisata */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.03 }}
                className={card}
              >
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-gray-900">{t('calc.lokasiTitle')}</h3>
                </div>
                <label className={label}>{t('calc.lokasiLabel')}</label>
                <select
                  value={lokasi}
                  onChange={(e) => {
                    setLokasi(e.target.value);
                    setKegiatan([]); // reset kegiatan saat ganti lokasi
                  }}
                  className={select}
                >
                  <option value="">{t('calc.lokasiPlaceholder')}</option>
                  {LOKASI_OPTIONS.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name}, {l.location} ({l.duration})
                    </option>
                  ))}
                </select>
                <div className="mt-3 flex gap-2 p-3 rounded-lg bg-green-50 border border-green-100">
                  <Info className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-green-700 leading-relaxed">
                    Tiket masuk wisata <strong>sudah termasuk</strong> dalam paket wisata.
                  </p>
                </div>
              </motion.div>

              {/* Jumlah Orang */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.06 }}
                className={card}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-gray-900">{t('calc.paxTitle')}</h3>
                </div>
                <label className={label}>
                  {t('calc.paxLabel')}
                </label>
                <input
                  type="number"
                  min={1}
                  max={200}
                  value={jumlahOrang}
                  onChange={(e) => setJumlahOrang(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                  onBlur={(e) => setJumlahOrang(Math.max(1, parseInt(e.target.value) || 1))}
                  className={select}
                />
              </motion.div>

              {/* Armada */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className={card}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Bus className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-gray-900">{t('calc.armadaTitle')}</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className={label}>{t('calc.armadaLabel')}</label>
                    <select value={armada} onChange={(e) => { setArmada(e.target.value); setJumlahArmada(1); }} className={select}>
                      <option value="">{t('calc.armadaPlaceholder')}</option>
                      {ARMADA_OPTIONS.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name} ({a.capacity})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={label}>Jumlah Unit Armada</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={jumlahArmada}
                      onChange={(e) => setJumlahArmada(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                      onBlur={(e) => setJumlahArmada(Math.max(1, parseInt(e.target.value) || 1))}
                      className={`${select} ${armadaKurang ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : ''}`}
                    />
                    {armadaKurang ? (
                      <p className="text-xs text-red-500 mt-1.5 font-medium">
                        ⚠ Kapasitas penuh, butuh minimal {minArmadaDibutuhkan} unit untuk {jumlahOrang} orang.
                      </p>
                    ) : selectedArmada ? (
                      <p className="text-xs text-gray-400 mt-1.5">
                        Kapasitas: {kapasitasArmada} penumpang ({jumlahArmada} × {selectedArmada.passengerSeat} seat)
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex gap-2 p-3 rounded-lg bg-green-50 border border-green-100">
                    <Info className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-green-700 mb-1">Sudah termasuk:</p>
                      <ul className="text-xs text-green-700 space-y-0.5">
                        <li>✓ Unit</li>
                        <li>✓ Supir</li>
                        <li>✓ BBM</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex gap-2 p-3 rounded-lg bg-amber-50 border border-amber-100">
                    <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-amber-700 mb-1">Belum termasuk:</p>
                      <ul className="text-xs text-amber-700 space-y-0.5">
                        <li>✗ Tol</li>
                        <li>✗ Parkir</li>
                        <li>✗ Makan supir & kondektur</li>
                        <li>✗ Tips supir & kondektur</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Penginapan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={card}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Hotel className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-gray-900">{t('calc.hotelTitle')}</h3>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className={label}>{t('calc.hotelLabel')}</label>
                    <select
                      value={penginapan}
                      onChange={(e) => setPenginapan(e.target.value)}
                      className={select}
                    >
                      <option value="">{t('calc.hotelPlaceholder')}</option>
                      {PENGINAPAN_OPTIONS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={label}>{t('calc.nightLabel')}</label>
                    <input
                      type="number"
                      min={0}
                      max={14}
                      value={jumlahMalam}
                      onChange={(e) => setJumlahMalam(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value) || 0))}
                      onBlur={(e) => setJumlahMalam(Math.max(0, parseInt(e.target.value) || 0))}
                      className={select}
                    />
                  </div>
                  <div>
                    <label className={label}>{t('calc.roomLabel')}</label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={jumlahKamar}
                      onChange={(e) => setJumlahKamar(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                      onBlur={(e) => setJumlahKamar(Math.max(1, parseInt(e.target.value) || 1))}
                      className={`${select} ${kamarKurang ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : ''}`}
                    />
                    {kamarKurang ? (
                      <p className="text-xs text-red-500 mt-1.5 font-medium">
                        ⚠ Maks. 4 orang/kamar, butuh minimal {minKamarDibutuhkan} kamar untuk {jumlahOrang} orang.
                      </p>
                    ) : (
                      <p className="text-xs text-gray-400 mt-1.5">{t('calc.roomHint')}</p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Makan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className={card}
              >
                <div className="flex items-center gap-3 mb-4">
                  <UtensilsCrossed className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-gray-900">{t('calc.makanTitle')}</h3>
                </div>
                <div className="space-y-3">
                  {MAKAN_OPTIONS.map((m) => {
                    const freq = makanSelections[m.id];
                    const checked = Boolean(freq);
                    return (
                      <div
                        key={m.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border transition ${
                          checked ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                        }`}
                      >
                        <label className="flex items-center gap-3 flex-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleMakan(m.id)}
                            className="accent-primary-600 w-4 h-4"
                          />
                          <span className="text-sm font-medium text-gray-800">{m.label}</span>
                        </label>
                        <select
                          value={freq || 1}
                          disabled={!checked}
                          onChange={(e) => setMakanFreq(m.id, parseInt(e.target.value))}
                          className={`${select} w-32 disabled:opacity-50`}
                        >
                          {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>
                              {n}x
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Kegiatan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className={card}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-gray-900">{t('calc.kegiatanTitle')}</h3>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  {lokasi
                    ? t('calc.kegiatanHint')
                    : t('calc.kegiatanHintEmpty')}
                </p>
                <div className="space-y-3">
                  {availableKegiatan.map((k) => (
                    <label
                      key={k.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                        kegiatan.includes(k.id)
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={kegiatan.includes(k.id)}
                        onChange={() => toggleKegiatan(k.id)}
                        className="accent-primary-600 w-4 h-4"
                      />
                      <span className="flex-1 text-sm font-medium text-gray-800">{k.label}</span>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Asuransi Perjalanan (wajib) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.28 }}
                className={card}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Info className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-gray-900">Asuransi Perjalanan</h3>
                </div>
                <label className="flex items-center gap-3 p-3 rounded-lg border border-primary-500 bg-primary-50 cursor-not-allowed">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="accent-primary-600 w-4 h-4"
                  />
                  <span className="flex-1 text-sm font-medium text-gray-800">{ASURANSI.label}</span>
                </label>
                <p className="text-xs text-gray-500 mt-2">{ASURANSI.description}</p>
              </motion.div>

              {/* Tour Guide (opsional) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className={card}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-gray-900">Tour Guide</h3>
                </div>
                <label
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                    tourGuide ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={tourGuide}
                    onChange={() => setTourGuide((v) => !v)}
                    className="accent-primary-600 w-4 h-4"
                  />
                  <span className="flex-1 text-sm font-medium text-gray-800">{TOUR_GUIDE.label}</span>
                </label>
                <p className="text-xs text-gray-500 mt-2">{TOUR_GUIDE.description}</p>
              </motion.div>

            </div>

            {/* ────────── RIGHT — Summary ────────── */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className={`${card} border-2 border-primary-100`}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <CalcIcon className="w-5 h-5 text-primary-600" />
                    <h3 className="text-lg font-bold text-gray-900">{t('calc.summaryTitle')}</h3>
                  </div>

                  {breakdown.items.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-8">
                      {t('calc.summaryEmpty')}
                    </p>
                  ) : (
                    <>
                      <ul className="space-y-2 mb-5">
                        {breakdown.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
                            {item.label}
                          </li>
                        ))}
                      </ul>

                      {calculated ? (
                        <div className="space-y-3 border-t border-gray-200 pt-4">
                          <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-primary-50 border border-primary-100">
                            <span className="text-sm font-semibold text-gray-700">{t('calc.total')}</span>
                            <span className="text-base font-bold text-primary-600">{formatRupiah(breakdown.total)}</span>
                          </div>
                          <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-accent-50 border border-accent-100">
                            <span className="text-sm font-semibold text-gray-700">
                              {t('calc.perPax')} <span className="text-gray-400 font-normal">({breakdown.pax} pax)</span>
                            </span>
                            <span className="text-base font-bold text-accent-600">{formatRupiah(breakdown.perPax)}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="border-t border-gray-200 pt-4">
                          <Button
                            variant="primary"
                            size="lg"
                            onClick={() => setCalculated(true)}
                            className="w-full justify-center"
                          >
                            Klik untuk Hitung
                          </Button>
                        </div>
                      )}
                    </>
                  )}

                  <div className="mt-4 space-y-1.5">
                    <div className="flex gap-1.5 items-start">
                      <Info className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-green-600 leading-relaxed">
                        Harga sudah termasuk asuransi perjalanan & makan tour leader.
                      </p>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      {t('calc.note')}
                    </p>
                  </div>
                </motion.div>

                {/* CTA WhatsApp */}
                {breakdown.items.length > 0 && calculated && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <Button
                      variant="whatsapp"
                      size="lg"
                      href={buildWhatsAppLink(waMessage)}
                      className="w-full justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      {t('calc.sendWA')}
                    </Button>
                    <p className="text-xs text-gray-400 text-center mt-2">
                      {t('calc.sendWANote')}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
