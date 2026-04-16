import { Phone, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { buildWhatsAppLink } from '../../utils/helpers';
import { DEFAULT_WA_MESSAGE } from '../../data/constants';
import { useLanguage } from '../../contexts/LanguageContext';
import confusedWoman from '../../assets/confused-woman.webp';

export default function CTASection({
  title,
  subtitle,
  waMessage,
}) {
  const { t } = useLanguage();
  const displayTitle = title || t('cta.title');
  const displaySubtitle = subtitle || t('cta.subtitle');
  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* Rotating calm blue gradient orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30 blur-3xl animate-[spin_20s_linear_infinite] bg-[conic-gradient(from_0deg,#1e3a5f,#2563eb,#1e40af,#0f172a,#1e3a5f)]" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left — Text Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              {displayTitle}
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl mx-auto lg:mx-0">
              {displaySubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
              <Button
                variant="whatsapp"
                size="lg"
                href={buildWhatsAppLink(waMessage || DEFAULT_WA_MESSAGE)}
              >
                <Phone className="w-5 h-5" />
                {t('cta.wa')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                to="/contact"
                className="border-white/20 text-white hover:bg-white/10"
              >
                {t('cta.form')}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Right — Image */}
          <div className="hidden lg:flex justify-end">
            <div className="relative">
              {/* Radial white glow behind image */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.25)_0%,transparent_70%)] scale-125" />
              <div className="relative w-[450px] h-[450px] rounded-3xl overflow-hidden">
                <img
                  src={confusedWoman}
                  alt="Bingung mau liburan kemana?"
                  className="w-full h-full object-cover object-top drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
