import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import PageHero from '../components/sections/PageHero';
import SEO from '../components/SEO';
import { COMPANY } from '../data/constants';
import { buildWhatsAppLink } from '../utils/helpers';
import { useLanguage } from '../contexts/LanguageContext';

export default function Contact() {
  const [status, setStatus] = useState('idle');
  const { t } = useLanguage();

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    const formData = new FormData(e.target);

    if (formData.get('website')) {
      setStatus('idle');
      return;
    }

    const name = formData.get('name');
    const phone = formData.get('phone');
    const message = formData.get('message');
    const tripType = formData.get('tripType');
    const pax = formData.get('pax');

    const waText = `Halo Eleven Trans! 👋\n\nNama: ${name}\nNo HP: ${phone}\nJenis Trip: ${tripType}\nJumlah Orang: ${pax}\n\nPesan:\n${message}`;

    window.open(buildWhatsAppLink(waText), '_blank');
    setStatus('success');
    e.target.reset();
    setTimeout(() => setStatus('idle'), 5000);
  }

  return (
    <>
      <SEO
        title={t('contact.eyebrow')}
        description={t('seo.contact')}
        path="/contact"
      />
      <PageHero>
        <span className="text-accent-300 font-semibold text-xs uppercase tracking-wider">
          {t('contact.eyebrow')}
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4 text-white">
          {t('contact.title')}
        </h1>
        <p className="text-base text-white/80">
          {t('contact.desc')}
        </p>
      </PageHero>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.formTitle')}</h2>

                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('contact.thankYou')}</h3>
                    <p className="text-gray-600">{t('contact.thankYouMsg')}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="form-label">{t('contact.nameLabel')}</label>
                        <input name="name" required placeholder={t('contact.namePlaceholder')} className="form-input" />
                      </div>
                      <div>
                        <label className="form-label">{t('contact.whatsappLabel')}</label>
                        <input name="phone" required placeholder="08xxxxxxxxxx" className="form-input" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="form-label">{t('contact.tripTypeLabel')}</label>
                        <select name="tripType" className="form-input">
                          <option value="">{t('contact.tripTypePlaceholder')}</option>
                          <option value="Private Trip">Private Trip</option>
                          <option value="Family Gathering">Family Gathering</option>
                          <option value="Adventure Trip">Adventure Trip</option>
                          <option value="Industrial Visit">Industrial Visit</option>
                          <option value="Custom">{t('contact.tripCustom')}</option>
                        </select>
                      </div>
                      <div>
                        <label className="form-label">{t('contact.paxLabel')}</label>
                        <input name="pax" type="number" min="1" placeholder={t('contact.paxPlaceholder')} className="form-input" />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">{t('contact.messageLabel')}</label>
                      <textarea name="message" rows={4} placeholder={t('contact.messagePlaceholder')} className="form-input resize-none" />
                    </div>

                    <Button type="submit" variant="primary" size="lg" className="w-full" disabled={status === 'sending'}>
                      <Send className="w-5 h-5" />
                      {status === 'sending' ? t('contact.sending') : t('contact.submit')}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t('contact.chatDirect')}</h3>
                <p className="text-gray-600 text-sm mb-5">{t('contact.chatDirectDesc')}</p>
                <Button variant="whatsapp" size="lg" href={buildWhatsAppLink('Halo Eleven Trans! Saya mau tanya tentang trip.')} className="w-full">
                  <Phone className="w-5 h-5" />
                  {t('contact.chatWA')}
                </Button>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8 space-y-5">
                <h3 className="text-lg font-bold text-gray-900">{t('contact.infoTitle')}</h3>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{t('contact.phoneLabel')}</div>
                    <div className="text-sm text-gray-600">{COMPANY.phone}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{t('contact.emailLabel')}</div>
                    <div className="text-sm text-gray-600">{COMPANY.email}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{t('contact.addressLabel')}</div>
                    <div className="text-sm text-gray-600">{COMPANY.address}</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{t('contact.hoursTitle')}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>{t('contact.monFri')}</span>
                    <span className="font-medium text-gray-900">08:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('contact.sat')}</span>
                    <span className="font-medium text-gray-900">08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('contact.sun')}</span>
                    <span className="font-medium text-gray-900">09:00 - 15:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('contact.locationTitle')}</h2>
          <p className="text-gray-500 text-sm mb-6">{t('contact.locationSub')}</p>
        </div>
        <div className="w-full h-[400px] bg-gray-100">
          <iframe
            title="Lokasi Eleven Trans Holiday"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961!2d107.6868101!3d-6.9231907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e52e6900c083%3A0x5b1e9f6a7b3e4d2a!2sJl.+Raya+Cimahi%2C+Bandung!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
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
