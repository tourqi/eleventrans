import { motion } from 'framer-motion';
import { Target, Eye, Heart, Users, Award } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import CTASection from '../components/sections/CTASection';
import PageHero from '../components/sections/PageHero';
import SEO from '../components/SEO';

const TEAM = [
  { name: 'Ahmad Fauzi', role: 'Founder & CEO', desc: 'Visioner di balik Eleven Trans Holiday. Berpengalaman 10+ tahun di industri travel.' },
  { name: 'Siti Rahma', role: 'Operations Manager', desc: 'Memastikan setiap trip berjalan mulus dari A-Z.' },
  { name: 'Dedi Kurniawan', role: 'Trip Designer', desc: 'Merancang konsep acara yang kreatif dan memorable.' },
  { name: 'Nisa Amalia', role: 'Customer Relations', desc: 'Contact person favorit semua klien. Ramah, cepat, solutif.' },
];

export default function About() {
  return (
    <>
      <SEO
        title="Tentang Kami"
        description="Kenali Eleven Trans Holiday — tim berpengalaman di balik layanan travel terbaik di Bandung. Cerita kami, visi & misi."
        path="/about"
      />
      {/* Hero */}
      <PageHero>
        <span className="text-accent-300 font-semibold text-xs uppercase tracking-wider">
          Tentang Kami
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4 leading-tight text-white">
          Lebih dari Sekadar Travel — Kami Adalah Teman Perjalananmu
        </h1>
        <p className="text-base text-white/80 leading-relaxed">
          Eleven Trans Holiday lahir dari passion sederhana: bikin liburan jadi lebih asyik.
          Kami percaya bahwa perjalanan terbaik bukan soal destinasi, tapi soal pengalaman dan
          cerita yang kamu bawa pulang.
        </p>
      </PageHero>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Cerita Kami</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Berawal dari sebuah mobil rental kecil di Bandung tahun 2015, Eleven Trans Holiday
                  tumbuh menjadi travel organizer yang dipercaya ratusan perusahaan, komunitas, dan
                  keluarga di Indonesia.
                </p>
                <p>
                  Nama &ldquo;Eleven&rdquo; bukan sekadar angka — ini simbol dari philosophy kami:
                  selalu berusaha memberikan yang lebih (above & beyond). Setiap trip, setiap acara,
                  setiap momen — kami ingin hasilnya selalu di atas ekspektasi.
                </p>
                <p>
                  Dengan tim yang passionate, armada yang terawat, dan konsep acara yang selalu
                  fresh — kami siap menjadi teman perjalanan terbaik kamu.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800"
                alt="Eleven Trans team"
                className="w-full h-80 lg:h-[400px] object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Visi & Misi" title="Arah & Tujuan Kami" />

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-md"
            >
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-5">
                <Eye className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visi</h3>
              <p className="text-gray-600 leading-relaxed">
                Menjadi travel organizer #1 di Indonesia yang dikenal karena pengalaman perjalanan
                yang menyenangkan, personal, dan penuh cerita.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white rounded-2xl p-8 shadow-md"
            >
              <div className="w-14 h-14 bg-accent-100 rounded-xl flex items-center justify-center mb-5">
                <Target className="w-7 h-7 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Misi</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-accent-500 mt-1">•</span>
                  Memberikan layanan travel yang personal dan ramah
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-500 mt-1">•</span>
                  Merancang konsep acara yang kreatif dan memorable
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-500 mt-1">•</span>
                  Mengutamakan keamanan dan kenyamanan pelanggan
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-500 mt-1">•</span>
                  Berinovasi dalam pengalaman wisata Indonesia
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Tim Kami"
            title="Orang-Orang di Balik Layar"
            subtitle="Tim kecil tapi solid — setiap orang punya passion untuk memberikan yang terbaik."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {member.name[0]}
                </div>
                <h4 className="font-bold text-gray-900">{member.name}</h4>
                <p className="text-sm text-accent-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-500">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        waMessage="Halo Eleven Trans! 👋 Saya baru baca tentang kalian. Boleh tanya-tanya soal trip?"
      />
    </>
  );
}
