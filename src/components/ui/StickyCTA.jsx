import { Phone } from 'lucide-react';
import { buildWhatsAppLink } from '../../utils/helpers';
import { DEFAULT_WA_MESSAGE } from '../../data/constants';

export default function StickyCTA({ label = 'Plan Your Trip', message }) {
  const href = buildWhatsAppLink(message || DEFAULT_WA_MESSAGE);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-gray-900 truncate">{label}</div>
          <div className="text-xs text-gray-500">Gratis konsultasi via WhatsApp</div>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-whatsapp hover:bg-whatsapp-dark text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors"
        >
          <Phone className="w-4 h-4" />
          Chat
        </a>
      </div>
    </div>
  );
}
