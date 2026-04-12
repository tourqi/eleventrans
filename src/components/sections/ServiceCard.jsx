import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Card, { CardImage, CardBody } from '../ui/Card';
import Badge from '../ui/Badge';

export default function ServiceCard({ service }) {
  return (
    <Card className="group">
      <Link to={`/services/${service.slug}`}>
        <CardImage src={service.heroImage} alt={service.title} className="h-48" />
        <CardBody>
          <Badge variant="default" className="mb-2">
            {service.targets[0]}
          </Badge>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {service.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
            {service.short}
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600">
            Selengkapnya
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </CardBody>
      </Link>
    </Card>
  );
}
