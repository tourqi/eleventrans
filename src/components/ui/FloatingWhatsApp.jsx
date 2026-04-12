import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '../../utils/helpers';
import { DEFAULT_WA_MESSAGE } from '../../data/constants';

export default function FloatingWhatsApp({ message }) {
  const href = buildWhatsAppLink(message || DEFAULT_WA_MESSAGE);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-20 md:bottom-6 z-50 group"
      aria-label="Chat via WhatsApp"
    >
      <div className="relative flex items-center">
        {/* Tooltip */}
        <span className="hidden md:block absolute right-full mr-3 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Chat via WhatsApp
        </span>

        {/* Button */}
        <div className="w-14 h-14 bg-whatsapp hover:bg-whatsapp-dark rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 wa-glow">
          <MessageCircle className="w-7 h-7 text-white animate-bounce-gentle" />
        </div>

        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-15 pointer-events-none" />
      </div>
    </a>
  );
}
