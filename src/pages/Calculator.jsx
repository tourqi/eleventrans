import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator as CalcIcon,
  Bus,
  Hotel,
  MapPin,
  UtensilsCrossed,
  Activity,
  CheckSquare,
  Users,
  Send,
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
  const [armada, setArmada] = useState('');
  const [penginapan, setPenginapan] = useState('');
  const [jumlahMalam, setJumlahMalam] = useState(1);
  const [lokasi, setLokasi] = useState('');
  const [makan, setMakan] = useState('');
  const [kegiatan, setKegiatan] = useState([]);
  const [jumlahOrang, setJumlahOrang] = useState(1);
  const [additional, setAdditional] = useState([]);

  /* ── derived ── */
  const selectedArmada = ARMADA_OPTIONS.find((a) => a.id === armada);
  const selectedPenginapan = PENGINAPAN_OPTIONS.find((p) => p.id === penginapan);
  const selectedLokasi = LOKASI_OPTIONS.find((l) => l.id === lokasi);
  const selectedMakan = MAKAN_OPTIONS.find((m) => m.id === makan);

  const isBus = selectedArmada?.isBus ?? false;

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
      items.push({ label: `Armada — ${selectedArmada.name}`, amount: selectedArmada.price });
    }
    if (selectedPenginapan && malam > 0) {
      const hotelTotal = selectedPenginapan.pricePerNight * malam;
      items.push({
        label: `Penginapan — ${selectedPenginapan.label} (${malam} malam)`,
        amount: hotelTotal,
      });
    }
    if (selectedLokasi) {
      items.push({
        label: `Lokasi — ${selectedLokasi.name}`,
        amount: selectedLokasi.pricePerPax * pax,
      });
    }
    if (selectedMakan) {
      items.push({
        label: `Makan — ${selectedMakan.label}`,
        amount: selectedMakan.pricePerPax * pax,
      });
    }

    kegiatan.forEach((kid) => {
      const k = KEGIATAN_OPTIONS.find((x) => x.id === kid);
      if (k) items.push({ label: `Kegiatan — ${k.label}`, amount: k.pricePerPax * pax });
    });

    additional.forEach((aid) => {
      const opt = ADDITIONAL_OPTIONS.find((x) => x.id === aid);
      if (!opt) return;
      if (opt.busOnly && !isBus) return;
      const amount = opt.perPax ? opt.price * pax : opt.price;
      items.push({ label: opt.label, amount });
    });

    const total = items.reduce((sum, i) => sum + i.amount, 0);
    const perPax = pax > 0 ? Math.ceil(total / pax) : 0;
    return { items, total, perPax, pax };
  }, [
    selectedArmada,
    selectedPenginapan,
    jumlahMalam,
    selectedLokasi,
    selectedMakan,
    kegiatan,
    additional,
    jumlahOrang,
    isBus,
  ]);

  /* ── toggle helpers ── */
  const toggleKegiatan = (id) =>
    setKegiatan((prev) =>
      prev.includes(id) ? prev.filter((k) => k !== id) : [...prev, id],
    );

  const toggleAdditional = (id) =>
    setAdditional((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );

  /* ── WhatsApp summary ── */
  const waMessage = useMemo(() => {
    let msg = `Halo Eleven Trans! 👋\nSaya ingin estimasi biaya:\n\n`;
    if (selectedArmada) msg += `🚐 Armada: ${selectedArmada.name}\n`;
    if (selectedPenginapan) msg += `🏨 Penginapan: ${selectedPenginapan.label} (${jumlahMalam} malam)\n`;
    if (selectedLokasi) msg += `📍 Lokasi: ${selectedLokasi.name}\n`;
    if (selectedMakan) msg += `🍽️ Makan: ${selectedMakan.label}\n`;
    if (kegiatan.length) {
      const names = kegiatan.map((id) => KEGIATAN_OPTIONS.find((k) => k.id === id)?.label).filter(Boolean);
      msg += `🎯 Kegiatan: ${names.join(', ')}\n`;
    }
    msg += `👥 Jumlah: ${jumlahOrang} orang\n`;
    msg += `\n💰 Estimasi Total: ${formatRupiah(breakdown.total)}\n`;
    msg += `💰 Per Orang: ${formatRupiah(breakdown.perPax)}\n`;
    msg += `\nMohon info lebih lanjut. Terima kasih!`;
    return msg;
  }, [selectedArmada, selectedPenginapan, jumlahMalam, selectedLokasi, selectedMakan, kegiatan, jumlahOrang, breakdown]);

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
              {/* Jumlah Orang */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
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
                  onChange={(e) => setJumlahOrang(Math.max(1, parseInt(e.target.value) || 1))}
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
                <label className={label}>{t('calc.armadaLabel')}</label>
                <select value={armada} onChange={(e) => setArmada(e.target.value)} className={select}>
                  <option value="">{t('calc.armadaPlaceholder')}</option>
                  {ARMADA_OPTIONS.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.capacity}) — {formatRupiah(a.price)}/hari
                    </option>
                  ))}
                </select>
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
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={label}>{t('calc.hotelLabel')}</label>
                    <select
                      value={penginapan}
                      onChange={(e) => setPenginapan(e.target.value)}
                      className={select}
                    >
                      <option value="">{t('calc.hotelPlaceholder')}</option>
                      {PENGINAPAN_OPTIONS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.label} — {formatRupiah(p.pricePerNight)}/malam
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
                      onChange={(e) => setJumlahMalam(Math.max(0, parseInt(e.target.value) || 0))}
                      className={select}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Lokasi Wisata */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
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
                      {l.name} — {l.location} ({l.duration})
                    </option>
                  ))}
                </select>
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
                <label className={label}>{t('calc.makanLabel')}</label>
                <select value={makan} onChange={(e) => setMakan(e.target.value)} className={select}>
                  <option value="">{t('calc.makanPlaceholder')}</option>
                  {MAKAN_OPTIONS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label} — {formatRupiah(m.pricePerPax)}/orang
                    </option>
                  ))}
                </select>
                {selectedMakan && (
                  <p className="text-xs text-gray-500 mt-2">{selectedMakan.description}</p>
                )}
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
                      <span className="text-xs text-gray-500">{formatRupiah(k.pricePerPax)}/org</span>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Variabel Tambahan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className={card}
              >
                <div className="flex items-center gap-3 mb-4">
                  <CheckSquare className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-gray-900">{t('calc.additionalTitle')}</h3>
                </div>
                <div className="space-y-3">
                  {ADDITIONAL_OPTIONS.map((opt) => {
                    const disabled = opt.busOnly && !isBus;
                    return (
                      <label
                        key={opt.id}
                        className={`flex items-start gap-3 p-3 rounded-lg border transition ${
                          disabled
                            ? 'opacity-40 cursor-not-allowed border-gray-100'
                            : additional.includes(opt.id)
                            ? 'border-primary-500 bg-primary-50 cursor-pointer'
                            : 'border-gray-200 hover:border-gray-300 cursor-pointer'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={additional.includes(opt.id)}
                          onChange={() => !disabled && toggleAdditional(opt.id)}
                          disabled={disabled}
                          className="accent-primary-600 w-4 h-4 mt-0.5"
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-gray-800">{opt.label}</span>
                          {opt.description && (
                            <p className="text-xs text-gray-500 mt-0.5">{opt.description}</p>
                          )}
                          {opt.busOnly && (
                            <p className="text-xs text-amber-600 mt-0.5">{t('calc.busOnly')}</p>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {formatRupiah(opt.price)}
                          {opt.perPax ? '/org' : '/trip'}
                        </span>
                      </label>
                    );
                  })}
                </div>
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
                      <ul className="space-y-3 mb-6">
                        {breakdown.items.map((item, idx) => (
                          <li key={idx} className="flex justify-between text-sm">
                            <span className="text-gray-600">{item.label}</span>
                            <span className="font-medium text-gray-900">
                              {formatRupiah(item.amount)}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="border-t border-gray-200 pt-4 space-y-2">
                        <div className="flex justify-between text-base font-bold">
                          <span className="text-gray-800">{t('calc.total')}</span>
                          <span className="text-primary-600">{formatRupiah(breakdown.total)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">
                            {t('calc.perPax')} ({breakdown.pax} pax)
                          </span>
                          <span className="font-semibold text-accent-600">
                            {formatRupiah(breakdown.perPax)}
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  <p className="text-[11px] text-gray-400 mt-4 leading-relaxed">
                    {t('calc.note')}
                  </p>
                </motion.div>

                {/* CTA WhatsApp */}
                {breakdown.items.length > 0 && (
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
