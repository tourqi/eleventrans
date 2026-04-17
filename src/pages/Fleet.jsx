import { motion } from 'framer-motion';
import { Users as UsersIcon } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import CTASection from '../components/sections/CTASection';
import PageHero from '../components/sections/PageHero';
import SEO from '../components/SEO';
import { FLEET } from '../data/fleet';
import { buildWhatsAppLink } from '../utils/helpers';
import { useLanguage } from '../contexts/LanguageContext';

export default function Fleet() {
  const { t, td } = useLanguage();
  return (
    <>
      <SEO
        title={t('fleet.eyebrow')}
        description={t('seo.fleet')}
        path="/fleet"
      />
      {/* Hero */}
      <PageHero>
        <span className="text-accent-300 font-semibold text-xs uppercase tracking-wider">
          {t('fleet.eyebrow')}
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4 text-white">{t('fleet.title')}</h1>
        <p className="text-base text-white/80">
          {t('fleet.desc')}
        </p>
      </PageHero>

      {/* Fleet list */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FLEET.map((vehicle, idx) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {vehicle.popular && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="accent">{t('fleet.favorite')}</Badge>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="neutral">{td(vehicle.type)}</Badge>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">{vehicle.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1 mb-3">
                    <UsersIcon className="w-4 h-4" />
                    <span>{td(vehicle.capacity)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{td(vehicle.description)}</p>

                  {/* Facilities */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {vehicle.facilities.map((f) => (
                      <span
                        key={f}
                        className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-md"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    href={buildWhatsAppLink(
                      `Halo Eleven Trans! Saya mau sewa ${vehicle.name} (${vehicle.capacity}). Bisa info harga?`
                    )}
                    className="w-full"
                  >
                    {t('fleet.askPrice')}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={t('fleet.ctaTitle')}
        subtitle={t('fleet.ctaSub')}
      />
    </>
  );
}
