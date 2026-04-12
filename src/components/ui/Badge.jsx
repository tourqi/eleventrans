const badgeVariants = {
  default: 'bg-primary-100 text-primary-700',
  accent: 'bg-accent-100 text-accent-700',
  success: 'bg-green-100 text-green-700',
  neutral: 'bg-gray-100 text-gray-600',
};

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
        badgeVariants[variant] || badgeVariants.default
      } ${className}`}
    >
      {children}
    </span>
  );
}
