export default function SectionHeading({ eyebrow, title, subtitle, center = true, className = '' }) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''} mb-12 ${className}`}>
      {eyebrow && (
        <span className="inline-block text-accent-500 font-semibold text-sm uppercase tracking-wider mb-2">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
