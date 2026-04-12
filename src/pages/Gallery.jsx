import GalleryGrid from '../components/sections/GalleryGrid';
import { GALLERY_IMAGES, GALLERY_CATEGORIES } from '../data/clients';
import CTASection from '../components/sections/CTASection';
import PageHero from '../components/sections/PageHero';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

export default function Gallery() {
  return (
    <>
      <SEO
        title="Gallery"
        description="Galeri foto trip dan keseruan bersama Eleven Trans Holiday — rafting, gathering, city tour, dan banyak lagi."
        path="/gallery"
      />
      {/* Hero */}
      <PageHero>
        <span className="text-accent-300 font-semibold text-xs uppercase tracking-wider">
          Gallery
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4 text-white">
          Momen-Momen Seru Bersama Kami
        </h1>
        <p className="text-base text-white/80">
          Lihat bagaimana keseruan trip bersama Eleven Trans Holiday. Setiap foto punya cerita.
        </p>
      </PageHero>

      <GalleryGrid
        images={GALLERY_IMAGES}
        categories={GALLERY_CATEGORIES}
        title="Koleksi Foto"
        subtitle="Filter berdasarkan jenis trip untuk melihat yang kamu suka."
      />

      <CTASection
        title="Mau Jadi Bagian dari Cerita Ini?"
        subtitle="Hubungi kami dan rencanakan trip seru kamu sekarang!"
        waMessage="Halo Eleven Trans! 👋 Saya lihat gallery kalian keren banget. Mau tanya soal trip!"
      />
    </>
  );
}
