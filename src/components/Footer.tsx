import React from 'react';
import { LogoBadge } from './LogoBadge';
import { 
  BookOpen, 
  MapPin, 
  GraduationCap, 
  Heart, 
  Sparkles,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';
import { CATEGORIES_DATA } from '../data/categories';
import { BookCategory } from '../types';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  setSelectedCategory: (cat: BookCategory | 'Semua') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, setSelectedCategory }) => {
  return (
    <footer id="main-footer" className="bg-[#0A192F] text-slate-300 border-t border-slate-800 relative overflow-hidden">
      {/* Decorative top pattern accent */}
      <div className="h-1 w-full bg-gradient-to-r from-[#2D5A27] via-[#D4AF37] to-[#1E3A8A]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Col 1 & 2: Branding & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <LogoBadge size="lg" showText={false} />
              <div>
                <span className="text-xs font-bold text-[#D4AF37] tracking-wider uppercase">
                  Program Kerja KKN Tematik
                </span>
                <h3 className="text-xl font-bold font-display text-white">
                  Pojok Baca Desa Batursari
                </h3>
                <p className="text-xs text-slate-400">
                  Kelompok 47 • Universitas PGRI Semarang (UPGRIS)
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-md pt-1">
              Platform perpustakaan digital resmi masyarakat Desa Batursari, Kecamatan Mranggen, Kabupaten Demak. 
              Menyediakan akses bahan bacaan berkualitas gratis untuk mewujudkan generasi desa yang cerdas, berdaya, dan berbudaya literasi.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-semibold bg-[#162A45] px-3.5 py-2 rounded-xl border border-[#D4AF37]/30 w-fit">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Slogan: "Membaca, Belajar, dan Berkembang Bersama"</span>
            </div>
          </div>

          {/* Col 3: Kategori Buku */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3.5 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              Koleksi Kategori
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {CATEGORIES_DATA.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setActiveTab('katalog');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A27]"></span>
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setActiveTab('kategori');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#D4AF37] hover:underline font-semibold pt-1 flex items-center gap-1 cursor-pointer"
                >
                  Lihat Semua Kategori &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Tautan Cepat */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3.5 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#2D5A27]" />
              Informasi KKN
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('tentang');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Profil KKN Tematik Kelompok 47
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('literasi');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Pojok Literasi & Potensi Batursari
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('literasi');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Dokumentasi Kegiatan KKN
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Portal Admin & Statistik
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Lokasi & Afiliasi */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3.5 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-400" />
              Lokasi & Kontak
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  Balai Desa Batursari, Jl. Raya Batursari, Kec. Mranggen, Kab. Demak, Jawa Tengah 59567
                </span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#2D5A27] shrink-0" />
                <span>Universitas PGRI Semarang (UPGRIS)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>kkn47.batursari@upgris.ac.id</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Pojok Baca Desa Batursari.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-slate-400">KKN Tematik UPGRIS Kelompok 47</span>
          </div>

          <div className="flex items-center gap-1 text-slate-300">
            <span>Dipersembahkan dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-0.5" />
            <span>untuk Masyarakat Desa Batursari</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
