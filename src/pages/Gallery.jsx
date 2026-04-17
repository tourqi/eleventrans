import GalleryGrid from '../components/sections/GalleryGrid';
import { GALLERY_IMAGES, GALLERY_CATEGORIES } from '../data/clients';
import CTASection from '../components/sections/CTASection';
import PageHero from '../components/sections/PageHero';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export default function Gallery() {
  const { t } = useLanguage();
  return (
    <>
      <SEO
        title={t('gallery.eyebrow')}
        description={t('seo.gallery')}
        path="/gallery"
      />
      {/* Hero */}
      <PageHero>
        <span className="text-accent-300 font-semibold text-xs uppercase tracking-wider">
          {t('gallery.eyebrow')}
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4 text-white">
          {t('gallery.title')}
        </h1>
        <p className="text-base text-white/80">
          {t('gallery.desc')}
        </p>
      </PageHero>

      <GalleryGrid
        images={GALLERY_IMAGES}
        categories={GALLERY_CATEGORIES}
        title={t('gallery.collectionTitle')}
        subtitle={t('gallery.collectionSub')}
      />

      <CTASection
        title={t('gallery.ctaTitle')}
        subtitle={t('gallery.ctaSub')}
      />
    </>
  );
}
