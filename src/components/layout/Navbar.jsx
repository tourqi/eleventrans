import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import Button from '../ui/Button';
import { buildWhatsAppLink } from '../../utils/helpers';
import { DEFAULT_WA_MESSAGE } from '../../data/constants';
import logo from '../../assets/logo.webp';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Packages', to: '/packages' },
  { label: 'Fleet', to: '/fleet' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Calculator', to: '/calculator' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
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
              {NAV_LINKS.map((link) => (
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
                  {link.label}
                </NavLink>
              ))}
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
