import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const FAQS = [
  {
    q: 'Berapa harga paket trip di Eleven Trans Holiday?',
    a: 'Harga bervariasi tergantung tujuan, jumlah peserta, dan fasilitas yang dipilih. Mulai dari Rp 150.000/orang untuk day trip. Hubungi kami via WhatsApp untuk penawaran terbaik!',
  },
  {
    q: 'Apakah bisa request custom trip sesuai keinginan?',
    a: 'Tentu! Kami sangat fleksibel. Kamu bisa tentukan destinasi, jadwal, dan aktivitas sesuai kebutuhan. Tim kami akan bantu susun itinerary-nya.',
  },
  {
    q: 'Kendaraan apa saja yang tersedia?',
    a: 'Kami punya armada lengkap: Toyota Avanza (4-6 orang), HiAce Premio (12-15 orang), Elf Long (17-19 orang), Medium Bus (27-31 orang), dan Big Bus (45-50 orang). Semua terawat dan ber-AC.',
  },
  {
    q: 'Apakah ada asuransi perjalanan?',
    a: 'Ya, semua peserta trip kami dilindungi asuransi perjalanan. Keselamatan dan kenyamanan pelanggan adalah prioritas utama kami.',
  },
  {
    q: 'Berapa minimal peserta untuk booking?',
    a: 'Tidak ada minimal! Untuk private trip bisa mulai dari 2 orang. Untuk gathering dan adventure trip, biasanya lebih seru kalau 10 orang ke atas.',
  },
  {
    q: 'Bagaimana cara booking dan pembayaran?',
    a: 'Cukup hubungi kami via WhatsApp, diskusikan kebutuhan trip, lalu kami kirimkan invoice. Pembayaran via transfer bank dengan DP 50% untuk konfirmasi booking.',
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-1 text-left group"
      >
        <span className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors pr-4">
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 px-1 text-gray-500 leading-relaxed text-sm">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="FAQ"
          title="Pertanyaan yang Sering Ditanyakan"
          subtitle="Belum nemu jawabannya? Chat kami langsung via WhatsApp!"
        />
        <div className="mt-12 bg-gray-50 rounded-2xl p-6 md:p-8">
          {FAQS.map((faq, idx) => (
            <FAQItem
              key={idx}
              faq={faq}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
