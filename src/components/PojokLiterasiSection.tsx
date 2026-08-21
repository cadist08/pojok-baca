import React, { useState } from 'react';
import { ARTICLES_DATA } from '../data/articles';
import { LiteracyArticle } from '../types';
import { 
  Sparkles, 
  Calendar, 
  User, 
  Clock, 
  ChevronRight, 
  BookOpen, 
  MapPin, 
  Lightbulb, 
  Camera, 
  Award,
  X
} from 'lucide-react';
import kknActivityImg from '../assets/images/kkn_kegiatan_literasi_1786823672568.jpg';

export const PojokLiterasiSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<LiteracyArticle | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('Semua');

  const filterTabs = ['Semua', 'Desa Batursari', 'Tips Membaca', 'Artikel Literasi', 'Dokumentasi KKN'];

  const filteredArticles = activeFilter === 'Semua'
    ? ARTICLES_DATA
    : ARTICLES_DATA.filter((a) => a.category === activeFilter);

  return (
    <div id="pojok-literasi-section" className="space-y-12 py-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0A192F] via-[#162A45] to-[#1B4332] rounded-3xl p-6 sm:p-10 text-white shadow-lg border border-[#D4AF37]/30 relative overflow-hidden">
        {/* Background ambient elements */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pojok Literasi & Wawasan Desa</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-white">
            Ruang Inspirasi & Edukasi Warga Desa Batursari
          </h2>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
            Temukan artikel informatif seputar kearifan lokal Desa Batursari, tips menumbuhkan minat baca bagi buah hati, serta rangkuman dokumentasi pengabdian KKN Tematik UPGRIS Kelompok 47.
          </p>
        </div>
      </div>

      {/* Special Showcase: Dokumentasi Kegiatan KKN in Batursari */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Photo Frame */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden shadow-md border border-[#D4AF37]/50 relative group">
              <img
                src={kknActivityImg}
                alt="Dokumentasi Kegiatan Workshop Literasi Mahasiswa KKN 47 UPGRIS di Batursari"
                className="w-full h-72 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 text-white">
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#2D5A27] text-[#D4AF37]">
                  Dokumentasi Lapangan
                </span>
                <p className="text-xs font-medium mt-1">
                  Sesi Storytelling & Pengenalan E-Reader Bersama Anak-Anak Desa Batursari
                </p>
              </div>
            </div>
          </div>

          {/* Text Summary */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#2D5A27] uppercase tracking-wider">
              <Camera className="w-4 h-4 text-[#D4AF37]" />
              <span>Dokumentasi Program Kerja KKN 47</span>
            </div>

            <h3 className="text-2xl font-bold font-display text-[#0A192F]">
              Menghidupkan Lentera Literasi di Setiap Sudut Desa
            </h3>

            <p className="text-sm text-slate-700 leading-relaxed">
              Program pembentukan Pojok Baca Desa Batursari ini merupakan wujud nyata pengabdian mahasiswa KKN Tematik UPGRIS Kelompok 47. 
              Melalui serangkaian workshop membaca kreatif, donasi buku, dan digitalisasi akses materi pelajaran, kami berkomitmen mendukung terciptanya ekosistem belajar yang berkelanjutan dan inklusif.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#FAF9F6] border border-slate-200">
                <span className="text-xl font-bold font-display text-[#0A192F] block">100+</span>
                <span className="text-xs text-slate-600">Anak & Pelajar Terlibat</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF9F6] border border-slate-200">
                <span className="text-xl font-bold font-display text-[#0A192F] block">10+</span>
                <span className="text-xs text-slate-600">Modul & Sesi Workshop</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Filter Tabs for Articles */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === tab
                ? 'bg-[#0A192F] text-[#D4AF37] ring-1.5 ring-[#D4AF37] shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((art) => (
          <article
            key={art.id}
            onClick={() => setSelectedArticle(art)}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden bg-slate-900">
              <img
                src={art.imageUrl}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-[#0A192F]/90 text-[#D4AF37] backdrop-blur-sm border border-[#D4AF37]/30">
                  {art.category}
                </span>
              </div>
            </div>

            {/* Content info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[11px] text-slate-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {art.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {art.readTime}
                  </span>
                </div>

                <h3 className="text-base font-bold font-display text-[#0A192F] group-hover:text-[#1E3A8A] transition-colors leading-snug line-clamp-2">
                  {art.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              {/* Read button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1E3A8A] group-hover:text-[#D4AF37]">
                <span>Baca Selengkapnya</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div 
            className="bg-[#FAF9F6] w-full max-w-3xl rounded-3xl shadow-2xl border border-[#D4AF37]/50 overflow-hidden my-auto max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="bg-[#0A192F] text-white px-6 py-4 flex items-center justify-between border-b border-[#D4AF37]/30">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                {selectedArticle.category}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1 rounded-full hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0A192F] leading-tight">
                  {selectedArticle.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pb-2 border-b border-slate-200">
                  <span className="font-semibold text-[#0A192F]">Penulis: {selectedArticle.author}</span>
                  <span>•</span>
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>

              {/* Cover */}
              <div className="rounded-2xl overflow-hidden shadow-xs max-h-72">
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Article Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-slate-800 leading-relaxed">
                {selectedArticle.content.map((par, i) => (
                  <p key={i} className="indent-6">
                    {par}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">Topik Terkait:</span>
                {selectedArticle.tags.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-full bg-white text-[#0A192F] text-[11px] font-medium border border-slate-200">
                    #{t}
                  </span>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
