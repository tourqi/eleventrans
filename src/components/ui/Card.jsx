export default function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={`card ${hover ? 'hover-lift' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardImage({ src, alt, className = '' }) {
  return (
    <div className={`img-zoom ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export function CardBody({ children, className = '' }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}
