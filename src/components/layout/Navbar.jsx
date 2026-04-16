import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import Button from '../ui/Button';
import { buildWhatsAppLink } from '../../utils/helpers';
import { DEFAULT_WA_MESSAGE } from '../../data/constants';
import { useLanguage } from '../../contexts/LanguageContext';
import logo from '../../assets/logo.webp';

/* Inline SVG flags — render on all platforms */
const FlagID = ({ className = 'w-5 h-3.5' }) => (
  <svg viewBox="0 0 640 480" className={className} aria-hidden="true">
    <path fill="#e70011" d="M0 0h640v240H0z" />
    <path fill="#fff" d="M0 240h640v240H0z" />
  </svg>
);
const FlagGB = ({ className = 'w-5 h-3.5' }) => (
  <svg viewBox="0 0 640 480" className={className} aria-hidden="true">
    <path fill="#012169" d="M0 0h640v480H0z" />
    <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z" />
    <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z" />
    <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z" />
    <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z" />
  </svg>
);

const NAV_KEYS = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.about', to: '/about' },
  { key: 'nav.services', to: '/services' },
  { key: 'nav.packages', to: '/packages' },
  { key: 'nav.fleet', to: '/fleet' },
  { key: 'nav.gallery', to: '/gallery' },
  { key: 'nav.calculator', to: '/calculator' },
  { key: 'nav.contact', to: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, toggleLang, lang } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'text-accent-500'
        : 'text-gray-700 hover:text-primary-600'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-md'
          : 'bg-white/60 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={logo} alt="Eleven Trans Holiday" className="w-10 h-10 object-contain" />
            <div className="hidden sm:block">
              <div className="font-bold text-gray-900 text-lg leading-tight">Eleven Trans</div>
              <div className="text-[10px] text-accent-500 font-medium -mt-0.5">Travel with Fun</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_KEYS.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
                {t(link.key)}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle language"
            >
              <span className="inline-flex rounded overflow-hidden shadow-sm border border-gray-200">
                {lang === 'id' ? <FlagID /> : <FlagGB />}
              </span>
              {lang.toUpperCase()}
            </button>
            <Button
              variant="whatsapp"
              size="sm"
              href={buildWhatsAppLink(DEFAULT_WA_MESSAGE)}
            >
              <Phone className="w-4 h-4" />
              WhatsApp
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {open && (
          <div className="lg:hidden pb-4 border-t border-gray-100">
            <div className="flex flex-col gap-1 pt-3">
              {NAV_KEYS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                  end={link.to === '/'}
                  onClick={() => setOpen(false)}
                >
                  {t(link.key)}
                </NavLink>
              ))}
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span className="inline-flex rounded overflow-hidden shadow-sm border border-gray-200">
                  {lang === 'id' ? <FlagGB /> : <FlagID />}
                </span>
                {lang === 'id' ? 'English' : 'Bahasa Indonesia'}
              </button>
              <div className="mt-3 px-4">
                <Button
                  variant="whatsapp"
                  size="md"
                  href={buildWhatsAppLink(DEFAULT_WA_MESSAGE)}
                  className="w-full"
                >
                  <Phone className="w-4 h-4" />
                  Chat via WhatsApp
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
