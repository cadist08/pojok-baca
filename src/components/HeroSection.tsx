import React from 'react';
import { LogoBadge } from './LogoBadge';
import { 
  BookOpen, 
  Search, 
  ArrowRight, 
  Users, 
  BookCheck, 
  Sparkles, 
  GraduationCap,
  Layers,
  Flame,
  Clock
} from 'lucide-react';
import heroImg from '../assets/images/desa_literasi_hero_1786823660291.jpg';

interface HeroSectionProps {
  onStartReading: () => void;
  onBrowseCategories: () => void;
  totalBooks: number;
  totalReaders: number;
  totalReads: number;
  categoriesCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartReading,
  onBrowseCategories,
  totalBooks,
  totalReaders,
  totalReads,
  categoriesCount,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
}) => {
  return (
    <section id="hero-section" className="relative overflow-hidden bg-gradient-to-b from-[#0A192F] via-[#112240] to-[#FAF9F6] pt-6 pb-16">
      {/* Subtle organic pattern background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Card & Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 pb-8">
          
          {/* Left Column: Text, Logo, Slogan & Action */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* KKN Badge pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#162A45]/90 border border-[#D4AF37]/40 shadow-xs backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#52B788] animate-ping" />
              <span className="text-xs font-semibold text-[#D4AF37] tracking-wide uppercase">
                Program KKN Tematik Kelompok 47 UPGRIS
              </span>
              <span className="text-slate-300 text-xs hidden sm:inline">• Desa Batursari Mranggen</span>
            </div>

            {/* Main Headline with Logo display */}
            <div className="space-y-2">
              <div className="flex items-center gap-4 mb-2">
                <LogoBadge size="lg" showText={false} />
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] block">
                    Perpustakaan Digital Komunitas
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
                    Pojok Baca <span className="text-[#D4AF37] italic font-serif">Desa Batursari</span>
                  </h1>
                </div>
              </div>
              
              <div className="inline-block border-l-4 border-[#D4AF37] pl-3 py-0.5">
                <p className="text-base sm:text-lg font-semibold text-[#52B788] font-display italic">
                  “Membaca, Belajar, dan Berkembang Bersama”
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
              Perpustakaan digital resmi persembahan mahasiswa <strong>KKN Tematik UPGRIS Kelompok 47</strong> untuk seluruh warga Desa Batursari, Kecamatan Mranggen, Kabupaten Demak. 
              Jelajahi puluhan koleksi buku pendidikan, pertanian modern, kesehatan keluarga, dongeng nusantara, hingga panduan UMKM secara gratis langsung di gawai Anda.
            </p>

            {/* Interactive Search Bar in Hero */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSearchSubmit();
              }}
              className="relative max-w-xl flex items-center shadow-lg rounded-2xl overflow-hidden bg-white border border-[#E5E1D1] focus-within:border-[#D4AF37] transition-all"
            >
              <Search className="w-5 h-5 text-[#0A192F] ml-4 shrink-0" />
              <input
                id="hero-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari buku, dongeng anak, pertanian, kesehatan..."
                className="w-full px-3 py-3.5 text-sm text-[#0A192F] placeholder-slate-400 focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                className="px-5 py-3.5 bg-[#0A192F] text-[#D4AF37] hover:bg-[#162A45] font-semibold text-xs sm:text-sm tracking-wide uppercase transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Cari</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                id="hero-start-reading-btn"
                onClick={onStartReading}
                className="px-6 py-3.5 rounded-xl bg-[#2D5A27] hover:bg-[#23471F] text-white font-bold text-sm shadow-md shadow-green-950/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer border border-[#52B788]/30"
              >
                <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                <span>Mulai Membaca Sekarang</span>
              </button>

              <button
                id="hero-browse-categories-btn"
                onClick={onBrowseCategories}
                className="px-5 py-3.5 rounded-xl bg-[#162A45]/90 hover:bg-[#1E3A5F] text-white border border-slate-600/50 font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#52B788]" />
                <span>Jelajahi Kategori</span>
              </button>
            </div>

          </div>

          {/* Right Column: Hero Art Illustration combining Book & Batursari Landscape */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative golden ambient backglow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#D4AF37]/25 via-[#2D5A27]/25 to-[#1E3A8A]/25 rounded-3xl blur-xl" />
              
              {/* Frame Card */}
              <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-xl bg-[#0A192F]">
                <img
                  src={heroImg}
                  alt="Ilustrasi Pojok Baca dan Persawahan Desa Batursari"
                  className="w-full h-72 sm:h-80 md:h-96 object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Overlay Badge on Hero image */}
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-[#0A192F]/90 backdrop-blur-md border border-[#D4AF37]/30 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#162A45] text-[#D4AF37]">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Perpustakaan Desa Berbasis Digital</p>
                      <p className="text-[11px] text-slate-300">Bisa dibaca langsung tanpa perlu instal aplikasi</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-[#2D5A27] text-[#D4AF37]">
                    Gratis 100%
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Live Statistics Counter Bar */}
        <div id="stats-counter-bar" className="mt-6 pt-6">
          <div className="bg-white border border-[#E5E1D1] rounded-2xl p-4 sm:p-6 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Stat 1 */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E5E1D1]/60">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-900 shrink-0">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold font-display text-[#0A192F] leading-none block">
                  {totalBooks}+
                </span>
                <span className="text-xs font-medium text-slate-600">Koleksi Buku Lengkap</span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E5E1D1]/60">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-900 shrink-0">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold font-display text-[#0A192F] leading-none block">
                  {totalReaders}+
                </span>
                <span className="text-xs font-medium text-slate-600">Warga & Pembaca Aktif</span>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E5E1D1]/60">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-900 shrink-0">
                <BookCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold font-display text-[#0A192F] leading-none block">
                  {totalReads}+
                </span>
                <span className="text-xs font-medium text-slate-600">Sesi Membaca Online</span>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E5E1D1]/60">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-900 shrink-0">
                <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold font-display text-[#0A192F] leading-none block">
                  {categoriesCount}
                </span>
                <span className="text-xs font-medium text-slate-600">Kategori Pengetahuan</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
