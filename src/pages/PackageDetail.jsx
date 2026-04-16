import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Phone,
  ChevronLeft,
  Clock,
  Users,
  MapPin,
  Shield,
  CheckCircle,
  UtensilsCrossed,
  Zap,
  Tag,
} from 'lucide-react';
import { getPackageBySlug, PACKAGES } from '../data/packages';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SectionHeading from '../components/ui/SectionHeading';
import Timeline from '../components/sections/Timeline';
import PackageCard from '../components/sections/PackageCard';
import CTASection from '../components/sections/CTASection';
import PageHero from '../components/sections/PageHero';
import SEO from '../components/SEO';
import { buildWhatsAppLink, formatRupiah } from '../utils/helpers';
import { useLanguage } from '../contexts/LanguageContext';

/* Packages list */
function PackagesList() {
  const { t } = useLanguage();
  return (
    <>
      <SEO
        title={t('pkg.eyebrow')}
        description="Pilih paket wisata terbaik dari Eleven Trans Holiday."
        path="/packages"
      />
      <PageHero>
        <span className="text-accent-300 font-semibold text-xs uppercase tracking-wider">
          {t('pkg.eyebrow')}
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4 text-white">{t('pkg.title')}</h1>
        <p className="text-base text-white/80">
          {t('pkg.desc')}
        </p>
      </PageHero>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PACKAGES.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={t('pkg.noMatchTitle')}
        subtitle={t('pkg.noMatchSub')}
      />
    </>
  );
}

