import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import Button from '../ui/Button';
import { buildWhatsAppLink } from '../../utils/helpers';
import { DEFAULT_WA_MESSAGE } from '../../data/constants';
import heroModel from '../../assets/hero-model.webp';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-black">
      {/* Hero image background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1549473889-14f410d83298?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />

      {/* Blue gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 opacity-50" />

      {/* Background pattern */}
      <div className="absolute inset-0 bg-dots-light opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              🎉 Travel with Fun
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              Bikin Liburan
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-500">
                Makin Asyik
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-blue-100 leading-relaxed max-w-xl mb-8">
              Private trip, family gathering, adventure trip & industrial visit —
              semua dirancang khusus untuk pengalaman tak terlupakan. Aman, seru,
              dan penuh cerita.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="whatsapp"
                size="lg"
                href={buildWhatsAppLink(DEFAULT_WA_MESSAGE)}
              >
                <Phone className="w-5 h-5" />
                Chat via WhatsApp
              </Button>
              <Button variant="outline" size="lg" to="/packages" className="border-white/30 text-white hover:bg-white/10">
                Lihat Paket
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-400 to-primary-400 border-2 border-white/20 flex items-center justify-center text-white text-xs font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm text-blue-200">
                <span className="text-white font-semibold">500+</span> pelanggan puas
              </div>
            </div>
          </motion.div>

          {/* Right side visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={heroModel}
                  alt="Happy travelers with Eleven Trans Holiday"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">4.9 / 5.0</div>
                    <div className="text-xs text-gray-500">200+ reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
