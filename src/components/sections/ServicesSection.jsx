import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Users, Mountain, Building2 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { SERVICES } from '../../data/services';

const ICON_MAP = { Compass, Users, Mountain, Building2 };

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Layanan Kami"
          title="Pengalaman yang Dirancang Khusus"
          subtitle="Dari private trip hingga industrial visit — setiap perjalanan kami rancang dengan cinta dan perhatian penuh."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, idx) => {
            const Icon = ICON_MAP[service.icon] || Compass;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="group block bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center mb-5 group-hover:from-accent-100 group-hover:to-accent-50 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-primary-600 group-hover:text-accent-600 transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {service.short}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 group-hover:text-accent-500 transition-colors">
                    Selengkapnya
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
