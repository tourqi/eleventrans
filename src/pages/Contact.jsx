import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import PageHero from '../components/sections/PageHero';
import SEO from '../components/SEO';
import { COMPANY } from '../data/constants';
import { buildWhatsAppLink } from '../utils/helpers';

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    const formData = new FormData(e.target);

    // Honeypot check
    if (formData.get('website')) {
      setStatus('idle');
      return;
    }

    // Build WhatsApp link as fallback
    const name = formData.get('name');
    const phone = formData.get('phone');
    const message = formData.get('message');
    const tripType = formData.get('tripType');
    const pax = formData.get('pax');

    const waText = `Halo Eleven Trans! 👋\n\nNama: ${name}\nNo HP: ${phone}\nJenis Trip: ${tripType}\nJumlah Orang: ${pax}\n\nPesan:\n${message}`;

    // For MVP: open WhatsApp with form data
    window.open(buildWhatsAppLink(waText), '_blank');
    setStatus('success');
    e.target.reset();

    // Reset after 5 sec
    setTimeout(() => setStatus('idle'), 5000);
  }

  return (
    <>
      <SEO
        title="Kontak"
        description="Hubungi Eleven Trans Holiday via WhatsApp, telepon, atau email. Konsultasi gratis untuk trip impianmu!"
        path="/contact"
      />
      {/* Hero */}
      <PageHero>
        <span className="text-accent-300 font-semibold text-xs uppercase tracking-wider">
          Kontak
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4 text-white">
          Ceritakan Rencana Trip Kamu
        </h1>
        <p className="text-base text-white/80">
          Isi form di bawah atau langsung chat via WhatsApp. Konsultasi gratis — tanpa
          komitmen!
        </p>
      </PageHero>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Custom Trip</h2>

                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Terima kasih! 🎉</h3>
                    <p className="text-gray-600">
                      Pesan kamu sudah kami terima. Tim kami akan menghubungi kamu segera via
                      WhatsApp.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Honeypot */}
                    <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="form-label">
                          Nama Lengkap *
                        </label>
                        <input
                          name="name"
                          required
                          placeholder="Nama kamu"
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="form-label">
                          No. WhatsApp *
                        </label>
                        <input
                          name="phone"
                          required
                          placeholder="08xxxxxxxxxx"
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="form-label">
                          Jenis Trip
                        </label>
                        <select
                          name="tripType"
                          className="form-input"
                        >
                          <option value="">Pilih jenis trip</option>
                          <option value="Private Trip">Private Trip</option>
                          <option value="Family Gathering">Family Gathering</option>
                          <option value="Adventure Trip">Adventure Trip</option>
                          <option value="Industrial Visit">Industrial Visit</option>
                          <option value="Custom">Lainnya / Custom</option>
                        </select>
                      </div>
                      <div>
                        <label className="form-label">
                          Jumlah Orang
                        </label>
                        <input
                          name="pax"
                          type="number"
                          min="1"
                          placeholder="Perkiraan jumlah peserta"
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">
                        Ceritakan Rencana Trip Kamu
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Mau ke mana? Kapan? Budget berapa? Ceritakan sebanyak mungkin..."
                        className="form-input resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={status === 'sending'}
                    >
                      <Send className="w-5 h-5" />
                      {status === 'sending' ? 'Mengirim...' : 'Kirim & Chat via WhatsApp'}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              {/* WhatsApp CTA */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Chat Langsung 💬</h3>
                <p className="text-gray-600 text-sm mb-5">
                  Cara tercepat untuk menghubungi kami. Respon dalam hitungan menit!
                </p>
                <Button
                  variant="whatsapp"
                  size="lg"
                  href={buildWhatsAppLink('Halo Eleven Trans! Saya mau tanya tentang trip.')}
                  className="w-full"
                >
                  <Phone className="w-5 h-5" />
                  Chat via WhatsApp
                </Button>
              </div>

              {/* Contact details */}
              <div className="bg-white rounded-2xl shadow-md p-8 space-y-5">
                <h3 className="text-lg font-bold text-gray-900">Info Kontak</h3>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Telepon / WhatsApp</div>
                    <div className="text-sm text-gray-600">{COMPANY.phone}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Email</div>
                    <div className="text-sm text-gray-600">{COMPANY.email}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Alamat</div>
                    <div className="text-sm text-gray-600">{COMPANY.address}</div>
                  </div>
                </div>
              </div>

              {/* Business hours */}
              <div className="bg-white rounded-2xl shadow-md p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Jam Operasional</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Senin - Jumat</span>
                    <span className="font-medium text-gray-900">08:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sabtu</span>
                    <span className="font-medium text-gray-900">08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Minggu</span>
                    <span className="font-medium text-gray-900">09:00 - 15:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Lokasi Kami</h2>
          <p className="text-gray-500 text-sm mb-6">Kunjungi kantor kami di Bandung</p>
        </div>
        <div className="w-full h-[400px] bg-gray-100">
          <iframe
            title="Lokasi Eleven Trans Holiday"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56421450498!2d107.5731165!3d-6.9034495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a1f93d3e815b2!2sBandung%2C%20Kota%20Bandung%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
