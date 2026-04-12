import { WHATSAPP_NUMBER } from '../data/constants';

/**
 * Build a WhatsApp click-to-chat link.
 * @param {string} message - The pre-filled message text
 * @param {string} [phone] - Override phone number (E.164 digits only)
 * @returns {string} wa.me URL
 */
export function buildWhatsAppLink(message, phone) {
  const num = (phone || WHATSAPP_NUMBER).replace(/\D/g, '');
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${num}?text=${encoded}`;
}

/**
 * Format Indonesian Rupiah
 */
export function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Generate a simple slug from a string
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/**
 * Clamp a value between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
