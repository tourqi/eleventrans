import { Link } from 'react-router-dom';
import { Clock, Users, MapPin, ArrowRight } from 'lucide-react';
import Card, { CardImage, CardBody } from '../ui/Card';
import Badge from '../ui/Badge';
import { formatRupiah } from '../../utils/helpers';
import { useLanguage } from '../../contexts/LanguageContext';

export default function PackageCard({ pkg }) {
  const { t, td } = useLanguage();
  return (
    <Card className="group">
      <Link to={`/packages/${pkg.slug}`}>
        <div className="relative">
          <CardImage src={pkg.images[0]} alt={pkg.title} className="h-52" />
          {pkg.featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="accent">🔥 Popular</Badge>
            </div>
          )}
          {pkg.priceFrom && (
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg">
              <span className="text-sm font-bold text-accent-600">
                {formatRupiah(pkg.priceFrom)}
              </span>
              <span className="text-xs text-gray-500">{pkg.priceUnit}</span>
            </div>
          )}
        </div>
        <CardBody>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {td(pkg.title)}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
            {td(pkg.excerpt)}
          </p>

          {/* Quick meta */}
          <div className="flex flex-wrap gap-3 mb-4 text-xs text-gray-500">
            {pkg.meta?.duration && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {td(pkg.meta.duration)}
              </span>
            )}
            {pkg.meta?.groupSize && (
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> {td(pkg.meta.groupSize)}
              </span>
            )}
            {pkg.meta?.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {pkg.meta.location.split(',')[0]}
              </span>
            )}
          </div>

          <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600">
            {t('pkg.viewDetail')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </CardBody>
      </Link>
    </Card>
  );
}
