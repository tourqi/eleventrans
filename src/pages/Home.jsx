import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import WhyChooseUsSection from '../components/sections/WhyChooseUsSection';
import FeaturedExperienceSection from '../components/sections/FeaturedExperienceSection';
import TestimonialSection from '../components/sections/TestimonialSection';
import CTASection from '../components/sections/CTASection';
import FAQSection from '../components/sections/FAQSection';
import SEO from '../components/SEO';
import { CLIENTS } from '../data/clients';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  return (
    <>
      <SEO
        title={null}
        description={t('seo.home')}
        path="/"
      />
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <FeaturedExperienceSection />
      <TestimonialSection />

      {/* Client logos */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-400 font-medium uppercase tracking-wider mb-10">
            {t('home.trustedBy')}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
            {CLIENTS.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-center bg-white border border-gray-100 rounded-xl px-5 py-4 hover:border-primary-200 hover:shadow-md transition-all duration-300 group"
                title={client.name}
              >
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-8 md:h-10 w-auto object-contain opacity-50 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-sm font-bold text-gray-400 group-hover:text-primary-600 transition-colors text-center leading-tight">
                    {client.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
      <CTASection />
    </>
  );
}
