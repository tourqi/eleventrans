import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { TESTIMONIALS } from '../../data/testimonials';
import { useLanguage } from '../../contexts/LanguageContext';

function TestimonialBody({ testimonial, text }) {
  return (
    <>
      <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
        &ldquo;{text}&rdquo;
      </p>

      <div className="flex items-center gap-4">
        <img
          src={testimonial.photo}
          alt={testimonial.name}
          className="w-14 h-14 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <div className="font-bold text-gray-900">{testimonial.name}</div>
          <div className="text-sm text-gray-500">
            {testimonial.roleText}, {testimonial.company}
          </div>
          <div className="flex gap-0.5 mt-1">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);
  const { t, td, lang } = useLanguage();
  const [contentHeight, setContentHeight] = useState(null);
  const measureRefs = useRef([]);

  const prev = () => setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));

  const testimonial = TESTIMONIALS[current];

  // Measure every testimonial at the current viewport width and take the
  // tallest one, so the bubble never resizes when switching slides — only
  // the nav dots/arrows position stays fixed regardless of text length.
  useLayoutEffect(() => {
    const heights = measureRefs.current.map((el) => el?.offsetHeight || 0);
    const max = Math.max(...heights, 0);
    if (max) setContentHeight(max);
  }, [lang]);

  useEffect(() => {
    const handleResize = () => {
      const heights = measureRefs.current.map((el) => el?.offsetHeight || 0);
      const max = Math.max(...heights, 0);
      if (max) setContentHeight(max);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t('testimonial.eyebrow')}
          title={t('testimonial.title')}
          subtitle={t('testimonial.subtitle')}
        />

        <div className="max-w-3xl mx-auto">
          <div className="relative bg-gradient-to-br from-primary-50 to-white rounded-3xl p-8 md:p-12 shadow-lg">
            <Quote className="w-10 h-10 text-primary-200 mb-4" />

            <div className="relative flex flex-col" style={contentHeight ? { minHeight: contentHeight } : undefined}>
              {/* Invisible measurement stack: renders every testimonial to find the tallest */}
              <div aria-hidden="true" className="invisible absolute inset-0 -z-10 overflow-hidden">
                {TESTIMONIALS.map((item, idx) => (
                  <div key={item.id} ref={(el) => (measureRefs.current[idx] = el)} className="absolute inset-x-0 top-0">
                    <TestimonialBody
                      testimonial={{ ...item, roleText: td(item.role) }}
                      text={td(item.text)}
                    />
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col justify-center"
                >
                  <TestimonialBody
                    testimonial={{ ...testimonial, roleText: td(testimonial.role) }}
                    text={td(testimonial.text)}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx === current ? 'bg-primary-600 w-6' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
