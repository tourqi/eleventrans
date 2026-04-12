import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      <SEO title="404 — Halaman Tidak Ditemukan" description="Halaman yang kamu cari tidak ditemukan." />
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        {/* Big 404 */}
        <h1 className="text-[10rem] md:text-[12rem] font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-orange-500 select-none">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-4 font-[Poppins]">
          Halaman Tidak Ditemukan
        </h2>

        <p className="text-gray-500 mb-8 leading-relaxed">
          Sepertinya kamu tersesat! Halaman yang kamu cari tidak ada atau sudah dipindahkan. 
          Yuk kembali dan temukan petualangan seru bersama kami.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
          >
            <Home className="w-5 h-5" />
            Kembali ke Beranda
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Halaman Sebelumnya
          </button>
        </div>
      </motion.div>
    </section>
  );
}
