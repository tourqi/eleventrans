import { motion } from 'framer-motion';
import { Heart, Lightbulb, Shield } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const REASONS = [
  {
    icon: Heart,
    title: 'Layanan Ramah & Personal',
    description:
      'Kami bukan travel biasa. Setiap klien kami perlakukan seperti teman — komunikasi santai, respon cepat, dan selalu siap bantu kapanpun.',
    color: 'from-red-100 to-pink-50',
    iconColor: 'text-red-500',
  },
  {
    icon: Lightbulb,
    title: 'Konsep Kreatif & Fleksibel',
    description:
      'Bosan dengan trip monoton? Kami merancang konsep acara yang fresh dan bisa disesuaikan 100% dengan keinginan dan budget kamu.',
    color: 'from-amber-100 to-yellow-50',
    iconColor: 'text-amber-500',
  },
  {
    icon: Shield,
    title: 'One-Stop Solution & Aman',
    description:
      'Dari transportasi, venue, konsumsi, hingga dokumentasi — semua kami urus. Kamu tinggal datang, nikmati, dan pulang bawa kenangan.',
    color: 'from-primary-100 to-blue-50',
    iconColor: 'text-primary-600',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Kenapa Kami?"
          title="Travel Partner yang Bisa Diandalkan"
          subtitle="Sudah ratusan perusahaan, komunitas, dan keluarga mempercayakan perjalanan mereka ke Eleven Trans Holiday."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {REASONS.map((reason, idx) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`w-16 h-16 mx-auto bg-gradient-to-br ${reason.color} rounded-2xl flex items-center justify-center mb-6`}
              >
                <reason.icon className={`w-8 h-8 ${reason.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
              <p className="text-gray-600 leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
