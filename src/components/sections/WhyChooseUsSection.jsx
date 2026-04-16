import { motion } from 'framer-motion';
import { Heart, Lightbulb, Shield } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { useLanguage } from '../../contexts/LanguageContext';

const REASON_KEYS = [
  { icon: Heart, titleKey: 'why.r1.title', descKey: 'why.r1.desc', color: 'from-red-100 to-pink-50', iconColor: 'text-red-500' },
  { icon: Lightbulb, titleKey: 'why.r2.title', descKey: 'why.r2.desc', color: 'from-amber-100 to-yellow-50', iconColor: 'text-amber-500' },
  { icon: Shield, titleKey: 'why.r3.title', descKey: 'why.r3.desc', color: 'from-primary-100 to-blue-50', iconColor: 'text-primary-600' },
];

export default function WhyChooseUsSection() {
  const { t } = useLanguage();
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t('why.eyebrow')}
          title={t('why.title')}
          subtitle={t('why.subtitle')}
        />

        <div className="grid md:grid-cols-3 gap-8">
          {REASON_KEYS.map((reason, idx) => (
            <motion.div
              key={reason.titleKey}
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t(reason.titleKey)}</h3>
              <p className="text-gray-600 leading-relaxed">{t(reason.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
