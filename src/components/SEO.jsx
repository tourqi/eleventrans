import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '../data/constants';

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
  const url = `${SITE_URL}${path}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: DEFAULT_DESCRIPTION,
    telephone: '+62-812-2047-8789',
    email: 'eleventransholiday@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Graha Pesona, Blok E3, Cisaranten Kulon',
      addressLocality: 'Bandung',
      addressRegion: 'West Java',
      postalCode: '40296',
      addressCountry: 'ID',
    },
    sameAs: [
      'https://instagram.com/eleventransholiday',
      'https://facebook.com/eleventransholiday',
      'https://tiktok.com/@eleventransholiday',
    ],
  };

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

      {/* JSON-LD Structured Data */}
      {path === '/' && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