/* Package detail — storytelling page */
function PackageDetailPage() {
  const { slug } = useParams();
  const pkg = getPackageBySlug(slug);
  const { t, td } = useLanguage();

  if (!pkg) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('pkg.notFound')}</h1>
        <Link to="/packages" className="text-primary-600 hover:underline">
          {t('pkg.backLink')}
        </Link>
      </div>
    );
  }

  const otherPackages = PACKAGES.filter((p) => p.id !== pkg.id).slice(0, 2);

  return (
    <>
      <SEO
        title={td(pkg.title)}
        description={td(pkg.excerpt)}
        image={pkg.images[0]}
        path={`/packages/${pkg.slug}`}
      />
      {/* Hero */}
      <PageHero backgroundImage={pkg.images[0]}>
        <Link
          to="/packages"
          className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> {t('pkg.allPackages')}
        </Link>

        <Badge variant="accent" className="mb-3">
          {td(pkg.tagline)}
        </Badge>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight text-white">
          {td(pkg.title)}
        </h1>
        <p className="text-base text-white/80 leading-relaxed mb-6">{td(pkg.excerpt)}</p>

        {/* Quick facts */}
        <div className="flex flex-wrap gap-5 mb-6 text-sm">
          <div className="flex items-center gap-2 text-white/70">
            <Clock className="w-5 h-5 text-accent-300" />
            <span>{td(pkg.meta.duration)}</span>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <Users className="w-5 h-5 text-accent-300" />
            <span>{td(pkg.meta.groupSize)}</span>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <MapPin className="w-5 h-5 text-accent-300" />
            <span>{pkg.meta.location}</span>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <Shield className="w-5 h-5 text-accent-300" />
            <span>{td(pkg.meta.difficulty)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="whatsapp"
            size="lg"
            href={buildWhatsAppLink(pkg.ctaPrefill)}
          >
            <Phone className="w-5 h-5" />
            {t('pkg.bookNow')}
          </Button>
          {pkg.priceFrom && (
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-5 py-3">
              <span className="text-sm text-white/60">{t('pkg.startFrom')}</span>
              <span className="text-xl font-bold text-accent-300">
                {formatRupiah(pkg.priceFrom)}
              </span>
              <span className="text-sm text-white/60">{pkg.priceUnit}</span>
            </div>
          )}
        </div>
      </PageHero>

      {/* Story / Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t('pkg.storyEyebrow')}
            title={t('pkg.storyTitle')}
            center={false}
          />
          <div className="space-y-5 text-gray-700 leading-relaxed text-lg">
            {pkg.overview.map((para, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {td(para)}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* Image gallery strip */}
      {pkg.images.length > 1 && (
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
              {pkg.images.map((img, idx) => (
                <div
                  key={idx}
                  className="shrink-0 w-72 h-48 rounded-xl overflow-hidden snap-center"
                >
                  <img
                    src={img}
                    alt={`${pkg.title} - ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Itinerary */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t('pkg.itineraryEyebrow')}
            title={t('pkg.itineraryTitle')}
            subtitle={t('pkg.itinerarySub')}
            center={false}
          />
          <Timeline steps={pkg.itinerary} />
        </div>
      </section>

      {/* Activities + Menu side by side */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-accent-500" />
                <h3 className="text-xl font-bold text-gray-900">{t('pkg.activitiesTitle')}</h3>
              </div>
              <ul className="space-y-3">
                {pkg.activities.map((act) => (
                  <li key={act} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-500 shrink-0" />
                    <span className="text-gray-700">{td(act)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {pkg.menu.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex items-center gap-3 mb-6">
                  <UtensilsCrossed className="w-6 h-6 text-accent-500" />
                  <h3 className="text-xl font-bold text-gray-900">{t('pkg.menuTitle')}</h3>
                </div>
                <ul className="space-y-3">
                  {pkg.menu.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="text-accent-400">🍽</span>
                      <span className="text-gray-700">{td(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Highlights / What's included */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t('pkg.highlightsEyebrow')}
            title={t('pkg.highlightsTitle')}
            center={false}
          />
          <div className="grid sm:grid-cols-2 gap-4">
            {pkg.highlights.map((h) => (
              <div
                key={h}
                className="flex items-start gap-3 bg-primary-50 rounded-xl p-4"
              >
                <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
                <span className="text-gray-800 font-medium">{td(h)}</span>
              </div>
            ))}
          </div>
          {pkg.priceNote && (
            <p className="mt-6 text-sm text-gray-500 italic">* {td(pkg.priceNote)}</p>
          )}
        </div>
      </section>

      {/* Pricing Tiers Table (if available) */}
      {pkg.pricingTiers && pkg.pricingTiers.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={t('pkg.pricingEyebrow')}
              title={t('pkg.pricingTitle')}
              subtitle={t('pkg.pricingSub')}
              center={false}
            />
            <div className="overflow-x-auto rounded-2xl shadow-md">
              <table className="w-full text-sm text-left">
                <thead className="bg-primary-600 text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">{t('pkg.thTier')}</th>
                    <th className="px-4 py-3 font-semibold">{t('pkg.thHotel')}</th>
                    <th className="px-4 py-3 font-semibold">{t('pkg.thVehicle')}</th>
                    <th className="px-4 py-3 font-semibold text-right">{t('pkg.thPrice')}</th>
                    <th className="px-4 py-3 font-semibold text-center">{t('pkg.thMinPax')}</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {pkg.pricingTiers.map((tier, idx) => (
                    <tr key={idx} className="hover:bg-primary-50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-gray-900">
                          <Tag className="w-4 h-4 text-accent-500" />
                          {tier.tier}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{tier.hotel}</td>
                      <td className="px-4 py-3 text-gray-700">{tier.vehicle}</td>
                      <td className="px-4 py-3 text-right font-bold text-accent-600">
                        {formatRupiah(tier.price)}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600">{tier.minPax} {t('pkg.orang')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-500 italic">
              {t('pkg.pricingNote')}
            </p>
          </div>
        </section>
      )}

      {/* Other packages */}
      {otherPackages.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow={t('pkg.otherEyebrow')} title={t('pkg.otherTitle')} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPackages.map((p) => (
                <PackageCard key={p.id} pkg={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title={`${t('pkg.interested')} ${td(pkg.title)}?`}
      />
    </>
  );
}

export default function PackageDetail() {
  const { slug } = useParams();
  if (!slug) return <PackagesList />;
  return <PackageDetailPage />;
}
