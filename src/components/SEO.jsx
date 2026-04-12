import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Eleven Trans Holiday';
const DEFAULT_DESCRIPTION =
  'Eleven Trans Holiday — Travel with Fun! Private trip, family gathering, adventure trip & industrial visit terbaik di Bandung.';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200';

/**
 * SEO component — sets <title>, meta description, and Open Graph tags per page.
 *
 * @param {Object} props
 * @param {string} props.title       — Page title (will be appended with site name)
 * @param {string} [props.description] — Meta description
 * @param {string} [props.image]       — OG image URL
 * @param {string} [props.path]        — Canonical path e.g. "/about"
 */
export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  path = '',
}) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Travel with Fun`;
  const url = `https://eleventransholiday.com${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
