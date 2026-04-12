import { motion } from 'framer-motion';
import { Clock, Users, MapPin, ArrowRight, Phone } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import SectionHeading from '../ui/SectionHeading';
import { buildWhatsAppLink } from '../../utils/helpers';
import { getFeaturedPackages } from '../../data/packages';

export default function FeaturedExperienceSection() {
  const featured = getFeaturedPackages()[0];
  if (!featured) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Paket Unggulan"
          title="Pengalaman Paling Populer"
          subtitle="Dicoba ratusan peserta — direkomendasikan semua."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-64 lg:h-auto">
              <img
                src={featured.images[0]}
                alt={featured.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="accent">🔥 Most Popular</Badge>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                {featured.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">{featured.excerpt}</p>

              {/* Quick facts */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Clock className="w-4 h-4 text-primary-500" />
                  <span>{featured.meta.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Users className="w-4 h-4 text-primary-500" />
                  <span>{featured.meta.groupSize}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin className="w-4 h-4 text-primary-500" />
                  <span>{featured.meta.location?.split(',')[0]}</span>
                </div>
              </div>

              {/* Activities preview */}
              <div className="flex flex-wrap gap-2 mb-8">
                {featured.activities.slice(0, 4).map((act) => (
                  <Badge key={act} variant="default">{act}</Badge>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="whatsapp"
                  size="md"
                  href={buildWhatsAppLink(featured.ctaPrefill)}
                >
                  <Phone className="w-4 h-4" />
                  Booking Sekarang
                </Button>
                <Button variant="outline" size="md" to={`/packages/${featured.slug}`}>
                  Detail Lengkap
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
