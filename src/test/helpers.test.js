import { describe, it, expect } from 'vitest';
import { buildWhatsAppLink, formatRupiah, slugify } from '../utils/helpers';

describe('buildWhatsAppLink', () => {
  it('should create a valid WhatsApp link', () => {
    const link = buildWhatsAppLink('Hello');
    expect(link).toContain('https://wa.me/');
    expect(link).toContain('text=Hello');
  });

  it('should encode special characters', () => {
    const link = buildWhatsAppLink('Hello World & Friends');
    expect(link).toContain('text=Hello%20World%20%26%20Friends');
  });

  it('should use custom phone number when provided', () => {
    const link = buildWhatsAppLink('Hi', '628123456789');
    expect(link).toContain('wa.me/628123456789');
  });
});

describe('formatRupiah', () => {
  it('should format number as IDR currency', () => {
    const result = formatRupiah(1500000);
    expect(result).toContain('1.500.000');
  });

  it('should handle zero', () => {
    const result = formatRupiah(0);
    expect(result).toContain('0');
  });
});

describe('slugify', () => {
  it('should convert text to lowercase slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('should remove special characters', () => {
    expect(slugify('Trip — Pangandaran!')).toBe('trip-pangandaran');
  });
});
