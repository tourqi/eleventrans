import { motion } from 'framer-motion';

export default function Timeline({ steps }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 via-accent-400 to-primary-300 hidden sm:block" />

      <ol className="space-y-8">
        {steps.map((step, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="relative flex gap-6"
          >
            {/* Marker */}
            <div className="shrink-0 relative z-10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {step.time?.slice(0, 5) || idx + 1}
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl p-5 shadow-md flex-1 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-lg font-bold text-gray-900">{step.title}</h4>
                {step.time && (
                  <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-medium">
                    {step.time}
                  </span>
                )}
              </div>
              {step.description && (
                <p className="text-gray-600 leading-relaxed text-sm">{step.description}</p>
              )}
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
