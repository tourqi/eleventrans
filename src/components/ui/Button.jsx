import { Link } from 'react-router-dom';

const variants = {
  primary:
    'bg-accent-500 hover:bg-accent-600 text-white shadow-md hover:shadow-lg btn-glow',
  secondary:
    'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg',
  outline:
    'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
  whatsapp:
    'bg-whatsapp hover:bg-whatsapp-dark text-white shadow-md hover:shadow-lg',
  ghost:
    'text-primary-600 hover:bg-primary-50',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2';
  const cls = `${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
