import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, CheckCircle, ChevronLeft } from 'lucide-react';
import { SERVICES, SERVICE_ICONS } from '../data/services';
import { getServiceBySlug } from '../data/services';
import SectionHeading from '../components/ui/SectionHeading';
import ServiceCard from '../components/sections/ServiceCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import CTASection from '../components/sections/CTASection';
import PageHero from '../components/sections/PageHero';
import SEO from '../components/SEO';
import { buildWhatsAppLink } from '../utils/helpers';
import { useLanguage } from '../contexts/LanguageContext';

/* Service listing page (no slug) */
function ServicesList() {
  const { t } = useLanguage();
  return (
    <>
      <SEO
        title={t('servicesPage.eyebrow')}
        description={t('seo.services')}
        path="/services"
      />
      <PageHero>
        <span className="text-accent-300 font-semibold text-xs uppercase tracking-wider">
          {t('servicesPage.eyebrow')}
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4 leading-tight text-white">
          {t('servicesPage.title')}
        </h1>
        <p className="text-base text-white/80 leading-relaxed">
          {t('servicesPage.desc')}
        </p>
      </PageHero>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

/* Service detail page */
function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);
  const { t, td } = useLanguage();

  if (!service) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('servicesPage.notFound')}</h1>
        <Link to="/services" className="text-primary-600 hover:underline">
          {t('servicesPage.backLink')}
        </Link>
      </div>
    );
  }

  const Icon = SERVICE_ICONS[service.icon];

  return (
    <>
      <SEO
        title={td(service.title)}
        description={td(service.short)}
        image={service.heroImage}
        path={`/services/${service.slug}`}
      />
      {/* Hero */}
      <PageHero backgroundImage={service.heroImage}>
        <Link to="/services" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors">
          <ChevronLeft className="w-4 h-4" /> {t('servicesPage.allServices')}
        </Link>
        <Badge variant="accent" className="mb-3">{td(service.tagline)}</Badge>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight text-white">
          {td(service.title)}
        </h1>
        <p className="text-base text-white/80 leading-relaxed mb-6">
          {td(service.description)}
        </p>
        <Button variant="whatsapp" size="lg" href={buildWhatsAppLink(`Halo Eleven Trans! 👋 Saya tertarik dengan layanan ${service.title}. Bisa minta info lebih lanjut?`)}>
          <Phone className="w-5 h-5" />
          {t('servicesPage.freeConsult')}
        </Button>
      </PageHero>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                eyebrow={t('servicesPage.benefitsEyebrow')}
                title={`${t('servicesPage.benefitsTitle')} ${td(service.title)}?`}
                center={false}
              />
              <ul className="space-y-4">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent-500 mt-0.5 shrink-0" />
                    <span className="text-gray-700">{td(benefit)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <h4 className="font-semibold text-gray-900 mb-2">{t('servicesPage.suitableFor')}</h4>
                <div className="flex flex-wrap gap-2">
                  {service.targets.map((tgt) => (
                    <Badge key={tgt} variant="default">{td(tgt)}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={service.heroImage}
                alt={service.title}
                className="w-full h-80 lg:h-[400px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title={`${t('servicesPage.interested')} ${td(service.title)}?`}
        subtitle={t('servicesPage.interestedSub')}
      />
    </>
  );
}

/* Router decides which to show */
export default function Services() {
  const { slug } = useParams();
  if (slug) return <ServiceDetail />;
  return <ServicesList />;
}
