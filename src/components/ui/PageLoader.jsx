import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

export default function PageLoader() {
  const { t } = useLanguage();
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        {/* Animated dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-blue-600"
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
        <p className="text-sm text-gray-400 font-medium">{t('loader.text')}</p>
      </motion.div>
    </div>
  );
}
